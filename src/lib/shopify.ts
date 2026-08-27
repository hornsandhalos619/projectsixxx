/**
 * Shopify Storefront API Integration
 * Primary HnH store integration
 */

import type {
  UnifiedProduct,
  ProductVariant,
  ProductImage,
  ProductOption,
  ProductReview,
  ProductCategory,
  ProductTag,
  ShopFilters,
  SortOption,
  PaginationInfo,
  Facet,
  ShopifyProductsResponse,
} from "@/types/product";

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "horns-and-halos.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN || "";
const SHOPIFY_API_VERSION = "2024-07";

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

interface ShopifyGraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; extensions?: { code: string } }>;
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: 60s for prices
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const result: ShopifyGraphQLResponse<T> = await response.json();

  if (result.errors) {
    throw new Error(result.errors.map((e) => e.message).join(", "));
  }

  return result.data as T;
}

// GraphQL Fragments
const PRODUCT_FRAGMENT = `
  fragment ProductDetails on Product {
    id
    handle
    title
    description
    descriptionHtml
    vendor
    productType
    tags
    createdAt
    updatedAt
    publishedAt
    availableForSale
    totalInventory
    trackInventory
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
          width
          height
        }
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    options {
      name
      values
    }
    variants(first: 50) {
      edges {
        node {
          id
          sku
          title
          availableForSale
          quantityAvailable
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image { id url altText width height }
          weight
          weightUnit
        }
      }
    }
    metafields(first: 20, namespace: "custom") {
      edges {
        node {
          key
          value
        }
      }
    }
  }
`;

const COLLECTION_FRAGMENT = `
  fragment CollectionDetails on Collection {
    id
    handle
    title
    description
    descriptionHtml
    image { id url altText width height }
    productsCount
    seo { title description }
  }
`;

