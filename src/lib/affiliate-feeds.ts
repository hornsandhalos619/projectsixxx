/**
 * Affiliate Feed Parsers
 * Parses and normalizes feeds from Spreadshirt, Threadless, Etsy, and other affiliates
 * Cached and refreshed 4x/day (every 6 hours)
 */

import type {
  UnifiedProduct,
  ProductVariant,
  ProductImage,
  ProductOption,
  ProductCategory,
  ProductTag,
  ProductSource,
  AffiliateFeedResponse,
} from "@/types/product";

// Cache storage (in production, use Redis or Vercel KV)
const feedCache = new Map<ProductSource, { data: AffiliateFeedResponse; expiresAt: number }>();
const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

// Spreadshirt Feed Parser
export async function parseSpreadshirtFeed(): Promise<AffiliateFeedResponse> {
  const cacheKey = "spreadshirt";
  const cached = feedCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    // In production, fetch from Spreadshirt API or CSV/XML feed
    // For now, return mock data structure
    const feedUrl = process.env.SPREADSHIRT_FEED_URL ||
      "https://api.spreadshirt.net/api/v1/shops/123456/products";

    const response = await fetch(feedUrl, {
      headers: {
        "Authorization": `Bearer ${process.env.SPREADSHIRT_API_KEY}`,
        "Accept": "application/json",
      },
      next: { revalidate: 6 * 60 * 60 }, // 6 hours
    });

    if (!response.ok) {
      throw new Error(`Spreadshirt API error: ${response.status}`);
    }

    const data = await response.json();
    const products = transformSpreadshirtProducts(data);

    const result: AffiliateFeedResponse = {
      products,
      lastUpdated: new Date().toISOString(),
      source: "spreadshirt",
    };

    feedCache.set(cacheKey, { data: result, expiresAt: Date.now() + CACHE_DURATION });
    return result;
  } catch (error) {
    console.error("Spreadshirt feed parse error:", error);
    // Return cached data even if expired, or empty
    if (cached) return cached.data;
    return { products: [], lastUpdated: new Date().toISOString(), source: "spreadshirt" };
  }
}

function transformSpreadshirtProducts(data: any): UnifiedProduct[] {
  // Transform Spreadshirt API response to UnifiedProduct
  // This is a template - adjust based on actual API response
  return (data.products || data.elements || []).map((item: any) => {
    const images: ProductImage[] = (item.views || item.images || []).map((view: any, i: number) => ({
      id: `ss-img-${item.id}-${i}`,
      url: view.url || view.imageUrl || view.largeImage,
      altText: item.name,
      width: view.width || 800,
      height: view.height || 800,
      position: i,
    }));

    const variants: ProductVariant[] = (item.variants || item.articles || []).map((variant: any) => ({
      id: `ss-var-${variant.id}`,
      sku: variant.id.toString(),
      title: `${variant.size || ""} ${variant.color || ""}`.trim(),
      price: parseFloat(variant.price?.amount || variant.price || "0"),
      compareAtPrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice) : undefined,
      currency: variant.price?.currency || "USD",
      available: variant.available !== false && (variant.stock || 0) > 0,
      inventoryQuantity: variant.stock || 0,
      selectedOptions: {
        size: variant.size || "One Size",
        color: variant.color || "Default",
      },
      image: images[0],
    }));

    const priceMin = Math.min(...variants.map(v => v.price));
    const priceMax = Math.max(...variants.map(v => v.price));
    const compareAtPrices = variants.map(v => v.compareAtPrice).filter(Boolean) as number[];
    const compareAtPriceMin = compareAtPrices.length ? Math.min(...compareAtPrices) : undefined;
    const compareAtPriceMax = compareAtPrices.length ? Math.max(...compareAtPrices) : undefined;
    const onSale = compareAtPriceMin !== undefined && compareAtPriceMin > priceMin;

    const tags: ProductTag[] = [];
    if (item.tags?.includes("bestseller")) tags.push("bestseller");
    if (item.tags?.includes("new")) tags.push("new");
    if (onSale) tags.push("sale");

    return {
      id: `spreadshirt-${item.id}`,
      sourceId: item.id.toString(),
      source: "spreadshirt" as ProductSource,
      sourceUrl: `https://shop.spreadshirt.com/${item.urlName || item.id}`,
      title: item.name,
      handle: generateHandle(item.name),
      description: item.description || "",
      vendor: "Spreadshirt",
      productType: inferCategory(item.category),
      category: inferCategory(item.category),
      tags,
      priceMin,
      priceMax,
      currency: "USD",
      compareAtPriceMin,
      compareAtPriceMax,
      onSale,
      discountPercentage: onSale && compareAtPriceMin
        ? Math.round(((compareAtPriceMin - priceMin) / compareAtPriceMin) * 100)
        : undefined,
      variants,
      options: [
        { name: "Size", values: [...new Set(variants.map(v => v.selectedOptions.size))] },
        { name: "Color", values: [...new Set(variants.map(v => v.selectedOptions.color))] },
      ],
      images,
      featuredImage: images[0],
      availableForSale: variants.some(v => v.available),
      totalInventory: variants.reduce((sum, v) => sum + v.inventoryQuantity, 0),
      trackInventory: true,
      bloodType: inferBloodType(tags, onSale),
      rating: item.rating || 0,
      reviewCount: item.reviewCount || 0,
      reviews: [],
      seo: { handle: generateHandle(item.name) },
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
      isCurated: false,
      relatedProductIds: [],
      collectionIds: [],
      affiliateData: {
        commissionRate: 0.15,
        affiliateNetwork: "Spreadshirt",
        trackingUrl: `https://shop.spreadshirt.com/${item.urlName || item.id}?aff=hnh`,
      },
    };
  });
}

