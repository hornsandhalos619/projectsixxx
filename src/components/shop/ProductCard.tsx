"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardMedia } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { useCartActions, createCartItemFromProduct } from "@/lib/cart";
import type { UnifiedProduct, ProductVariant, ProductSource } from "@/types/product";
import { Crown, Tag, Percent, ExternalLink, ShoppingBag, Heart } from "lucide-react";

interface ProductCardProps {
  product: UnifiedProduct;
  variant?: "default" | "compact" | "featured";
  priority?: boolean;
  showSourceBadge?: boolean;
  showBloodType?: boolean;
  showQuickAdd?: boolean;
}

function getSourceIcon(source: ProductSource) {
  switch (source) {
    case "hnh":
      return <Crown className="w-3 h-3" />;
    case "spreadshirt":
      return <Tag className="w-3 h-3" />;
    case "threadless":
      return <Heart className="w-3 h-3" />;
    case "etsy":
      return <ExternalLink className="w-3 h-3" />;
    default:
      return <Tag className="w-3 h-3" />;
  }
}

function getSourceLabel(source: ProductSource) {
  switch (source) {
    case "hnh":
      return "Horns & Halos";
    case "spreadshirt":
      return "Spreadshirt";
    case "threadless":
      return "Threadless";
    case "etsy":
      return "Etsy";
    default:
      return "Affiliate";
  }
}

function getSourceColor(source: ProductSource) {
  switch (source) {
    case "hnh":
      return "variant=\"ritual\"";
    case "spreadshirt":
      return "variant=\"velvet\"";
    case "threadless":
      return "variant=\"blood\"";
    case "etsy":
      return "variant=\"wine\"";
    default:
      return "variant=\"default\"";
  }
}

