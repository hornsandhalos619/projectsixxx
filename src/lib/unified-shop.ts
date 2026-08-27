/**
 * Unified Shop Hub API
 * Combines products from all sources (Shopify, Spreadshirt, Threadless, Etsy, Affiliates)
 * Provides faceted search, filtering, sorting, and pagination
 */

import type {
  UnifiedProduct,
  ShopFilters,
  SortOption,
  ProductCategory,
  ProductTag,
  ProductSource,
  PaginationInfo,
  Facet,
  FacetValue,
  ProductSearchResult,
} from "@/types/product";

import { getShopifyProducts, getShopifyProduct, getShopifyProductById } from "./shopify";
import { fetchAllAffiliateFeeds, parseSpreadshirtFeed, parseThreadlessFeed, parseEtsyFeed } from "./affiliate-feeds";

// In-memory cache for unified product searches
const searchCache = new Map<string, { data: ProductSearchResult; expiresAt: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(filters: ShopFilters, page: number, pageSize: number): string {
  return JSON.stringify({ filters, page, pageSize });
}

function buildFacetsFromProducts(products: UnifiedProduct[]): Facet[] {
  const sourceCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  const tagCounts: Record<string, number> = {};
  const vendorCounts: Record<string, number> = {};

  let priceMin = Infinity;
  let priceMax = -Infinity;

  products.forEach((product) => {
    sourceCounts[product.source] = (sourceCounts[product.source] || 0) + 1;
    categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    product.tags.forEach((tag) => (tagCounts[tag] = (tagCounts[tag] || 0) + 1));
    vendorCounts[product.vendor] = (vendorCounts[product.vendor] || 0) + 1;
    priceMin = Math.min(priceMin, product.priceMin);
    priceMax = Math.max(priceMax, product.priceMax);
  });

  const priceRanges = [
    { key: "under-50", label: "Under $50", min: 0, max: 50 },
    { key: "50-100", label: "$50 – $100", min: 50, max: 100 },
    { key: "100-200", label: "$100 – $200", min: 100, max: 200 },
    { key: "200-500", label: "$200 – $500", min: 200, max: 500 },
    { key: "500+", label: "$500+", min: 500, max: 10000 },
  ];

  const priceRangeCounts = priceRanges.map((range) => ({
    value: range.key,
    label: range.label,
    count: products.filter((p) => p.priceMin >= range.min && p.priceMax <= range.max).length,
    selected: false,
  }));

  return [
    {
      key: "source",
      label: "Source",
      type: "source",
      expanded: true,
      values: Object.entries(sourceCounts).map(([value, count]) => ({ value, count, selected: false })),
    },
    {
      key: "category",
      label: "Category",
      type: "category",
      expanded: true,
      values: Object.entries(categoryCounts).map(([value, count]) => ({ value, count, selected: false })),
    },
    {
      key: "price",
      label: "Price Range",
      type: "price",
      expanded: true,
      values: priceRangeCounts,
    },
    {
      key: "tag",
      label: "Tags",
      type: "tag",
      expanded: false,
      values: Object.entries(tagCounts).map(([value, count]) => ({ value, count, selected: false })),
    },
    {
      key: "vendor",
      label: "Brand",
      type: "vendor",
      expanded: false,
      values: Object.entries(vendorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([value, count]) => ({ value, count, selected: false })),
    },
  ];
}

function applyFilters(products: UnifiedProduct[], filters: ShopFilters): UnifiedProduct[] {
  return products.filter((product) => {
    // Source filter
    if (filters.sources.length > 0 && !filters.sources.includes(product.source)) {
      return false;
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }

    // Tag filter
    if (filters.tags.length > 0 && !filters.tags.some((tag) => product.tags.includes(tag))) {
      return false;
    }

    // Vendor filter
    if (filters.vendors.length > 0 && !filters.vendors.includes(product.vendor)) {
      return false;
    }

    // Price range filter
    if (product.priceMin < filters.priceRange.min || product.priceMax > filters.priceRange.max) {
      return false;
    }

    // In stock filter
    if (filters.inStockOnly && !product.availableForSale) {
      return false;
    }

    // On sale filter
    if (filters.onSaleOnly && !product.onSale) {
      return false;
    }

    return true;
  });
}

function applySorting(products: UnifiedProduct[], sortBy: SortOption): UnifiedProduct[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.priceMin - b.priceMin);
    case "price-desc":
      return sorted.sort((a, b) => b.priceMin - a.priceMin);
    case "newest":
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "bestselling":
      // Sort by blood type priority, then by rating
      const bloodPriority = { bestseller: 4, exclusive: 3, new: 2, sale: 1, null: 0 };
      return sorted.sort((a, b) => {
        const aPriority = bloodPriority[a.bloodType] || 0;
        const bPriority = bloodPriority[b.bloodType] || 0;
        if (aPriority !== bPriority) return bPriority - aPriority;
        return b.rating - a.rating;
      });
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "discount":
      return sorted.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    case "relevance":
    default:
      // Relevance: prioritize curated, then blood type, then rating
      return sorted.sort((a, b) => {
        if (a.isCurated !== b.isCurated) return a.isCurated ? -1 : 1;
        const bloodPriority = { bestseller: 4, exclusive: 3, new: 2, sale: 1, null: 0 };
        const aPriority = bloodPriority[a.bloodType] || 0;
        const bPriority = bloodPriority[b.bloodType] || 0;
        if (aPriority !== bPriority) return bPriority - aPriority;
        return b.rating - a.rating;
      });
  }
}