// Transform Shopify Product to UnifiedProduct
function transformShopifyProduct(shopifyProduct: any): UnifiedProduct {
  const images: ProductImage[] = shopifyProduct.images?.edges?.map((edge: any, index: number) => ({
    id: edge.node.id,
    url: edge.node.url,
    altText: edge.node.altText || shopifyProduct.title,
    width: edge.node.width,
    height: edge.node.height,
    position: index,
  })) || [];

  const featuredImage: ProductImage | undefined = shopifyProduct.featuredImage
    ? {
        id: shopifyProduct.featuredImage.id,
        url: shopifyProduct.featuredImage.url,
        altText: shopifyProduct.featuredImage.altText || shopifyProduct.title,
        width: shopifyProduct.featuredImage.width,
        height: shopifyProduct.featuredImage.height,
        position: 0,
      }
    : images[0];

  const variants: ProductVariant[] = shopifyProduct.variants?.edges?.map((edge: any) => {
    const node = edge.node;
    return {
      id: node.id,
      sku: node.sku || "",
      title: node.title,
      price: parseFloat(node.price.amount),
      compareAtPrice: node.compareAtPrice ? parseFloat(node.compareAtPrice.amount) : undefined,
      currency: node.price.currencyCode,
      available: node.availableForSale,
      inventoryQuantity: node.quantityAvailable || 0,
      selectedOptions: Object.fromEntries(
        node.selectedOptions.map((opt: any) => [opt.name, opt.value])
      ),
      image: node.image
        ? {
            id: node.image.id,
            url: node.image.url,
            altText: node.image.altText,
            width: node.image.width,
            height: node.image.height,
            position: 0,
          }
        : undefined,
      weight: node.weight,
      weightUnit: node.weightUnit?.toLowerCase() as "g" | "kg" | "oz" | "lb",
    };
  }) || [];

  const options: ProductOption[] = shopifyProduct.options?.map((opt: any) => ({
    name: opt.name,
    values: opt.values,
  })) || [];

  const priceMin = parseFloat(shopifyProduct.priceRange?.minVariantPrice?.amount || "0");
  const priceMax = parseFloat(shopifyProduct.priceRange?.maxVariantPrice?.amount || "0");
  const compareAtPriceMin = shopifyProduct.compareAtPriceRange?.minVariantPrice
    ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
    : undefined;
  const compareAtPriceMax = shopifyProduct.compareAtPriceRange?.maxVariantPrice
    ? parseFloat(shopifyProduct.compareAtPriceRange.maxVariantPrice.amount)
    : undefined;

  const onSale = compareAtPriceMin !== undefined && compareAtPriceMin > priceMin;
  const discountPercentage = onSale && compareAtPriceMin
    ? Math.round(((compareAtPriceMin - priceMin) / compareAtPriceMin) * 100)
    : undefined;

  // Determine category from productType and tags
  const category = inferCategory(shopifyProduct.productType, shopifyProduct.tags);
  const tags = inferTags(shopifyProduct.tags, onSale);

  // Extract metafields for curation data
  const metafields = Object.fromEntries(
    shopifyProduct.metafields?.edges?.map((e: any) => [e.node.key, e.node.value]) || []
  );

  const bloodType = inferBloodType(tags, onSale, metafields);

  return {
    id: `shopify-${shopifyProduct.id}`,
    sourceId: shopifyProduct.id,
    source: "hnh",
    sourceUrl: `https://${SHOPIFY_STORE_DOMAIN}/products/${shopifyProduct.handle}`,
    title: shopifyProduct.title,
    handle: shopifyProduct.handle,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml,
    vendor: shopifyProduct.vendor,
    productType: shopifyProduct.productType,
    category,
    tags,
    priceMin,
    priceMax,
    currency: shopifyProduct.priceRange?.minVariantPrice?.currencyCode || "USD",
    compareAtPriceMin,
    compareAtPriceMax,
    onSale,
    discountPercentage,
    variants,
    options,
    images,
    featuredImage,
    availableForSale: shopifyProduct.availableForSale,
    totalInventory: shopifyProduct.totalInventory || 0,
    trackInventory: shopifyProduct.trackInventory,
    bloodType,
    rating: parseFloat(metafields.rating || "0"),
    reviewCount: parseInt(metafields.reviewCount || "0"),
    reviews: [], // Fetch separately if needed
    seo: {
      title: metafields.seo_title,
      description: metafields.seo_description,
      handle: shopifyProduct.handle,
    },
    createdAt: shopifyProduct.createdAt,
    updatedAt: shopifyProduct.updatedAt,
    publishedAt: shopifyProduct.publishedAt,
    isCurated: metafields.curated === "true",
    curatedAt: metafields.curated_at,
    curatedNote: metafields.curated_note,
    relatedProductIds: metafields.related_products?.split(",").map((id: string) => `shopify-${id.trim()}`) || [],
    collectionIds: [],
    affiliateData: undefined,
  };
}

function inferCategory(productType: string, tags: string[]): ProductCategory {
  const type = productType.toLowerCase();
  const tagStr = tags.join(" ").toLowerCase();

  if (type.includes("shirt") || type.includes("tee") || type.includes("top") || tagStr.includes("apparel")) {
    return "apparel";
  }
  if (type.includes("hoodie") || type.includes("sweatshirt") || type.includes("jacket") || type.includes("coat")) {
    return "outerwear";
  }
  if (type.includes("hat") || type.includes("cap") || type.includes("beanie") || type.includes("headwear")) {
    return "headwear";
  }
  if (type.includes("shoe") || type.includes("boot") || type.includes("footwear")) {
    return "footwear";
  }
  if (type.includes("ring") || type.includes("necklace") || type.includes("bracelet") || type.includes("jewelry")) {
    return "jewelry";
  }
  if (type.includes("print") || type.includes("poster") || type.includes("art") || type.includes("canvas")) {
    return "art";
  }
  if (type.includes("home") || type.includes("decor") || type.includes("blanket") || type.includes("pillow")) {
    return "home";
  }
  if (type.includes("bag") || type.includes("accessory") || type.includes("belt") || type.includes("wallet")) {
    return "accessories";
  }

  return "apparel";
}