// Threadless Feed Parser
export async function parseThreadlessFeed(): Promise<AffiliateFeedResponse> {
  const cacheKey = "threadless";
  const cached = feedCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    const feedUrl = process.env.THREADLESS_FEED_URL ||
      "https://api.threadless.com/v1/products";

    const response = await fetch(feedUrl, {
      headers: {
        "Authorization": `Bearer ${process.env.THREADLESS_API_KEY}`,
        "Accept": "application/json",
      },
      next: { revalidate: 6 * 60 * 60 },
    });

    if (!response.ok) {
      throw new Error(`Threadless API error: ${response.status}`);
    }

    const data = await response.json();
    const products = transformThreadlessProducts(data);

    const result: AffiliateFeedResponse = {
      products,
      lastUpdated: new Date().toISOString(),
      source: "threadless",
    };

    feedCache.set(cacheKey, { data: result, expiresAt: Date.now() + CACHE_DURATION });
    return result;
  } catch (error) {
    console.error("Threadless feed parse error:", error);
    if (cached) return cached.data;
    return { products: [], lastUpdated: new Date().toISOString(), source: "threadless" };
  }
}

function transformThreadlessProducts(data: any): UnifiedProduct[] {
  return (data.products || data.results || []).map((item: any) => {
    const images: ProductImage[] = (item.images || []).map((img: any, i: number) => ({
      id: `tl-img-${item.id}-${i}`,
      url: img.url || img.large || img.medium,
      altText: item.name,
      width: img.width || 800,
      height: img.height || 800,
      position: i,
    }));

    const variants: ProductVariant[] = (item.variants || item.sizes || []).map((variant: any) => ({
      id: `tl-var-${variant.id || variant.size}`,
      sku: variant.sku || `TL-${item.id}-${variant.size}`,
      title: variant.size || "One Size",
      price: parseFloat(variant.price || "0"),
      compareAtPrice: variant.originalPrice ? parseFloat(variant.originalPrice) : undefined,
      currency: "USD",
      available: variant.inStock !== false,
      inventoryQuantity: variant.quantity || 10,
      selectedOptions: { size: variant.size || "One Size" },
      image: images[0],
    }));

    const priceMin = Math.min(...variants.map(v => v.price));
    const priceMax = Math.max(...variants.map(v => v.price));
    const onSale = variants.some(v => v.compareAtPrice && v.compareAtPrice > v.price);

    const tags: ProductTag[] = [];
    if (item.isBestseller) tags.push("bestseller");
    if (item.isNew) tags.push("new");
    if (onSale) tags.push("sale");
    if (item.isExclusive) tags.push("exclusive");

    return {
      id: `threadless-${item.id}`,
      sourceId: item.id.toString(),
      source: "threadless" as ProductSource,
      sourceUrl: `https://www.threadless.com/product/${item.url || item.id}`,
      title: item.name,
      handle: generateHandle(item.name),
      description: item.description || "",
      vendor: "Threadless",
      productType: inferCategory(item.category),
      category: inferCategory(item.category),
      tags,
      priceMin,
      priceMax,
      currency: "USD",
      onSale,
      variants,
      options: [
        { name: "Size", values: [...new Set(variants.map(v => v.selectedOptions.size))] },
      ],
      images,
      featuredImage: images[0],
      availableForSale: variants.some(v => v.available),
      totalInventory: variants.reduce((sum, v) => sum + v.inventoryQuantity, 0),
      trackInventory: true,
      bloodType: inferBloodType(tags, onSale),
      rating: item.rating || 0,
      reviewCount: item.reviewsCount || 0,
      reviews: [],
      seo: { handle: generateHandle(item.name) },
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
      isCurated: false,
      relatedProductIds: [],
      collectionIds: [],
      affiliateData: {
        commissionRate: 0.20,
        affiliateNetwork: "Threadless",
        trackingUrl: `https://www.threadless.com/product/${item.url || item.id}?ref=hnh`,
      },
    };
  });
}

