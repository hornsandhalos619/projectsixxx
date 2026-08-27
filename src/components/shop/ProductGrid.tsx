"use client";

import { useState } from "react";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UnifiedProduct, PaginationInfo } from "@/types/product";

interface ProductGridProps {
  products: UnifiedProduct[];
  facets?: any[];
  pagination?: PaginationInfo;
  isLoading?: boolean;
  onPageChange?: (page: number) => void;
  onLoadMore?: () => void;
  loadMoreText?: string;
  className?: string;
  variant?: "grid" | "list" | "masonry";
  itemsPerRow?: { mobile: number; tablet: number; desktop: number; wide: number };
}

export function ProductGrid({
  products,
  facets,
  pagination,
  isLoading = false,
  onPageChange,
  onLoadMore,
  loadMoreText = "Summon More",
  className,
  variant = "grid",
  itemsPerRow = { mobile: 1, tablet: 2, desktop: 3, wide: 4 },
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">(variant);

  if (isLoading && products.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="grid gap-6" style={{
          gridTemplateColumns: `repeat(${itemsPerRow.mobile}, 1fr)`,
        }}>
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0 && !isLoading) {
    return (
      <div className={cn("text-center py-20", className)}>
        <div className="w-24 h-24 mx-auto mb-6 bg-void-800 rounded-full flex items-center justify-center border border-border-subtle">
          <svg className="w-12 h-12 text-pallor-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        </div>
        <Typography element="h3" className="font-display text-step-3 text-pallor-100 mb-3">
          No Rituals Found
        </Typography>
        <Typography element="p" className="body-large text-text-secondary max-w-md mx-auto mb-6">
          The void stares back empty. Adjust your incantations or widen the circle.
        </Typography>
        <Button variant="velvet" onClick={() => window.location.href = "/shop"}>
          View All Products
        </Button>
      </div>
    );
  }

  const gridColumns = {
    grid: `grid-cols-${itemsPerRow.mobile} sm:grid-cols-${itemsPerRow.tablet} lg:grid-cols-${itemsPerRow.desktop} xl:grid-cols-${itemsPerRow.wide}`,
    list: "grid-cols-1",
    masonry: `grid-cols-${itemsPerRow.mobile} sm:grid-cols-${itemsPerRow.tablet} lg:grid-cols-${itemsPerRow.desktop}`,
  };

  return (
    <div className={cn(className)}>
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Typography element="span" className="font-body text-pallor-200">
            {pagination?.totalCount || products.length} {pagination?.totalCount === 1 ? "ritual" : "rituals"} found
          </Typography>
          {facets && facets.length > 0 && (
            <Typography element="span" className="text-text-muted">•</Typography>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-void-800 border border-border-subtle rounded-none p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 rounded-none transition-colors",
              viewMode === "grid" ? "bg-blood-500/20 text-blood-400" : "text-pallor-400 hover:text-pallor-200"
            )}
            aria-label="Grid view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 rounded-none transition-colors",
              viewMode === "list" ? "bg-blood-500/20 text-blood-400" : "text-pallor-400 hover:text-pallor-200"
            )}
            aria-label="List view"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={cn(
          "grid gap-6 transition-all duration-300",
          viewMode === "grid" && gridColumns.grid,
          viewMode === "list" && gridColumns.list,
          viewMode === "masonry" && "grid-rows-[auto] " + gridColumns.masonry
        )}
        role="list"
        aria-label="Products"
      >
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            variant={viewMode === "list" ? "compact" : "default"}
            priority={index < 4}
          />
        ))}

        {/* Loading skeletons for infinite scroll */}
        {isLoading && onLoadMore && [...Array(4)].map((_, i) => (
          <ProductCardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>

      {/* Pagination / Load More */}
      {(pagination?.hasNextPage || onLoadMore) && !isLoading && (
        <div className="mt-10 text-center">
          {onLoadMore ? (
            <Button
              variant="ritual"
              size="lg"
              onClick={onLoadMore}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Summoning...
                </>
              ) : (
                <>
                  {loadMoreText}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          ) : pagination && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="velvet"
                size="sm"
                onClick={() => onPageChange && onPageChange((pagination.currentPage || 1) - 1)}
                disabled={!pagination.hasPreviousPage || isLoading}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Typography element="span" className="font-display text-step-2 text-pallor-100 min-w-[3rem] text-center">
                Page {pagination.currentPage}
              </Typography>
              <Button
                variant="velvet"
                size="sm"
                onClick={() => onPageChange && onPageChange((pagination.currentPage || 1) + 1)}
                disabled={!pagination.hasNextPage || isLoading}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {isLoading && onLoadMore && (
        <div className="mt-6 text-center">
          <Loader2 className="w-8 h-8 text-blood-400 animate-spin mx-auto" />
        </div>
      )}
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}