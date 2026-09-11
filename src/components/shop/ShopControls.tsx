"use client";

import { FacetedFilters } from "@/components/shop/FacetedFilters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import type { Facet, ShopFilters, SortOption, ProductSearchResult } from "@/types/product";

function applyShopQuery(mutate: (params: URLSearchParams) => void) {
  const params = new URLSearchParams(window.location.search);
  mutate(params);
  const query = params.toString();
  window.location.href = query ? `/shop?${query}` : "/shop";
}

export function ShopControls({
  facets,
  filters,
  totalProducts,
  products,
  pagination,
}: {
  facets: Facet[];
  filters: ShopFilters;
  totalProducts: number;
  products: ProductSearchResult["products"];
  pagination: ProductSearchResult["pagination"];
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <FacetedFilters
            facets={facets}
            filters={filters}
            totalProducts={totalProducts}
            onFiltersChange={(next) => {
              applyShopQuery((params) => {
                ["source", "category", "tag", "vendor", "minPrice", "maxPrice", "inStock", "onSale", "sort", "page"].forEach((key) => params.delete(key));
                if (next.sources[0]) params.set("source", next.sources[0]);
                if (next.categories[0]) params.set("category", next.categories[0]);
                if (next.tags[0]) params.set("tag", next.tags[0]);
                if (next.vendors[0]) params.set("vendor", next.vendors[0]);
                if (next.priceRange.min > 0) params.set("minPrice", String(next.priceRange.min));
                if (next.priceRange.max < 10000) params.set("maxPrice", String(next.priceRange.max));
                if (next.inStockOnly) params.set("inStock", "true");
                if (next.onSaleOnly) params.set("onSale", "true");
                if (next.sortBy !== "relevance") params.set("sort", next.sortBy);
              });
            }}
            onSortChange={(sortBy: SortOption) => {
              applyShopQuery((params) => {
                params.set("sort", sortBy);
                params.delete("page");
              });
            }}
          />
        </div>
      </aside>
      <div className="lg:col-span-3">
        <ProductGrid
          products={products}
          facets={facets}
          pagination={pagination}
          isLoading={false}
          onPageChange={(page) => {
            applyShopQuery((params) => {
              params.set("page", String(page));
            });
          }}
        />
      </div>
    </div>
  );
}
