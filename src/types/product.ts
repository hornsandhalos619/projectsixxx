/**
 * Unified Product Schema for Horns & Halos Shop Hub
 * Normalizes all sources (Shopify, Spreadshirt, Threadless, Etsy, Affiliates) to a common interface
 */

export type ProductSource =
  | "hnh"
  | "spreadshirt"
  | "threadless"
  | "etsy"
  | "affiliate";

export type ProductCategory =
  | "apparel"
  | "accessories"
  | "home"
  | "art"
  | "jewelry"
  | "footwear"
  | "outerwear"
  | "headwear";

export type ProductTag =
  | "bestseller"
  | "new"
  | "sale"
  | "exclusive"
  | "limited"
  | "coven-curated"
  | "ritual-wear"
  | "sigil"
  | "occult"
  | "dark-aesthetic";

export type BloodType = "bestseller" | "new" | "sale" | "exclusive" | null;

export interface ProductVariant {
  id: string;
  sku: string;
  title: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  available: boolean;
  inventoryQuantity: number;
  selectedOptions: Record<string, string>;
  image?: ProductImage;
  weight?: number;
  weightUnit?: "g" | "kg" | "oz" | "lb";
}

export interface ProductImage {
  id: string;
  url: string;
  altText?: string;
  width: number;
  height: number;
  position: number;
}

export interface ProductOption {
  name: string;
  values: string[];
}

export interface ProductReview {
  id: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  verifiedPurchase: boolean;
  createdAt: string;
  helpfulCount: number;
}

export interface ProductSEO {
  title?: string;
  description?: string;
  handle?: string;
}

export interface UnifiedProduct {
  // Core Identity
  id: string;
  sourceId: string; // Original ID from source platform
  source: ProductSource;
  sourceUrl: string; // Direct link to product on source platform

  // Basic Info
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  vendor: string;
  productType: string;
  category: ProductCategory;
  tags: ProductTag[];

  // Pricing
  priceMin: number;
  priceMax: number;
  currency: string;
  compareAtPriceMin?: number;
  compareAtPriceMax?: number;
  onSale: boolean;
  discountPercentage?: number;

  // Variants & Options
  variants: ProductVariant[];
  options: ProductOption[];
  selectedVariant?: ProductVariant;

  // Images
  images: ProductImage[];
  featuredImage?: ProductImage;

  // Inventory & Availability
  availableForSale: boolean;
  totalInventory: number;
  trackInventory: boolean;

  // Blood Type (Curation Badge)
  bloodType: BloodType;

  // Reviews & Ratings
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];

  // SEO
  seo: ProductSEO;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;

  // Affiliate Data (for non-HnH sources)
  affiliateData?: {
    commissionRate?: number;
    affiliateNetwork?: string;
    trackingUrl?: string;
    originalPrice?: number;
  };

  // Curation
  isCurated: boolean;
  curatedAt?: string;
  curatedNote?: string;

  // Related
  relatedProductIds: string[];
  collectionIds: string[];
}

// Faceted Search Types
export interface FacetValue {
  value: string;
  count: number;
  selected: boolean;
}

export interface Facet {
  key: string;
  label: string;
  type: "category" | "source" | "price" | "tag" | "vendor" | "option";
  values: FacetValue[];
  expanded: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ShopFilters {
  sources: ProductSource[];
  categories: ProductCategory[];
  priceRange: PriceRange;
  tags: ProductTag[];
  vendors: string[];
  inStockOnly: boolean;
  onSaleOnly: boolean;
  sortBy: SortOption;
}

export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "bestselling"
  | "rating"
  | "discount";

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  title: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  image: ProductImage;
  selectedOptions: Record<string, string>;
  source: ProductSource;
  sourceUrl: string;
  bloodType?: BloodType;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  totalDiscount: number;
  estimatedTax: number;
  estimatedShipping: number;
  total: number;
  currency: string;
  appliedDiscountCodes: string[];
  note?: string;
  updatedAt: string;
}

// Collection Types
export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml?: string;
  image?: ProductImage;
  productCount: number;
  products: UnifiedProduct[];
  seo: ProductSEO;
  source: ProductSource;
}

// Search & Pagination
export interface PaginationInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export interface ProductSearchResult {
  products: UnifiedProduct[];
  facets: Facet[];
  pagination: PaginationInfo;
  appliedFilters: ShopFilters;
  searchQuery?: string;
  sortBy: SortOption;
}

// API Response Types
export interface ShopifyProductResponse {
  product: UnifiedProduct;
}

export interface ShopifyProductsResponse {
  products: UnifiedProduct[];
  facets: Facet[];
  pageInfo: PaginationInfo;
}

export interface AffiliateFeedResponse {
  products: UnifiedProduct[];
  lastUpdated: string;
  source: ProductSource;
}

// Error Types
export interface ShopError {
  source: ProductSource;
  code: string;
  message: string;
  recoverable: boolean;
  timestamp: string;
}

// Curation Types
export interface CuratedCollection {
  id: string;
  title: string;
  description: string;
  image?: ProductImage;
  productIds: string[];
  featured: boolean;
  order: number;
  seo: ProductSEO;
}

export interface EditorialPick {
  id: string;
  productId: string;
  title: string;
  story: string;
  author: string;
  authorAvatar?: string;
  publishedAt: string;
  featured: boolean;
}