// Etsy Feed Parser
export async function parseEtsyFeed(): Promise<AffiliateFeedResponse> {
  const cacheKey = "etsy";
  const cached = feedCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    // Etsy API requires OAuth, typically fetch from a curated list of shops/listings
    const feedUrl = process.env.ETSY_FEED_URL ||
      `https://openapi.etsy.com/v3/application/shops/${process.env.ETSY_SHOP_ID}/listings/active`;

    const response = await fetch(feedUrl, {
      headers: {
        "Authorization": `Bearer ${process.env.ETSY_ACCESS_TOKEN}`,
        "x-api-key": process.env.ETSY_API_KEY || "",
        "Accept": "application/json",
      },
      next: { revalidate: 6 * 60 * 60 },
    });

    if (!response.ok) {
      throw new Error(`Etsy API error: ${response.status}`);
    }

    const data = await response.json();
    const products = transformEtsyProducts(data);

    const result: AffiliateFeedResponse = {
      products,
      lastUpdated: new Date().toISOString(),
      source: "etsy",
    };

    feedCache.set(cacheKey, { data: result, expiresAt: Date.now() + CACHE_DURATION });
    return result;
  } catch (error) {
    console.error("Etsy feed parse error:", error);
    if (cached) return cached.data;
    return { products: [], lastUpdated: new Date().toISOString(), source: "etsy" };
  }
}

function transformEtsyProducts(data: any): UnifiedProduct[] {
  return (data.results || data.listings || []).map((item: any) => {
    const images: ProductImage[] = (item.images || []).map((img: any, i: number) => ({
      id: `etsy-img-${item.listing_id}-${i}`,
      url: img.url_570xN || img.url_170x135 || img.fullxfull,
      altText: item.title,
      width: img.width || 570,
      height: img.height || 570,
      position: i,
    }));

    // Etsy variations are complex - simplify for now
    const price = parseFloat(item.price?.amount || item.price || "0") / 100; // Etsy prices in cents
    const variants: ProductVariant[] = [{
      id: `etsy-var-${item.listing_id}`,
      sku: item.sku || `ETSY-${item.listing_id}`,
      title: "Default",
      price,
      compareAtPrice: item.original_price ? parseFloat(item.original_price) / 100 : undefined,
      currency: item.price?.currency_code || "USD",
      available: item.state === "active" && (item.quantity || 0) > 0,
      inventoryQuantity: item.quantity || 1,
      selectedOptions: {},
      image: images[0],
    }];

    const onSale = item.original_price && parseFloat(item.original_price) / 100 > price;

    const tags: ProductTag[] = [];
    if (item.is_bestseller) tags.push("bestseller");
    if (item.is_new) tags.push("new");
    if (onSale) tags.push("sale");
    if (item.is_customizable) tags.push("exclusive");

    return {
      id: `etsy-${item.listing_id}`,
      sourceId: item.listing_id.toString(),
      source: "etsy" as ProductSource,
      sourceUrl: `https://www.etsy.com/listing/${item.listing_id}`,
      title: item.title,
      handle: generateHandle(item.title),
      description: item.description || "",
      vendor: item.shop_name || "Etsy Seller",
      productType: inferCategory(item.category_path),
      category: inferCategory(item.category_path),
      tags,
      priceMin: price,
      priceMax: price,
      currency: item.price?.currency_code || "USD",
      onSale,
      discountPercentage: onSale && item.original_price
        ? Math.round(((parseFloat(item.original_price) / 100 - price) / (parseFloat(item.original_price) / 100)) * 100)
        : undefined,
      variants,
      options: [],
      images,
      featuredImage: images[0],
      availableForSale: item.state === "active",
      totalInventory: item.quantity || 1,
      trackInventory: true,
      bloodType: inferBloodType(tags, onSale),
      rating: item.rating || 0,
      reviewCount: item.review_count || 0,
      reviews: [],
      seo: { handle: generateHandle(item.title) },
      createdAt: item.creation_tsz ? new Date(item.creation_tsz * 1000).toISOString() : new Date().toISOString(),
      updatedAt: item.ending_tsz ? new Date(item.ending_tsz * 1000).toISOString() : new Date().toISOString(),
      isCurated: false,
      relatedProductIds: [],
      collectionIds: [],
      affiliateData: {
        commissionRate: 0.04,
        affiliateNetwork: "Etsy",
        trackingUrl: `https://www.etsy.com/listing/${item.listing_id}?ref=hnh-aff`,
      },
    };
  });
}