function inferTags(shopifyTags: string[], onSale: boolean): ProductTag[] {
  const tags: ProductTag[] = [];

  if (shopifyTags.includes("bestseller")) tags.push("bestseller");
  if (shopifyTags.includes("new") || shopifyTags.includes("new-arrival")) tags.push("new");
  if (onSale || shopifyTags.includes("sale")) tags.push("sale");
  if (shopifyTags.includes("exclusive")) tags.push("exclusive");
  if (shopifyTags.includes("limited") || shopifyTags.includes("limited-edition")) tags.push("limited");
  if (shopifyTags.includes("coven-curated") || shopifyTags.includes("curated")) tags.push("coven-curated");
  if (shopifyTags.includes("ritual-wear")) tags.push("ritual-wear");
  if (shopifyTags.includes("sigil")) tags.push("sigil");
  if (shopifyTags.includes("occult")) tags.push("occult");
  if (shopifyTags.includes("dark-aesthetic")) tags.push("dark-aesthetic");

  return tags;
}

function inferBloodType(tags: ProductTag[], onSale: boolean, metafields: Record<string, string>): "bestseller" | "new" | "sale" | "exclusive" | null {
  if (metafields.blood_type) {
    return metafields.blood_type as "bestseller" | "new" | "sale" | "exclusive";
  }
  if (tags.includes("bestseller")) return "bestseller";
  if (tags.includes("new")) return "new";
  if (onSale && tags.includes("sale")) return "sale";
  if (tags.includes("exclusive") || tags.includes("limited")) return "exclusive";
  return null;
}

// Main API Functions
export async function getShopifyProducts(
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
  first: number = 24,
  after?: string
): Promise<ShopifyProductsResponse> {
  // Build filter query
  const filterParts: string[] = [];

  if (filters.sources.length > 0 && !filters.sources.includes("hnh")) {
    return { products: [], facets: [], pagination: emptyPagination() };
  }

  if (filters.categories.length > 0) {
    filterParts.push(`product_type:(${filters.categories.join(" OR ")})`);
  }

  if (filters.vendors.length > 0) {
    filterParts.push(`vendor:(${filters.vendors.join(" OR ")})`);
  }

  if (filters.tags.length > 0) {
    filterParts.push(`tag:(${filters.tags.join(" OR ")})`);
  }

  if (filters.inStockOnly) {
    filterParts.push("available:true");
  }

  if (filters.onSaleOnly) {
    filterParts.push("compare_at_price:>0");
  }

  // Price range - Shopify doesn't support price range filtering directly in Storefront API
  // We'll filter client-side after fetching

  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
      products(first: $first, after: $after, query: $query, sortKey: $sortKey, reverse: $reverse) {
        edges {
          node {
            ...ProductDetails
          }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        totalCount
      }
    }
  `;

  const sortKey = getShopifySortKey(filters.sortBy);
  const reverse = ["price-desc", "newest", "bestselling", "rating", "discount"].includes(filters.sortBy);

  const variables = {
    first,
    after,
    query: filterParts.join(" "),
    sortKey,
    reverse,
  };

  const data = await shopifyFetch<{
    products: {
      edges: Array<{ node: any; cursor: string }>;
      pageInfo: PaginationInfo;
      totalCount: number;
    };
  }>(query, variables);

  const products = data.products.edges.map((edge) => transformShopifyProduct(edge.node));
  const filteredProducts = products.filter((p) =>
    p.priceMin >= filters.priceRange.min && p.priceMax <= filters.priceRange.max
  );

  const facets = buildFacetsFromProducts(filteredProducts);

  return {
    products: filteredProducts,
    facets,
    pagination: {
      hasNextPage: data.products.pageInfo.hasNextPage,
      hasPreviousPage: data.products.pageInfo.hasPreviousPage,
      startCursor: data.products.pageInfo.startCursor,
      endCursor: data.products.pageInfo.endCursor,
      totalCount: data.products.totalCount,
      pageSize: first,
      currentPage: after ? 2 : 1, // Simplified
    },
  };
}

export async function getShopifyProduct(handle: string): Promise<UnifiedProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductDetails
      }
    }
  `;

  const data = await shopifyFetch<{ product: any }>(query, { handle });

  if (!data.product) return null;

  return transformShopifyProduct(data.product);
}

