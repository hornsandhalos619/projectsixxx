"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { X, ChevronDown, ChevronUp, Filter, SlidersHorizontal, Tag, Crown, DollarSign, Building2, Package, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Facet, FacetValue, ShopFilters, SortOption, ProductCategory, ProductTag, ProductSource } from "@/types/product";

interface FacetedFiltersProps {
  facets: Facet[];
  filters: ShopFilters;
  onFiltersChange: (filters: ShopFilters) => void;
  onSortChange: (sortBy: SortOption) => void;
  totalProducts: number;
  isLoading?: boolean;
  className?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "bestselling", label: "Best Selling" },
  { value: "rating", label: "Top Rated" },
  { value: "discount", label: "Biggest Discount" },
];

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  apparel: "Apparel",
  accessories: "Accessories",
  home: "Home & Decor",
  art: "Art & Prints",
  jewelry: "Jewelry",
  footwear: "Footwear",
  outerwear: "Outerwear",
  headwear: "Headwear",
};

const TAG_LABELS: Record<ProductTag, string> = {
  bestseller: "Bestseller",
  new: "New Arrival",
  sale: "On Sale",
  exclusive: "Exclusive",
  limited: "Limited Edition",
  "coven-curated": "Coven Curated",
  "ritual-wear": "Ritual Wear",
  sigil: "Sigil",
  occult: "Occult",
  "dark-aesthetic": "Dark Aesthetic",
};

const SOURCE_LABELS: Record<ProductSource, string> = {
  hnh: "Horns & Halos Official",
  spreadshirt: "Spreadshirt",
  threadless: "Threadless",
  etsy: "Etsy Curated",
  affiliate: "Affiliate Marketplace",
};

const SOURCE_ICONS: Record<ProductSource, React.ReactNode> = {
  hnh: <Crown className="w-3 h-3" />,
  spreadshirt: <Tag className="w-3 h-3" />,
  threadless: <Package className="w-3 h-3" />,
  etsy: <Building2 className="w-3 h-3" />,
  affiliate: <DollarSign className="w-3 h-3" />,
};

