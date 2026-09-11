import { Metadata } from "next";
import { Container, Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ShopControls } from "@/components/shop/ShopControls";
import { getUnifiedProducts, getFilterOptions } from "@/lib/unified-shop";
import { getHouseCatalog } from "@/lib/house-catalog";
import type { ShopFilters, SortOption, ProductSearchResult } from "@/types/product";
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

function catalogResult(filters: ShopFilters, page: number): ProductSearchResult {
  const products = getHouseCatalog();
  return {
    products,
    facets: [],
    pagination: {
      hasNextPage: false,
      hasPreviousPage: false,
      startCursor: "0",
      endCursor: String(products.length),
      totalCount: products.length,
      pageSize: 24,
      currentPage: page,
    },
    appliedFilters: filters,
    sortBy: filters.sortBy,
  };
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
  const [liveProducts, filterOptions] = await Promise.all([
    getUnifiedProducts(filters, page, 24),
    getFilterOptions(),
  ]);
  const productsResult =
    liveProducts.products.length > 0 ? liveProducts : catalogResult(filters, page);
  const sources =
    filterOptions.sources.length > 0
      ? filterOptions.sources
      : [{ value: "hnh" as const, label: "Horns & Halos", count: getHouseCatalog().length }];
  return { productsResult, filterOptions: { ...filterOptions, sources }, searchQuery };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const resolvedSearchParams = await searchParams;
  const { productsResult, filterOptions, searchQuery } = await getInitialData(resolvedSearchParams);
  return (
    <div className="min-h-screen bg-void-900 text-text-primary">
      <section className="relative py-20 md:py-28 border-b border-border-subtle">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Crown className="h-10 w-10 text-blood-400" />
              <Typography element="span" className="caption uppercase tracking-widest text-blood-400">The Bazaar</Typography>
            </div>
            <Typography element="h1" className="mb-6 font-display text-step-7 tracking-tight text-pallor-50">Unified Marketplace</Typography>
            <Typography element="p" className="font-body text-step-2 leading-relaxed text-pallor-200">
              Horns & Halos official, Spreadshirt, Threadless, Etsy, and curated affiliates. One cart. Infinite darkness.
            </Typography>
            {searchQuery ? <p className="mt-6 font-display text-step-2 text-blood-400">Search: {searchQuery}</p> : null}
          </div>
        </Container>
      </section>
      <section className="border-b border-border-subtle py-6">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterOptions.sources.map((source) => (
              <a key={source.value} href={`/shop?source=${source.value}`} className="border border-border-subtle bg-void-800 px-4 py-2 text-sm hover:border-blood-400/50">
                {source.label} ({source.count})
              </a>
            ))}
          </div>
        </Container>
      </section>
      <Section className="pb-20 pt-10">
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
          <div className="mx-auto max-w-2xl text-center">
            <Typography element="h2" className="mb-4 font-display text-step-4 text-pallor-100">Can't Find Your Ritual?</Typography>
            <a href="/contact/newsletter"><Button variant="ritual" size="lg">Swear Fealty</Button></a>
          </div>
        </Container>
      </Section>
    </div>
  );
}