function paginateProducts(products: UnifiedProduct[], page: number, pageSize: number): { products: UnifiedProduct[]; pagination: PaginationInfo } {
  const totalCount = products.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedProducts = products.slice(start, end);

  return {
    products: paginatedProducts,
    pagination: {
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      startCursor: start.toString(),
      endCursor: (end - 1).toString(),
      totalCount,
      pageSize,
      currentPage: page,
    },
  };
}

/**
 * Fetch all products from all sources and return unified results with faceted search
 */
export async function getUnifiedProducts(
  filters: ShopFilters = {
    sources: [],
    categories: [],
    priceRange: { min: 0, max: 10000 },
    tags: [],
    vendors: [],
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: "relevance",
  },
  page: number = 1,
  pageSize: number = 24
): Promise<ProductSearchResult> {
  const cacheKey = getCacheKey(filters, page, pageSize);
  const cached = searchCache.get(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    // Apply pagination to cached results
    const { products, pagination } = paginateProducts(cached.data.products, page, pageSize);
    return {
      ...cached.data,
      products,
      pagination,
      appliedFilters: filters,
      sortBy: filters.sortBy,
    };
  }

  try {
    // Fetch from all sources in parallel
    const [shopifyResult, affiliateProducts] = await Promise.allSettled([
      getShopifyProducts(filters, 500), // Fetch more for client-side filtering
      fetchAllAffiliateFeeds(),
    ]);

    const allProducts: UnifiedProduct[] = [];

    if (shopifyResult.status === "fulfilled") {
      allProducts.push(...shopifyResult.value.products);
    } else {
      console.error("Shopify fetch failed:", shopifyResult.reason);
    }

    if (affiliateProducts.status === "fulfilled") {
      allProducts.push(...affiliateProducts.value);
    } else {
      console.error("Affiliate feeds fetch failed:", affiliateProducts.reason);
    }

    // Apply filters
    const filteredProducts = applyFilters(allProducts, filters);

    // Apply sorting
    const sortedProducts = applySorting(filteredProducts, filters.sortBy);

    // Build facets from ALL products (not just filtered) for accurate counts
    const facets = buildFacetsFromProducts(allProducts);

    // Paginate
    const { products: paginatedProducts, pagination } = paginateProducts(sortedProducts, page, pageSize);

    const result: ProductSearchResult = {
      products: paginatedProducts,
      facets,
      pagination,
      appliedFilters: filters,
      sortBy: filters.sortBy,
    };

    // Cache the full sorted results (before pagination)
    searchCache.set(cacheKey, {
      data: { ...result, products: sortedProducts },
      expiresAt: Date.now() + CACHE_DURATION,
    });

    return result;
  } catch (error) {
    console.error("Unified products fetch error:", error);
    return {
      products: [],
      facets: [],
      pagination: {
        hasNextPage: false,
        hasPreviousPage: false,
        totalCount: 0,
        pageSize,
        currentPage: page,
      },
      appliedFilters: filters,
      sortBy: filters.sortBy,
    };
  }
}

/**
 * Get a single product by handle from any source
 */
export async function getUnifiedProduct(handle: string): Promise<UnifiedProduct | null> {
  // Try Shopify first
  const shopifyProduct = await getShopifyProduct(handle);
  if (shopifyProduct) return shopifyProduct;

  // Try affiliate feeds
  const affiliateProducts = await fetchAllAffiliateFeeds();
  const affiliateProduct = affiliateProducts.find((p) => p.handle === handle);
  if (affiliateProduct) return affiliateProduct;

  return null;
}

/**
 * Get a single product by ID from any source
 */
export async function getUnifiedProductById(id: string): Promise<UnifiedProduct | null> {
  // Check source prefix
  if (id.startsWith("shopify-")) {
    const shopifyId = id.replace("shopify-", "");
    return getShopifyProductById(shopifyId);
  }

  if (id.startsWith("spreadshirt-")) {
    const result = await parseSpreadshirtFeed();
    return result.products.find((p) => p.id === id) || null;
  }

  if (id.startsWith("threadless-")) {
    const result = await parseThreadlessFeed();
    return result.products.find((p) => p.id === id) || null;
  }

  if (id.startsWith("etsy-")) {
    const result = await parseEtsyFeed();
    return result.products.find((p) => p.id === id) || null;
  }

  // Try affiliate feeds as fallback
  const affiliateProducts = await fetchAllAffiliateFeeds();
  return affiliateProducts.find((p) => p.id === id) || null;
}

/**
 * Get products by source
 */