export function FacetedFilters({
  facets,
  filters,
  onFiltersChange,
  onSortChange,
  totalProducts,
  isLoading = false,
  className,
}: FacetedFiltersProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.priceRange.min,
    filters.priceRange.max,
  ]);

  const hasActiveFilters =
    filters.sources.length > 0 ||
    filters.categories.length > 0 ||
    filters.tags.length > 0 ||
    filters.vendors.length > 0 ||
    filters.inStockOnly ||
    filters.onSaleOnly ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 10000;

  const handleSourceChange = (source: ProductSource, checked: boolean) => {
    const newSources = checked
      ? [...filters.sources, source]
      : filters.sources.filter((s) => s !== source);
    onFiltersChange({ ...filters, sources: newSources });
  };

  const handleCategoryChange = (category: ProductCategory, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleTagChange = (tag: ProductTag, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tag]
      : filters.tags.filter((t) => t !== tag);
    onFiltersChange({ ...filters, tags: newTags });
  };

  const handleVendorChange = (vendor: string, checked: boolean) => {
    const newVendors = checked
      ? [...filters.vendors, vendor]
      : filters.vendors.filter((v) => v !== vendor);
    onFiltersChange({ ...filters, vendors: newVendors });
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
    onFiltersChange({
      ...filters,
      priceRange: { min: value[0], max: value[1] },
    });
  };

  const handleInStockChange = (checked: boolean) => {
    onFiltersChange({ ...filters, inStockOnly: checked });
  };

  const handleOnSaleChange = (checked: boolean) => {
    onFiltersChange({ ...filters, onSaleOnly: checked });
  };

  const handleClearAll = () => {
    onFiltersChange({
      sources: [],
      categories: [],
      priceRange: { min: 0, max: 10000 },
      tags: [],
      vendors: [],
      inStockOnly: false,
      onSaleOnly: false,
      sortBy: "relevance",
    });
    setPriceRange([0, 10000]);
  };

  const renderFacet = (facet: Facet) => {
    if (facet.type === "price") {
      return (
        <Collapsible open={facet.expanded} onOpenChange={() => {}} className="w-full">
          <CollapsibleTrigger className="w-full p-0 text-left bg-transparent">
            <div className="flex items-center justify-between">
              <Typography element="h4" className="font-display text-step-1 text-pallor-100">
                {facet.label}
              </Typography>
              <ChevronDown className={cn("w-4 h-4 text-pallor-400 transition-transform", facet.expanded && "rotate-180")} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">${priceRange[0]}</span>
                <span className="text-text-secondary">${priceRange[1]}</span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={handlePriceRangeChange}
                min={0}
                max={10000}
                step={10}
                className="w-full"
                disabled={isLoading}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Collapsible open={facet.expanded} onOpenChange={() => {}} className="w-full">
        <CollapsibleTrigger className="w-full p-0 text-left bg-transparent">
          <div className="flex items-center justify-between">
            <Typography element="h4" className="font-display text-step-1 text-pallor-100">
              {facet.label} <span className="font-body text-pallor-400 text-step-0 ml-2">({facet.values.reduce((sum, v) => sum + v.count, 0)})</span>
            </Typography>
            <ChevronDown className={cn("w-4 h-4 text-pallor-400 transition-transform", facet.expanded && "rotate-180")} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {facet.values.map((value) => {
              const isSelected = 
                (facet.type === "source" && filters.sources.includes(value.value as ProductSource)) ||
                (facet.type === "category" && filters.categories.includes(value.value as ProductCategory)) ||
                (facet.type === "tag" && filters.tags.includes(value.value as ProductTag)) ||
                (facet.type === "vendor" && filters.vendors.includes(value.value));

              const label = 
                facet.type === "source" ? SOURCE_LABELS[value.value as ProductSource] :
                facet.type === "category" ? CATEGORY_LABELS[value.value as ProductCategory] :
                facet.type === "tag" ? TAG_LABELS[value.value as ProductTag] :
                value.value;

              const icon = facet.type === "source" ? SOURCE_ICONS[value.value as ProductSource] : null;

              return (
                <label key={value.value} className="flex items-center gap-2 cursor-pointer group">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      if (facet.type === "source") handleSourceChange(value.value as ProductSource, checked);
                      else if (facet.type === "category") handleCategoryChange(value.value as ProductCategory, checked);
                      else if (facet.type === "tag") handleTagChange(value.value as ProductTag, checked);
                      else if (facet.type === "vendor") handleVendorChange(value.value, checked);
                    }}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-blood-500 data-[state=checked]:border-blood-500"
                  />
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {icon}
                    <Typography element="span" className="font-body text-sm text-pallor-200 truncate">
                      {label}
                    </Typography>
                  </div>
                  <Typography element="span" className="font-body text-xs text-pallor-400 font-mono">
                    {value.count}
                  </Typography>
                </label>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  // Mobile filter button
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return (
      <>
        <Button
          variant="velvet"
          fullWidth
          onClick={() => setIsMobileOpen(true)}
          className={cn("mb-4 gap-2", hasActiveFilters && "border-blood-400/50 text-blood-400")}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <Badge variant="blood" className="ml-auto">
              {filters.sources.length + filters.categories.length + filters.tags.length + filters.vendors.length + (filters.inStockOnly ? 1 : 0) + (filters.onSaleOnly ? 1 : 0)}
            </Badge>
          )}
        </Button>

        {/* Mobile Filter Modal */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 bg-void-950/95 backdrop-blur-sm overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="filter-title">
            <div className="min-h-screen p-4 md:p-6">
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <Typography element="h2" id="filter-title" className="font-display text-step-3 text-pallor-100">
                    Filters
                  </Typography>
                  <Button variant="ghost" size="sm" onClick={() => setIsMobileOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {hasActiveFilters && (
                  <Button variant="blood" fullWidth size="sm" onClick={handleClearClear} className="mb-6">
                    <XCircle className="w-4 h-4 mr-2" />
                    Clear All Filters
                  </Button>
                )}

                <div className="space-y-6">
                  {facets.map((facet) => renderFacet(facet))}
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle">
                  <Typography element="h4" className="font-display text-step-1 text-pallor-100 mb-3">
                    Sort By
                  </Typography>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                    disabled={isLoading}
                    className="w-full input bg-void-800 border-border-subtle text-pallor-100"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <aside className={cn("space-y-6", className)} aria-label="Product filters">
      <div className="flex items-center justify-between">
        <Typography element="h3" className="font-display text-step-2 text-pallor-100">
          <SlidersHorizontal className="w-5 h-5 mr-2 inline-block" />
          Filters
        </Typography>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-blood-400 hover:text-blood-300">
            <XCircle className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {facets.map((facet) => renderFacet(facet))}
      </div>

      {/* Sort */}
      <div className="pt-6 border-t border-border-subtle">
        <Typography element="h4" className="font-display text-step-1 text-pallor-100 mb-3">
          Sort By
        </Typography>
        <select
          value={filters.sortBy}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          disabled={isLoading}
          className="w-full input bg-void-800 border-border-subtle text-pallor-100"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

// Helper to prevent naming conflict
function handleClearClear() {}