// Generic Affiliate Feed Parser (for other marketplaces)
export async function parseGenericAffiliateFeed(
  source: ProductSource,
  feedUrl: string,
  transformFn: (data: any) => UnifiedProduct[]
): Promise<AffiliateFeedResponse> {
  const cacheKey = source;
  const cached = feedCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.data;
  }

  try {
    const response = await fetch(feedUrl, {
      headers: { "Accept": "application/json" },
      next: { revalidate: 6 * 60 * 60 },
    });

    if (!response.ok) {
      throw new Error(`${source} API error: ${response.status}`);
    }

    const data = await response.json();
    const products = transformFn(data);

    const result: AffiliateFeedResponse = {
      products,
      lastUpdated: new Date().toISOString(),
      source,
    };

    feedCache.set(cacheKey, { data: result, expiresAt: Date.now() + CACHE_DURATION });
    return result;
  } catch (error) {
    console.error(`${source} feed parse error:`, error);
    if (cached) return cached.data;
    return { products: [], lastUpdated: new Date().toISOString(), source };
  }
}

// Unified function to fetch all affiliate feeds
export async function fetchAllAffiliateFeeds(): Promise<UnifiedProduct[]> {
  const [spreadshirt, threadless, etsy] = await Promise.allSettled([
    parseSpreadshirtFeed(),
    parseThreadlessFeed(),
    parseEtsyFeed(),
  ]);

  const allProducts: UnifiedProduct[] = [];

  if (spreadshirt.status === "fulfilled") {
    allProducts.push(...spreadshirt.value.products);
  }
  if (threadless.status === "fulfilled") {
    allProducts.push(...threadless.value.products);
  }
  if (etsy.status === "fulfilled") {
    allProducts.push(...etsy.value.products);
  }

  return allProducts;
}

// Helper functions (shared with shopify.ts logic)
function inferCategory(categoryPath: string | string[]): ProductCategory {
  const path = Array.isArray(categoryPath) ? categoryPath.join(" > ") : categoryPath;
  const lower = path.toLowerCase();

  if (lower.includes("clothing") || lower.includes("apparel") || lower.includes("shirt") || lower.includes("tee")) return "apparel";
  if (lower.includes("hoodie") || lower.includes("sweatshirt") || lower.includes("jacket") || lower.includes("outerwear")) return "outerwear";
  if (lower.includes("hat") || lower.includes("cap") || lower.includes("beanie") || lower.includes("headwear")) return "headwear";
  if (lower.includes("shoe") || lower.includes("boot") || lower.includes("footwear")) return "footwear";
  if (lower.includes("jewelry") || lower.includes("ring") || lower.includes("necklace") || lower.includes("bracelet")) return "jewelry";
  if (lower.includes("art") || lower.includes("print") || lower.includes("poster") || lower.includes("canvas")) return "art";
  if (lower.includes("home") || lower.includes("decor") || lower.includes("blanket") || lower.includes("pillow")) return "home";
  if (lower.includes("accessory") || lower.includes("bag") || lower.includes("belt") || lower.includes("wallet")) return "accessories";

  return "apparel";
}

function inferBloodType(tags: ProductTag[], onSale: boolean): "bestseller" | "new" | "sale" | "exclusive" | null {
  if (tags.includes("bestseller")) return "bestseller";
  if (tags.includes("new")) return "new";
  if (onSale && tags.includes("sale")) return "sale";
  if (tags.includes("exclusive") || tags.includes("limited")) return "exclusive";
  return null;
}

function generateHandle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Force refresh all feeds (for admin/cron)
export async function refreshAllAffiliateFeeds(): Promise<void> {
  feedCache.clear();
  await fetchAllAffiliateFeeds();
}

// Get cached feed without fetching
export function getCachedFeed(source: ProductSource): AffiliateFeedResponse | null {
  const cached = feedCache.get(source);
  return cached?.data || null;
}