export async function getProductsBySource(
  source: ProductSource,
  filters: ShopFilters = {
    sources: [],
    categories: [],
    priceRange: { min: 0, max: 10000 },
    tags: [],
    vendors: [],
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: "relevance",
  },
  page: number = 1,
  pageSize: number = 24
): Promise<ProductSearchResult> {
  const sourceFilters = { ...filters, sources: [source] };
  return getUnifiedProducts(sourceFilters, page, pageSize);
}

/**
 * Get featured/curated products across all sources
 */
export async function getFeaturedProducts(limit: number = 8): Promise<UnifiedProduct[]> {
  const result = await getUnifiedProducts(
    {
      sources: [],
      categories: [],
      priceRange: { min: 0, max: 10000 },
      tags: [],
      vendors: [],
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: "relevance",
    },
    1,
    50
  );

  return result.products
    .filter((p) => p.isCurated || p.bloodType === "bestseller" || p.bloodType === "exclusive")
    .slice(0, limit);
}

/**
 * Get new arrivals across all sources
 */
export async function getNewArrivals(limit: number = 8): Promise<UnifiedProduct[]> {
  const result = await getUnifiedProducts(
    {
      sources: [],
      categories: [],
      priceRange: { min: 0, max: 10000 },
      tags: [],
      vendors: [],
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: "newest",
    },
    1,
    limit
  );

  return result.products;
}

/**
 * Get sale products across all sources
 */
export async function getSaleProducts(limit: number = 8): Promise<UnifiedProduct[]> {
  const result = await getUnifiedProducts(
    {
      sources: [],
      categories: [],
      priceRange: { min: 0, max: 10000 },
      tags: [],
      vendors: [],
      inStockOnly: false,
      onSaleOnly: true,
      sortBy: "discount",
    },
    1,
    limit
  );

  return result.products;
}

/**
 * Get related products based on category, tags, and source
 */
export async function getRelatedProducts(productId: string, limit: number = 4): Promise<UnifiedProduct[]> {
  const product = await getUnifiedProductById(productId);
  if (!product) return [];

  const result = await getUnifiedProducts(
    {
      sources: [product.source],
      categories: [product.category],
      priceRange: { min: 0, max: 10000 },
      tags: product.tags,
      vendors: [product.vendor],
      inStockOnly: true,
      onSaleOnly: false,
      sortBy: "relevance",
    },
    1,
    limit + 1 // Fetch one extra to exclude current product
  );

  return result.products.filter((p) => p.id !== productId).slice(0, limit);
}

/**
 * Search products by query string
 */
export async function searchProducts(
  query: string,
  filters: ShopFilters = {
    sources: [],
    categories: [],
    priceRange: { min: 0, max: 10000 },
    tags: [],
    vendors: [],
    inStockOnly: false,
    onSaleOnly: false,
    sortBy: "relevance",
  },
  page: number = 1,
  pageSize: number = 24
): Promise<ProductSearchResult> {
  const lowerQuery = query.toLowerCase();

  // Get all products first
  const result = await getUnifiedProducts(filters, 1, 500);

  // Filter by search query
  const searchResults = result.products.filter(
    (product) =>
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.vendor.toLowerCase().includes(lowerQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      product.category.toLowerCase().includes(lowerQuery)
  );

  const { products: paginatedProducts, pagination } = paginateProducts(searchResults, page, pageSize);

  return {
    ...result,
    products: paginatedProducts,
    pagination,
    searchQuery: query,
  };
}

/**
 * Get available filter options for building filter UI
 */
export async function getFilterOptions(): Promise<{
  sources: { value: ProductSource; label: string; count: number }[];
  categories: { value: ProductCategory; label: string; count: number }[];
  tags: { value: ProductTag; label: string; count: number }[];
  vendors: { value: string; label: string; count: number }[];
  priceRange: { min: number; max: number };
}> {
  const result = await getUnifiedProducts(
    {
      sources: [],
      categories: [],
      priceRange: { min: 0, max: 10000 },
      tags: [],
      vendors: [],
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: "relevance",
    },
    1,
    1000
  );

  const sources = result.facets.find((f) => f.key === "source")?.values.map((v) => ({
    value: v.value as ProductSource,
    label: v.value,
    count: v.count,
  })) || [];

  const categories = result.facets.find((f) => f.key === "category")?.values.map((v) => ({
    value: v.value as ProductCategory,
    label: v.value,
    count: v.count,
  })) || [];

  const tags = result.facets.find((f) => f.key === "tag")?.values.map((v) => ({
    value: v.value as ProductTag,
    label: v.value,
    count: v.count,
  })) || [];

  const vendors = result.facets.find((f) => f.key === "vendor")?.values.map((v) => ({
    value: v.value,
    label: v.value,
    count: v.count,
  })) || [];

  const priceFacet = result.facets.find((f) => f.key === "price");
  const prices = result.products.map((p) => ({ min: p.priceMin, max: p.priceMax }));
  const minPrice = prices.length > 0 ? Math.min(...prices.map((p) => p.min)) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices.map((p) => p.max)) : 10000;

  return {
    sources,
    categories,
    tags,
    vendors,
    priceRange: { min: minPrice, max: maxPrice },
  };
}

/**
 * Clear all caches (for admin/revalidation)
 */
export function clearShopCache(): void {
  searchCache.clear();
}