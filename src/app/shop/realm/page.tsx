import { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FacetedFilters } from "@/components/shop/FacetedFilters";
import { ProductGridSkeleton } from "@/components/shop/ProductGrid";
import { getProductsBySource } from "@/lib/unified-shop";
import type { ShopFilters, SortOption, ProductSource } from "@/types/product";
import { Crown, Filter, Zap } from "lucide-react";

const SOURCE_CONFIG: Record<ProductSource, { name: string; description: string; icon: React.ReactNode; color: string }> = {
  hnh: {
    name: "Horns & Halos Official",
    description: "Rituals forged in the Cathedral. Official Horns & Halos streetwear, accessories, and dark artifacts.",
    icon: <Crown className="w-8 h-8" />,
    color: "text-wine-300",
  },
  spreadshirt: {
    name: "Spreadshirt",
    description: "Custom printed rituals from the Spreadshirt marketplace. Quality prints on demand.",
    icon: <span className="w-8 h-8">🏷</span>,
    color: "text-pallor-300",
  },
  threadless: {
    name: "Threadless",
    description: "Artist-designed rituals from the Threadless community. Unique designs, community voted.",
    icon: <span className="w-8 h-8">♥</span>,
    color: "text-blood-400",
  },
  etsy: {
    name: "Etsy Curated",
    description: "Handpicked dark artifacts from independent Etsy artisans. One-of-a-kind and limited runs.",
    icon: <span className="w-8 h-8">🏪</span>,
    color: "text-wine-300",
  },
  affiliate: {
    name: "Affiliate Marketplace",
    description: "Curated rituals from partner realms. Commission-bound offerings from trusted allies.",
    icon: <Zap className="w-8 h-8" />,
    color: "text-accent-primary",
  },
};

interface SourcePageProps {
  params: Promise<{ realm: ProductSource }>;
  searchParams: Promise<{
    category?: string;
    tag?: string;
    vendor?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    onSale?: string;
    sort?: string;
    page?: string;
    q?: string;
  }>;
}

async function getSourcePageData(source: ProductSource, searchParams: Awaited<SourcePageProps["searchParams"]>) {
  const filters: ShopFilters = {
    sources: [source],
    categories: searchParams.category ? [searchParams.category as any] : [],
    priceRange: {
      min: searchParams.minPrice ? parseFloat(searchParams.minPrice) : 0,
      max: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : 10000,
    },
    tags: searchParams.tag ? [searchParams.tag as any] : [],
    vendors: searchParams.vendor ? [searchParams.vendor] : [],
    inStockOnly: searchParams.inStock === "true",
    onSaleOnly: searchParams.onSale === "true",
    sortBy: (searchParams.sort as SortOption) || "relevance",
  };

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const searchQuery = searchParams.q || "";

  const [productsResult, filterOptions] = await Promise.all([
    searchQuery
      ? (async () => {
          const { searchProducts } = await import("@/lib/unified-shop");
          return searchProducts(searchQuery, filters, page, 24);
        })()
      : getProductsBySource(source, filters, page, 24),
    (async () => {
      const { getFilterOptions } = await import("@/lib/unified-shop");
      return getFilterOptions();
    })(),
  ]);

  return { productsResult, filterOptions, searchQuery };
}

export async function generateMetadata({ params }: SourcePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const config = SOURCE_CONFIG[resolvedParams.realm];

  return {
    title: config.name,
    description: config.description,
    keywords: ["marketplace", "streetwear", "gothic fashion", "dark aesthetic", config.name],
    openGraph: {
      title: `${config.name} | The Bazaar`,
      description: config.description,
      type: "website",
    },
  };
}