export async function getShopifyProductById(id: string): Promise<UnifiedProduct | null> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetProductById($id: ID!) {
      product(id: $id) {
        ...ProductDetails
      }
    }
  `;

  const data = await shopifyFetch<{ product: any }>(query, { id });

  if (!data.product) return null;

  return transformShopifyProduct(data.product);
}

export async function getShopifyCollections(): Promise<any[]> {
  const query = `
    ${COLLECTION_FRAGMENT}
    query GetCollections {
      collections(first: 50) {
        edges {
          node {
            ...CollectionDetails
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{ collections: { edges: Array<{ node: any }> } }>(query);
  return data.collections.edges.map((edge) => edge.node);
}

export async function getShopifyCollectionProducts(
  handle: string,
  first: number = 24,
  after?: string
): Promise<ShopifyProductsResponse> {
  const query = `
    ${PRODUCT_FRAGMENT}
    query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
      collection(handle: $handle) {
        products(first: $first, after: $after) {
          edges {
            node {
              ...ProductDetails
            }
            cursor
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    collection: {
      products: {
        edges: Array<{ node: any; cursor: string }>;
        pageInfo: PaginationInfo;
        totalCount: number;
      };
    };
  }>(query, { handle, first, after });

  if (!data.collection) {
    return { products: [], facets: [], pagination: emptyPagination() };
  }

  const products = data.collection.products.edges.map((edge) =>
    transformShopifyProduct(edge.node)
  );
  const facets = buildFacetsFromProducts(products);

  return {
    products,
    facets,
    pagination: {
      hasNextPage: data.collection.products.pageInfo.hasNextPage,
      hasPreviousPage: data.collection.products.pageInfo.hasPreviousPage,
      startCursor: data.collection.products.pageInfo.startCursor,
      endCursor: data.collection.products.pageInfo.endCursor,
      totalCount: data.collection.products.totalCount,
      pageSize: first,
      currentPage: after ? 2 : 1,
    },
  };
}

function getShopifySortKey(sortBy: SortOption): string {
  const sortKeys: Record<SortOption, string> = {
    relevance: "RELEVANCE",
    "price-asc": "PRICE",
    "price-desc": "PRICE",
    newest: "CREATED_AT",
    bestselling: "BEST_SELLING",
    rating: "RELEVANCE", // Not directly supported
    discount: "RELEVANCE",
  };
  return sortKeys[sortBy] || "RELEVANCE";
}

function buildFacetsFromProducts(products: UnifiedProduct[]): Facet[] {
  // Reuse logic from utils.ts
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
      values: [
        { value: "under-50", count: 0, selected: false, label: "Under $50" },
        { value: "50-100", count: 0, selected: false, label: "$50 – $100" },
        { value: "100-200", count: 0, selected: false, label: "$100 – $200" },
        { value: "200-500", count: 0, selected: false, label: "$200 – $500" },
        { value: "500+", count: 0, selected: false, label: "$500+" },
      ],
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

function emptyPagination(): PaginationInfo {
  return {
    hasNextPage: false,
    hasPreviousPage: false,
    totalCount: 0,
    pageSize: 24,
    currentPage: 1,
  };
}

// Revalidation helpers
export function revalidateShopifyProducts() {
  // This would be called via webhook or cron
  // For now, ISR handles revalidation
}

export function revalidateShopifyProduct(handle: string) {
  // Individual product revalidation
}