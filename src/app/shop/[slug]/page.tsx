import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui/section";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardMedia } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/divider";
import { ProductCard } from "@/components/shop/ProductCard";
import { SourceBadge, BloodTypeBadge } from "@/components/shop/Badges";
import { createCartItemFromProduct, useCartActions } from "@/lib/cart";
import { getUnifiedProduct, getRelatedProducts } from "@/lib/unified-shop";
import type { UnifiedProduct, ProductVariant, ProductImage } from "@/types/product";
import { Crown, Tag, Heart, Building2, ExternalLink, ChevronLeft, ChevronRight, X, ShoppingBag, Heart as HeartIcon, Share2, Minus, Plus, Loader2, Truck, Shield, RotateCcw, Star } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProductData(slug: string) {
  const product = await getUnifiedProduct(slug);
  const related = product ? await getRelatedProducts(product.id, 4) : [];
  return { product, related };
}

function ProductImageGallery({ product, selectedVariant }: { product: UnifiedProduct; selectedVariant?: ProductVariant }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product.images.length > 0 ? product.images : (product.featuredImage ? [product.featuredImage] : []);
  const variantImage = selectedVariant?.image;
  const displayImages = variantImage ? [variantImage, ...images.filter((img) => img.id !== variantImage.id)] : images;

  if (displayImages.length === 0) {
    return (
      <div className="aspect-[4/5] bg-void-800 flex items-center justify-center relative overflow-hidden">
        <div className="w-24 h-24 border border-border-subtle rounded-full flex items-center justify-center">
          <Crown className="w-12 h-12 text-pallor-400" />
        </div>
      </div>
    );
  }

  const currentImage = displayImages[currentImageIndex];

  return (
    <div className="relative aspect-[4/5] bg-void-800 overflow-hidden">
      {/* Main Image */}
      <div className="absolute inset-0">
        <Image
          src={currentImage.url}
          alt={currentImage.altText || product.title}
          fill
          priority
          className={cn("object-cover transition-transform duration-300", isZoomed && "scale-150")}
          sizes="(max-width: 768px) 100vw, 50vw"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {displayImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                "w-16 h-16 rounded-none overflow-hidden border-2 transition-all",
                index === currentImageIndex
                  ? "border-blood-400"
                  : "border-border-subtle hover:border-blood-400/50"
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === currentImageIndex ? "true" : "false"}
            >
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-void-900/50 border border-border-subtle hover:border-blood-400 hover:bg-void-800 transition-colors rounded-none opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-pallor-300" />
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-void-900/50 border border-border-subtle hover:border-blood-400 hover:bg-void-800 transition-colors rounded-none opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-pallor-300" />
          </button>
        </>
      )}

      {/* Blood Type Badge */}
      {product.bloodType && (
        <div className="absolute top-4 left-4 z-10">
          <BloodTypeBadge bloodType={product.bloodType} size="md" />
        </div>
      )}

      {/* Source Badge */}
      <div className="absolute top-4 right-4 z-10">
        <SourceBadge source={product.source} size="sm" showLabel={false} />
      </div>

      {/* Sale Badge */}
      {product.onSale && product.discountPercentage && (
        <div className="absolute top-4 left-4 z-10" style={{ top: product.bloodType ? '60px' : '16px' }}>
          <Badge variant="blood" className="text-sm px-3 py-1">
            -{product.discountPercentage}%
          </Badge>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";

function ProductInfo({ product }: { product: UnifiedProduct }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, isInCart } = useCartActions();

  const selectedVariant = product.variants[selectedVariantIndex] || product.variants[0];
  const inCart = selectedVariant ? isInCart(product.id, selectedVariant.id) : false;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;

    setIsAdding(true);
    const cartItem = createCartItemFromProduct(product, selectedVariant, quantity);
    if (cartItem) {
      addItem(cartItem.product, cartItem.variant, cartItem.quantity);
    }
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    // Navigate to cart/checkout
    window.location.href = "/cart";
  };

  return (
    <div className="space-y-6">
      {/* Title & Source */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <SourceBadge source={product.source} size="md" />
          {product.bloodType && <BloodTypeBadge bloodType={product.bloodType} size="sm" />}
        </div>
        <Typography element="h1" className="font-display text-step-5 md:text-step-6 tracking-tight text-pallor-50">
          {product.title}
        </Typography>
        {product.vendor !== "Horns & Halos" && (
          <Typography element="p" className="font-body text-pallor-300 mt-2">
            by {product.vendor}
          </Typography>
        )}
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4 flex-wrap">
        <Typography element="span" className="font-display text-step-4 md:text-step-5 text-pallor-100 font-medium">
          {formatPrice(selectedVariant?.price || product.priceMin, product.currency)}
        </Typography>
        {selectedVariant?.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price && (
          <Typography element="span" className="font-body text-step-2 text-text-muted line-through">
            {formatPrice(selectedVariant.compareAtPrice, product.currency)}
          </Typography>
        )}
        {product.onSale && product.discountPercentage && (
          <Badge variant="blood" className="text-sm px-3 py-1 self-center">
            {product.discountPercentage}% OFF
          </Badge>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div className="prose prose-invert max-w-none text-text-secondary">
          <Typography element="p" className="font-body leading-relaxed">
            {product.description}
          </Typography>
        </div>
      )}

      {/* Variant Selection */}
      {product.variants.length > 1 && product.options.length > 0 && (
        <div className="space-y-4">
          {product.options.map((option, optionIndex) => (
            <div key={option.name} className="space-y-2">
              <Typography element="label" className="font-ui text-sm text-pallor-200 block">
                {option.name}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {option.values.map((value, valueIndex) => {
                  const isSelected = selectedVariant?.selectedOptions[option.name] === value;
                  const hasVariant = product.variants.some(
                    (v) => v.selectedOptions[option.name] === value && v.available
                  );
                  return (
                    <button
                      key={value}
                      onClick={() => {
                        // Find variant with this option value
                        const newVariant = product.variants.find(
                          (v) => v.selectedOptions[option.name] === value && v.available
                        );
                        if (newVariant) {
                          setSelectedVariantIndex(product.variants.indexOf(newVariant));
                        }
                      }}
                      disabled={!hasVariant}
                      className={cn(
                        "px-4 py-2 border font-ui text-sm transition-all",
                        isSelected
                          ? "border-blood-400 bg-blood-500/10 text-blood-400"
                          : "border-border-subtle bg-void-800 text-pallor-300 hover:border-blood-400/50 disabled:opacity-50 disabled:pointer-events-none"
                      )}
                      aria-pressed={isSelected}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity Selector */}
      <div className="space-y-2">
        <Typography element="label" className="font-ui text-sm text-pallor-200 block">
          Quantity
        </Typography>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border-subtle bg-void-800">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="p-3 text-pallor-400 hover:text-pallor-100 hover:bg-void-700 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <Typography element="span" className="font-display text-step-1 text-pallor-100 px-4 w-12 text-center">
              {quantity}
            </Typography>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="p-3 text-pallor-400 hover:text-pallor-100 hover:bg-void-700 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <Typography element="span" className="caption text-text-muted">
            Available: {selectedVariant?.inventoryQuantity || product.totalInventory}
          </Typography>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border-subtle">
        <Button
          variant="ritual"
          fullWidth
          size="lg"
          onClick={handleAddToCart}
          disabled={isAdding || !selectedVariant?.available}
          className="group"
        >
          {isAdding ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Summoning...
            </>
          ) : inCart ? (
            <>
              <ShoppingBag className="w-5 h-5 mr-2" />
              In Cart
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

        <Button
          variant="velvet"
          fullWidth
          size="lg"
          onClick={handleBuyNow}
          disabled={!selectedVariant?.available}
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Buy Now
        </Button>
      </div>

      {/* Wishlist/Share */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="p-2">
          <HeartIcon className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="sm" className="p-2">
          <Share2 className="w-5 h-5" />
        </Button>
        <Typography element="span" className="caption text-text-muted ml-auto">
          {product.source === "hnh" ? "Ships from Horns & Halos" : `Redirects to ${product.source}`}
        </Typography>
      </div>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-border-subtle">
        <div className="flex items-center gap-2 text-text-muted">
          <Truck className="w-5 h-5" />
          <span className="font-body text-sm">Free shipping $200+</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <Shield className="w-5 h-5" />
          <span className="font-body text-sm">Secure checkout</span>
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <RotateCcw className="w-5 h-5" />
          <span className="font-body text-sm">30-day returns</span>
        </div>
      </div>
    </div>
  );
}

function ProductTabs({ product }: { product: UnifiedProduct }) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="bg-void-800 border border-border-subtle p-1">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        {product.tags.length > 0 && <TabsTrigger value="tags">Tags</TabsTrigger>}
        {product.reviews.length > 0 && <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>}
      </TabsList>

      <TabsContent value="description" className="pt-6">
        <div className="prose prose-invert max-w-none text-text-secondary">
          {product.descriptionHtml
            ? <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            : <Typography element="p" className="font-body leading-relaxed">{product.description || "No description available."}</Typography>}
        </div>
      </TabsContent>

      <TabsContent value="details" className="pt-6">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            ["Category", product.category],
            ["Product Type", product.productType],
            ["Vendor", product.vendor],
            ["Source", product.source === "hnh" ? "Horns & Halos Official" : product.source],
            ["SKU", selectedVariant?.sku || product.variants[0]?.sku || "N/A"],
            ["Currency", product.currency],
            ["Inventory", product.totalInventory.toString()],
            ["Track Inventory", product.trackInventory ? "Yes" : "No"],
            product.bloodType && ["Blood Type", product.bloodType.charAt(0).toUpperCase() + product.bloodType.slice(1)],
            ["Created", new Date(product.createdAt).toLocaleDateString()],
            ["Updated", new Date(product.updatedAt).toLocaleDateString()],
          ].filter(Boolean).map(([label, value], index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-void-800 border border-border-subtle">
              <Typography element="dt" className="font-ui text-sm text-pallor-400 sm:w-32">
                {label}
              </Typography>
              <Typography element="dd" className="font-body text-pallor-200">
                {value}
              </Typography>
            </div>
          ))}
        </dl>
      </TabsContent>

      <TabsContent value="tags" className="pt-6">
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <Badge key={tag} variant="velvet" className="text-sm">
              {tag.replace(/-/g, " ")}
            </Badge>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="pt-6">
        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div key={review.id} className="p-4 bg-void-800 border border-border-subtle">
              <div className="flex items-start gap-3">
                {review.authorAvatar && (
                  <Image src={review.authorAvatar} alt="" width={40} height={40} className="rounded-full" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Typography element="h4" className="font-display text-step-1 text-pallor-100">
                      {review.author}
                    </Typography>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn("w-4 h-4", i < review.rating ? "fill-current text-wine-300" : "text-pallor-600")}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                      <Typography element="span" className="font-body text-sm text-pallor-400 ml-2">
                        {review.rating}/5
                      </Typography>
                    </div>
                  </div>
                  <Typography element="p" className="font-body text-sm text-pallor-300 mt-1">
                    {review.title}
                  </Typography>
                  <Typography element="p" className="font-body text-text-secondary mt-2">
                    {review.content}
                  </Typography>
                  <div className="flex items-center justify-between mt-3">
                    <Typography element="span" className="caption text-text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                    {review.verifiedPurchase && (
                      <Badge variant="velvet" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {product.reviews.length === 0 && (
            <Typography element="p" className="text-text-muted text-center py-8">
              No reviews yet. Be the first to inscribe your testament.
            </Typography>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function RelatedProducts({ products }: { products: UnifiedProduct[] }) {
  if (products.length === 0) return null;

  return (
    <Section className="py-10">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <Typography element="h2" className="font-display text-step-4 text-pallor-100">
            You May Also Desire
          </Typography>
          <Link href="/shop" className="link text-blood-400 hover:text-blood-300">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} priority={false} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { product } = await getProductData(resolvedParams.slug);

  if (!product) {
    return {
      title: "Ritual Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      type: "website",
      images: product.featuredImage ? [{ url: product.featuredImage.url, alt: product.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.featuredImage ? [product.featuredImage.url] : [],
    },
    other: {
      "product:price:amount": product.priceMin.toString(),
      "product:price:currency": product.currency,
      "product:availability": product.availableForSale ? "in stock" : "out of stock",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const { product, related } = await getProductData(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-void-900 text-text-primary">
      {/* Breadcrumb */}
      <Container className="py-6">
        <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link href="/" className="text-text-muted hover:text-pallor-100">
            <Crown className="w-4 h-4" />
          </Link>
          <span className="text-text-muted">/</span>
          <Link href="/shop" className="text-text-muted hover:text-pallor-100">
            The Bazaar
          </Link>
          <span className="text-text-muted">/</span>
          <Link href={`/shop/${product.source}`} className="text-text-muted hover:text-pallor-100">
            {product.source === "hnh" ? "Horns & Halos" : product.source.charAt(0).toUpperCase() + product.source.slice(1)}
          </Link>
          <span className="text-text-muted">/</span>
          <Typography element="span" className="font-body text-pallor-300 truncate max-w-[200px]" aria-current="page">
            {product.title}
          </Typography>
        </nav>
      </Container>

      {/* Product Detail */}
      <Section className="pb-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Image Gallery */}
            <div className="relative group">
              <Suspense fallback={<div className="aspect-[4/5] bg-void-800 animate-pulse" />}>
                <ProductImageGallery product={product} />
              </Suspense>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-24">
              <Suspense fallback={<div className="space-y-6"><div className="h-8 bg-void-800 animate-pulse w-3/4" /><div className="h-10 bg-void-800 animate-pulse w-1/2" /></div>}>
                <ProductInfo product={product} />
              </Suspense>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 lg:col-span-2">
            <Suspense fallback={<div className="h-64 bg-void-800 animate-pulse" />}>
              <ProductTabs product={product} />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      <Suspense fallback={<ProductCardSkeleton count={4} />}>
        <RelatedProducts products={related} />
      </Suspense>

      {/* CTA */}
      <Section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blood-400/5 via-void-900 to-wine-400/5" aria-hidden="true" />
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Crown className="w-16 h-16 mx-auto mb-6 text-blood-400/50" />
            <Typography element="h2" className="font-display text-step-4 text-pallor-100 mb-4">
              Complete Your Ritual
            </Typography>
            <Typography element="p" className="body-large text-text-secondary mb-8">
              The bazaar holds infinite darkness. Explore more rituals from the unified marketplace.
            </Typography>
            <Link href="/shop">
              <Button variant="ritual" size="lg" className="w-full sm:w-auto">
                <Crown className="w-5 h-5 mr-2" />
                Return to the Bazaar
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ProductCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="aspect-[4/5] bg-void-800 animate-pulse rounded-none" />
      ))}
    </div>
  );
}