export default async function SourcePage({ params, searchParams }: SourcePageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const config = SOURCE_CONFIG[resolvedParams.realm];

  if (!config) {
    return (
      <div className="min-h-screen bg-void-900 text-text-primary flex items-center justify-center">
        <Container>
          <div className="text-center py-20">
            <Typography element="h1" className="font-display text-step-5 text-pallor-100 mb-4">
              Realm Not Found
            </Typography>
            <Typography element="p" className="body-large text-text-secondary mb-8">
              This source realm does not exist in the bazaar.
            </Typography>
            <Button variant="velvet" onClick={() => window.location.href = "/shop"}>
              Return to the Bazaar
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const { productsResult, filterOptions, searchQuery } = await getSourcePageData(resolvedParams.realm, resolvedSearchParams);

  return (
    <div className="min-h-screen bg-void-900 text-text-primary">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 border-b border-border-subtle">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(192,57,43,0.15)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="absolute inset-0 texture-velvet opacity-30" aria-hidden="true" />
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className={cn("flex-shrink-0", config.color)}>{config.icon}</span>
              <Typography element="span" className="caption text-blood-400 uppercase tracking-widest">
                The Bazaar
              </Typography>
            </div>
            <Typography element="h1" className="font-display text-step-6 md:text-step-7 tracking-tight text-pallor-50 mb-4">
              {config.name}
            </Typography>
            <Typography element="p" className="font-body text-step-2 md:text-step-3 text-pallor-200 leading-relaxed max-w-2xl mx-auto">
              {config.description}
            </Typography>
            {searchQuery && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Typography element="span" className="font-body text-pallor-300">
                  Search results for:
                </Typography>
                <Typography element="span" className="font-display text-step-2 text-blood-400">
                  "{searchQuery}"
                </Typography>
                <a href={`/shop/${resolvedParams.realm}`} className="text-text-muted hover:text-blood-400 transition-colors">
                  <Zap className="w-4 h-4" />
                  Clear
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Main Shop Grid */}
      <Section className="pt-10 pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Faceted Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <FacetedFilters
                  facets={productsResult.facets}
                  filters={productsResult.appliedFilters}
                  onFiltersChange={(filters) => {
                    const params = new URLSearchParams();
                    if (filters.categories.length > 0) params.set("category", filters.categories[0]);
                    if (filters.tags.length > 0) params.set("tag", filters.tags[0]);
                    if (filters.vendors.length > 0) params.set("vendor", filters.vendors[0]);
                    if (filters.priceRange.min > 0) params.set("minPrice", filters.priceRange.min.toString());
                    if (filters.priceRange.max < 10000) params.set("maxPrice", filters.priceRange.max.toString());
                    if (filters.inStockOnly) params.set("inStock", "true");
                    if (filters.onSaleOnly) params.set("onSale", "true");
                    if (filters.sortBy !== "relevance") params.set("sort", filters.sortBy);
                    window.location.href = `/shop/${resolvedParams.realm}?${params.toString()}`;
                  }}
                  onSortChange={(sortBy) => {
                    const params = new URLSearchParams(window.location.search);
                    params.set("sort", sortBy);
                    params.delete("page");
                    window.location.href = `/shop/${resolvedParams.realm}?${params.toString()}`;
                  }}
                  totalProducts={productsResult.pagination.totalCount}
                />
              </div>
            </aside>

            {/* Main Content - Product Grid */}
            <main className="lg:col-span-3">
              {/* Results Info & Sort (Mobile) */}
              <div className="lg:hidden mb-6 flex items-center justify-between">
                <Typography element="span" className="font-body text-pallor-300">
                  {productsResult.pagination.totalCount} {productsResult.pagination.totalCount === 1 ? "ritual" : "rituals"} found
                </Typography>
              </div>

              <Suspense fallback={<ProductGridSkeleton count={8} />}>
                <ProductGrid
                  products={productsResult.products}
                  facets={productsResult.facets}
                  pagination={productsResult.pagination}
                  isLoading={false}
                  onPageChange={(page) => {
                    const params = new URLSearchParams(window.location.search);
                    params.set("page", page.toString());
                    window.location.href = `/shop/${resolvedParams.realm}?${params.toString()}`;
                  }}
                />
              </Suspense>

              {/* Pagination Info */}
              {productsResult.pagination.totalCount > 24 && (
                <div className="mt-8 text-center text-text-muted">
                  <Typography element="p" className="font-body text-sm">
                    Showing {((productsResult.pagination.currentPage - 1) * productsResult.pagination.pageSize) + 1}–{Math.min(productsResult.pagination.currentPage * productsResult.pagination.pageSize, productsResult.pagination.totalCount)} of {productsResult.pagination.totalCount} rituals
                  </Typography>
                </div>
              )}
            </main>
          </div>
        </Container>
      </Section>

      {/* Back to Bazaar */}
      <Section className="py-10 border-t border-border-subtle">
        <Container>
          <div className="text-center">
            <a href="/shop">
              <Button variant="velvet" size="md">
                <Crown className="w-4 h-4 mr-2" />
                Return to the Bazaar
              </Button>
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}

import { cn } from "@/lib/utils";