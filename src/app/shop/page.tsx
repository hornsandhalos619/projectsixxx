import { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FacetedFilters } from "@/components/shop/FacetedFilters";
import { ProductGridSkeleton } from "@/components/shop/ProductGrid";
import { getUnifiedProducts, getFilterOptions } from "@/lib/unified-shop";
import type { ShopFilters, SortOption, ProductSearchResult } from "@/types/product";
import { Crown, Filter, Loader2, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "The Bazaar",
  description: "Unified marketplace aggregator — Horns & Halos official, Spreadshirt, Threadless, Etsy, and curated affiliates. One cart. Infinite darkness.",
  keywords: ["marketplace", "streetwear", "gothic fashion", "dark aesthetic", "Horns & Halos", "Spreadshirt", "Threadless", "Etsy"],
  openGraph: {
    title: "The Bazaar | Projectsixxx",
    description: "Unified marketplace aggregator — Horns & Halos official, Spreadshirt, Threadless, Etsy, and curated affiliates. One cart. Infinite darkness.",
    type: "website",
  },
};

interface ShopPageProps {
  searchParams: Promise<{
    source?: string;
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

async function getInitialData(searchParams: Awaited<ShopPageProps["searchParams"]>) {
  const filters: ShopFilters = {
    sources: searchParams.source ? [searchParams.source as any] : [],
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
      : getUnifiedProducts(filters, page, 24),
    getFilterOptions(),
  ]);

  return { productsResult, filterOptions, searchQuery };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;
  const { productsResult, filterOptions, searchQuery } = await getInitialData(resolvedSearchParams);

  return (
    <div className="min-h-screen bg-void-900 text-text-primary">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 border-b border-border-subtle">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(192,57,43,0.15)_0%,transparent_70%)]" aria-hidden="true" />
        <div className="absolute inset-0 texture-velvet opacity-30" aria-hidden="true" />
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-10 h-10 text-blood-400" />
              <Typography element="span" className="caption text-blood-400 uppercase tracking-widest">
                The Bazaar
              </Typography>
            </div>
            <Typography element="h1" className="font-display text-step-7 md:text-step-8 tracking-tight text-pallor-50 mb-6">
              Unified Marketplace
            </Typography>
            <Typography element="p" className="font-body text-step-2 md:text-step-3 text-pallor-200 leading-relaxed max-w-2xl mx-auto">
              Horns & Halos official, Spreadshirt, Threadless, Etsy, and curated affiliates. One cart. Infinite darkness.
            </Typography>
            {searchQuery && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Typography element="span" className="font-body text-pallor-300">
                  Search results for:
                </Typography>
                <Typography element="span" className="font-display text-step-2 text-blood-400">
                  "{searchQuery}"
                </Typography>
                <a href="/shop" className="text-text-muted hover:text-blood-400 transition-colors">
                  <Zap className="w-4 h-4" />
                  Clear
                </a>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Source Quick Filter Bar */}
      <section className="py-6 border-b border-border-subtle">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterOptions.sources.map((source) => (
              <a
                key={source.value}
                href={`/shop/${source.value}`}
                className="flex items-center gap-2 px-4 py-2 bg-void-800 border border-border-subtle hover:border-blood-400/50 hover:bg-void-700 transition-all text-sm font-ui"
              >
                {source.value === "hnh" && <Crown className="w-4 h-4 text-wine-300" />}
                {source.value === "spreadshirt" && <span className="w-4 h-4">🏷</span>}
                {source.value === "threadless" && <span className="w-4 h-4">♥</span>}
                {source.value === "etsy" && <span className="w-4 h-4">🏪</span>}
                {source.value === "affiliate" && <Zap className="w-4 h-4 text-accent-primary" />}
                <span>{source.label}</span>
                <span className="text-pallor-400 font-mono text-xs">({source.count})</span>
              </a>
            ))}
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
                    // Navigate with new filters
                    const params = new URLSearchParams();
                    if (filters.sources.length > 0) params.set("source", filters.sources[0]);
                    if (filters.categories.length > 0) params.set("category", filters.categories[0]);
                    if (filters.tags.length > 0) params.set("tag", filters.tags[0]);
                    if (filters.vendors.length > 0) params.set("vendor", filters.vendors[0]);
                    if (filters.priceRange.min > 0) params.set("minPrice", filters.priceRange.min.toString());
                    if (filters.priceRange.max < 10000) params.set("maxPrice", filters.priceRange.max.toString());
                    if (filters.inStockOnly) params.set("inStock", "true");
                    if (filters.onSaleOnly) params.set("onSale", "true");
                    if (filters.sortBy !== "relevance") params.set("sort", filters.sortBy);
                    window.location.href = `/shop?${params.toString()}`;
                  }}
                  onSortChange={(sortBy) => {
                    const params = new URLSearchParams(window.location.search);
                    params.set("sort", sortBy);
                    params.delete("page");
                    window.location.href = `/shop?${params.toString()}`;
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
                    window.location.href = `/shop?${params.toString()}`;
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

      {/* CTA Section */}
      <Section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blood-400/5 via-void-900 to-wine-400/5" aria-hidden="true" />
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Crown className="w-16 h-16 mx-auto mb-6 text-blood-400/50" />
            <Typography element="h2" className="font-display text-step-4 text-pallor-100 mb-4">
              Can't Find Your Ritual?
            </Typography>
            <Typography element="p" className="body-large text-text-secondary mb-8">
              The bazaar grows daily. Swear fealty to receive dark missives about new drops, exclusive rituals, and forbidden knowledge.
            </Typography>
            <a href="/contact/newsletter">
              <Button variant="ritual" size="lg" className="w-full sm:w-auto">
                <Zap className="w-5 h-5 mr-2" />
                Swear Fealty
              </Button>
            </a>
          </div>
        </Container>
      </Section>
    </div>
  );
}