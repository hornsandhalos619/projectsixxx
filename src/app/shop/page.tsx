import { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ShopControls } from "@/components/shop/ShopControls";
import { getUnifiedProducts, getFilterOptions } from "@/lib/unified-shop";
import type { ShopFilters, SortOption } from "@/types/product";
import { Crown, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "The Bazaar",
  description: "Unified marketplace aggregator — Horns & Halos official, Spreadshirt, Threadless, Etsy, and curated affiliates.",
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
    sources: searchParams.source ? [searchParams.source as never] : [],
    categories: searchParams.category ? [searchParams.category as never] : [],
    priceRange: {
      min: searchParams.minPrice ? parseFloat(searchParams.minPrice) : 0,
      max: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : 10000,
    },
    tags: searchParams.tag ? [searchParams.tag as never] : [],
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
      <section className="relative py-20 md:py-28 border-b border-border-subtle">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Crown className="w-10 h-10 text-blood-400" />
              <Typography element="span" className="caption text-blood-400 uppercase tracking-widest">The Bazaar</Typography>
            </div>
            <Typography element="h1" className="font-display text-step-7 tracking-tight text-pallor-50 mb-6">Unified Marketplace</Typography>
            <Typography element="p" className="font-body text-step-2 text-pallor-200 leading-relaxed">Horns & Halos official, Spreadshirt, Threadless, Etsy, and curated affiliates. One cart. Infinite darkness.</Typography>
            {searchQuery ? (
              <p className="mt-6 font-display text-step-2 text-blood-400">Search: {searchQuery}</p>
            ) : null}
          </div>
        </Container>
      </section>
      <section className="py-6 border-b border-border-subtle">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterOptions.sources.map((source) => (
              <a key={source.value} href={`/shop?source=${source.value}`} className="px-4 py-2 bg-void-800 border border-border-subtle hover:border-blood-400/50 text-sm">
                {source.label} ({source.count})
              </a>
            ))}
          </div>
        </Container>
      </section>
      <Section className="pt-10 pb-20">
        <Container>
          <ShopControls
            facets={productsResult.facets}
            filters={productsResult.appliedFilters}
            totalProducts={productsResult.pagination.totalCount}
            products={productsResult.products}
            pagination={productsResult.pagination}
          />
        </Container>
      </Section>
      <Section className="relative py-20">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Typography element="h2" className="font-display text-step-4 text-pallor-100 mb-4">Can't Find Your Ritual?</Typography>
            <a href="/contact/newsletter"><Button variant="ritual" size="lg">Swear Fealty</Button></a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