export function ProductCard({
  product,
  variant = "default",
  priority = false,
  showSourceBadge = true,
  showBloodType = true,
  showQuickAdd = true,
}: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, isInCart } = useCartActions();
  const primaryImage = product.featuredImage || product.images[0];
  const defaultVariant = product.variants.find((v) => v.available) || product.variants[0];
  const inCart = defaultVariant ? isInCart(product.id, defaultVariant.id) : false;

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!defaultVariant) return;

    setIsAdding(true);
    const cartItem = createCartItemFromProduct(product, defaultVariant, 1);
    if (cartItem) {
      addItem(cartItem.product, cartItem.variant, cartItem.quantity);
    }
    setIsAdding(false);
  };

  const formatPrice = (min: number, max: number, currency: string) => {
    if (min === max) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(min);
    }
    return `${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(min)} – ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(max)}`;
  };

  const getBloodTypeLabel = (bloodType: string | null) => {
    switch (bloodType) {
      case "bestseller":
        return "Bestseller";
      case "new":
        return "New Arrival";
      case "sale":
        return "On Sale";
      case "exclusive":
        return "Exclusive";
      default:
        return null;
    }
  };

  const bloodTypeLabel = showBloodType ? getBloodTypeLabel(product.bloodType) : null;

  if (variant === "compact") {
    return (
      <Link href={`/shop/${product.handle}`} className="block group">
        <Card variant="velvet" interactive className="flex gap-4 p-3">
          <CardMedia aspectRatio="1/1" className="w-20 h-20 flex-shrink-0 rounded-none">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText || product.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="80px"
              />
            ) : (
              <div className="absolute inset-0 bg-void-700 flex items-center justify-center" />
            )}
          </CardMedia>
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              {showSourceBadge && (
                <Badge variant="velvet" className="text-xs mb-1">
                  {getSourceIcon(product.source)}
                  {getSourceLabel(product.source)}
                </Badge>
              )}
              <Typography element="h4" className="font-display text-step-1 text-pallor-100 truncate group-hover:text-blood-400 transition-colors">
                {product.title}
              </Typography>
            </div>
            <div className="flex items-center justify-between mt-2">
              <Typography element="span" className="font-body text-step-1 text-pallor-100 font-medium">
                {formatPrice(product.priceMin, product.priceMax, product.currency)}
              </Typography>
              {product.onSale && (
                <Badge variant="blood" className="text-xs">
                  <Percent className="w-3 h-3 mr-1" />
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/shop/${product.handle}`} className="block group">
      <Card variant="velvet" interactive className="h-full flex flex-col overflow-hidden group/product-card">
        {/* Image */}
        <CardMedia aspectRatio="4/5" className="relative overflow-hidden bg-void-800">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.altText || product.title}
              fill
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover/product-card:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 bg-void-700 flex items-center justify-center">
              <div className="w-16 h-16 border border-border-subtle rounded-full flex items-center justify-center">
                <Crown className="w-8 h-8 text-pallor-400" />
              </div>
            </div>
          )}

          {/* Badges overlay */}
          <div className="absolute top-3 left-3 right-3 flex flex-col gap-2">
            <div className="flex justify-between">
              {showSourceBadge && (
                <Badge variant="velvet" className="backdrop-blur-sm">
                  {getSourceIcon(product.source)}
                  <span className="ml-1 hidden sm:inline">{getSourceLabel(product.source)}</span>
                </Badge>
              )}
              {product.onSale && (
                <Badge variant="blood" className="backdrop-blur-sm">
                  <Percent className="w-3 h-3 mr-1" />
                  {product.discountPercentage}% OFF
                </Badge>
              )}
            </div>
            {bloodTypeLabel && showBloodType && (
              <div className="flex justify-start">
                <Badge variant="ritual" className="backdrop-blur-sm">
                  {bloodTypeLabel}
                </Badge>
              </div>
            )}
          </div>

          {/* Quick Add Button - hidden by default, shown on hover */}
          {showQuickAdd && defaultVariant && !inCart && (
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover/product-card:opacity-100 transition-opacity duration-300 translate-y-2 group-hover/product-card:translate-y-0">
              <Button
                variant="ritual"
                fullWidth
                size="sm"
                onClick={handleQuickAdd}
                disabled={isAdding}
                className="backdrop-blur-sm"
              >
                {isAdding ? (
                  <>
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Summoning...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Already in cart indicator */}
          {showQuickAdd && defaultVariant && inCart && (
            <div className="absolute bottom-3 left-3 right-3">
              <Button variant="ritual-secondary" fullWidth size="sm" className="backdrop-blur-sm" disabled>
                <ShoppingBag className="w-4 h-4 mr-2" />
                In Cart
              </Button>
            </div>
          )}
        </CardMedia>

        {/* Content */}
        <CardContent className="p-4 md:p-5 flex-1 flex flex-col">
          <div className="mb-2">
            <Typography element="h3" className="font-display text-step-2 text-pallor-100 line-clamp-2 group-hover:text-blood-400 transition-colors">
              {product.title}
            </Typography>
          </div>

          <div className="flex items-center gap-2 mb-3">
            {product.vendor !== "Horns & Halos" && (
              <Typography element="span" className="caption text-text-muted">
                {product.vendor}
              </Typography>
            )}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="velvet" className="text-xs">
                  {tag.replace(/-/g, " ")}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge variant="default" className="text-xs text-text-muted">
                  +{product.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mt-auto flex items-center gap-3">
            <Typography element="span" className="font-display text-step-2 text-pallor-100 font-medium">
              {formatPrice(product.priceMin, product.priceMax, product.currency)}
            </Typography>
            {product.compareAtPriceMin && product.onSale && (
              <Typography element="span" className="font-body text-step-1 text-text-muted line-through">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: product.currency }).format(product.compareAtPriceMin)}
              </Typography>
            )}
          </div>

          {/* Availability indicator */}
          {!product.availableForSale && (
            <Typography element="span" className="caption text-blood-400 mt-2 block">Out of Stock</Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export function ProductCardSkeleton({ variant = "default" }: { variant?: "default" | "compact" }) {
  if (variant === "compact") {
    return (
      <Card variant="velvet" className="flex gap-4 p-3">
        <div className="w-20 h-20 flex-shrink-0 rounded-none bg-void-700 animate-pulse" />
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-void-700 animate-pulse rounded-none" />
            <div className="h-5 w-3/4 bg-void-700 animate-pulse rounded-none" />
          </div>
          <div className="h-6 w-24 bg-void-700 animate-pulse rounded-none" />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="velvet" className="h-full flex flex-col">
      <CardMedia aspectRatio="4/5" className="bg-void-700 animate-pulse" />
      <CardContent className="p-4 md:p-5 flex-1 flex flex-col">
        <div className="space-y-3">
          <div className="h-4 w-24 bg-void-700 animate-pulse rounded-none" />
          <div className="h-5 w-3/4 bg-void-700 animate-pulse rounded-none" />
          <div className="h-4 w-16 bg-void-700 animate-pulse rounded-none" />
          <div className="h-4 w-20 bg-void-700 animate-pulse rounded-none" />
          <div className="mt-auto h-8 w-32 bg-void-700 animate-pulse rounded-none" />
        </div>
      </CardContent>
    </Card>
  );
}