"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { SourceBadge, BloodTypeBadge } from "@/components/shop/Badges";
import { useCartItems, useCartTotal, useCartItemCount, useCartSubtotal, useCartTotalDiscount, useCartActions, useFormattedTotal, useFormattedSubtotal, useFormattedDiscount } from "@/lib/cart";
import type { CartItem, ProductSource } from "@/types/product";
import { Crown, Tag, Heart, Building2, ExternalLink, Trash2, Minus, Plus, ArrowRight, Loader2, Truck, Shield, RotateCcw, X, ShoppingBag, Crown as CrownIcon } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

const SOURCE_ICONS: Record<ProductSource, React.ReactNode> = {
  hnh: <CrownIcon className="w-3 h-3" />,
  spreadshirt: <Tag className="w-3 h-3" />,
  threadless: <Heart className="w-3 h-3" />,
  etsy: <Building2 className="w-3 h-3" />,
  affiliate: <ExternalLink className="w-3 h-3" />,
};

const SOURCE_LABELS: Record<ProductSource, string> = {
  hnh: "Horns & Halos",
  spreadshirt: "Spreadshirt",
  threadless: "Threadless",
  etsy: "Etsy",
  affiliate: "Affiliate",
};

export default function CartPage() {
  const items = useCartItems();
  const total = useFormattedTotal();
  const subtotal = useFormattedSubtotal();
  const discount = useFormattedDiscount();
  const itemCount = useCartItemCount();
  const { removeItem, updateQuantity, clearCart, getItemsBySource, getAffiliateItems, getHnHItems } = useCartActions();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedCodes, setAppliedCodes] = useState<string[]>([]);

  const hnhItems = getHnHItems();
  const affiliateItems = getAffiliateItems();

  const handleApplyDiscount = () => {
    if (discountCode.trim() && !appliedCodes.includes(discountCode.trim())) {
      setAppliedCodes((prev) => [...prev, discountCode.trim()]);
      setDiscountCode("");
      // In a real app, this would call an API to validate the code
    }
  };

  const handleRemoveCode = (code: string) => {
    setAppliedCodes((prev) => prev.filter((c) => c !== code));
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (hnhItems.length > 0 && affiliateItems.length === 0) {
      // All HnH - direct to Shopify checkout
      window.location.href = "/checkout?source=hnh";
    } else if (hnhItems.length === 0 && affiliateItems.length > 0) {
      // All affiliate - redirect to respective sites
      window.location.href = "/checkout?source=affiliate";
    } else {
      // Mixed - unified checkout
      window.location.href = "/checkout?source=mixed";
    }
    
    setIsCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-void-900 text-text-primary">
        <Container className="py-20 md:py-32">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-void-800 rounded-full flex items-center justify-center border border-border-subtle">
              <ShoppingBag className="w-12 h-12 text-pallor-400" />
            </div>
            <Typography element="display" className="font-display text-step-5 text-pallor-100 mb-3">
              Your Cart is Empty
            </Typography>
            <Typography element="body-lg" className="body-large text-text-secondary mb-8 max-w-sm mx-auto">
              The void awaits your offering. Summon some rituals from the bazaar.
            </Typography>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button variant="ritual" size="lg" className="w-full sm:w-auto">
                  <CrownIcon className="w-5 h-5 mr-2" />
                  Enter the Bazaar
                </Button>
              </Link>
              <Link href="/shop/hnh">
                <Button variant="velvet" size="lg" className="w-full sm:w-auto">
                  <CrownIcon className="w-5 h-5 mr-2" />
                  Horns & Halos Official
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void-900 text-text-primary">
      <Container className="py-10 md:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          <div>
            <Typography element="display" className="font-display text-step-5 text-pallor-100">
              The Cart
            </Typography>
            <Typography element="body" className="body text-text-secondary mt-1">
              {itemCount} {itemCount === 1 ? "ritual" : "rituals"} awaiting the ritual
            </Typography>
          </div>
          {items.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCart} className="text-blood-400 hover:text-blood-300">
              <Trash2 className="w-4 h-4 mr-2" />
              Empty Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* HnH Items */}
            {hnhItems.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CrownIcon className="w-5 h-5 text-wine-300" />
                    <Typography element="headline" className="font-display text-step-2 text-pallor-100">
                      Horns & Halos Official
                    </Typography>
                    <Badge variant="blood" className="text-xs ml-2">{hnhItems.length}</Badge>
                  </div>
                </div>
                {hnhItems.map((item) => (
                  <CartItemRow key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                ))}
              </div>
            )}

            {/* Affiliate Items */}
            {affiliateItems.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border-subtle">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-5 h-5 text-blood-400" />
                    <Typography element="headline" className="font-display text-step-2 text-pallor-100">
                      Affiliate Marketplace
                    </Typography>
                    <Badge variant="blood" className="text-xs ml-2">{affiliateItems.length}</Badge>
                  </div>
                  <Typography element="muted" className="caption text-text-muted">
                    Redirects to partner sites
                  </Typography>
                </div>
                {affiliateItems.map((item) => (
                  <CartItemRow key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                ))}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card variant="velvet" className="sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="font-display text-step-3">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Typography element="span" className="font-body text-pallor-300">Subtotal</Typography>
                    <Typography element="span" className="font-body text-pallor-100 font-medium">{subtotal}</Typography>
                  </div>
                  {parseFloat(discount.replace(/[^0-9.]/g, "")) > 0 && (
                    <div className="flex justify-between text-blood-400">
                      <Typography element="span" className="font-body">Discount</Typography>
                      <Typography element="span" className="font-body font-medium">-{discount}</Typography>
                    </div>
                  )}
                  {appliedCodes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {appliedCodes.map((code) => (
                        <Badge key={code} variant="velvet" className="flex items-center gap-1">
                          {code}
                          <button onClick={() => handleRemoveCode(code)} className="ml-1 p-0.5 hover:text-blood-400">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between text-text-muted text-sm">
                    <Typography element="body" className="font-body">Est. Tax (8%)</Typography>
                    <Typography element="body" className="font-body font-medium">{formatPrice((parseFloat(subtotal.replace(/[^0-9.]/g, "")) - parseFloat(discount.replace(/[^0-9.]/g, ""))) * 0.08)}</Typography>
                  </div>
                  <div className="flex justify-between text-text-muted text-sm">
                    <Typography element="body" className="font-body">Est. Shipping</Typography>
                    <Typography element="body" className="font-body font-medium">
                      {parseFloat(subtotal.replace(/[^0-9.]/g, "")) >= 200 ? (
                        <span className="text-accent-primary">Free</span>
                      ) : (
                        formatPrice(10)
                      )}
                    </Typography>
                  </div>
                </div>

                {/* Discount Code Input */}
                <div className="pt-4 border-t border-border-subtle">
                  <Typography element="label" className="font-ui text-sm text-pallor-200 block mb-2">
                    Gift Sigil / Discount Code
                  </Typography>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="ENTER SIGIL"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                      className="flex-1 text-center font-mono tracking-wider"
                      maxLength={20}
                    />
                    <Button variant="velvet" size="sm" onClick={handleApplyDiscount} disabled={!discountCode.trim()}>
                      Apply
                    </Button>
                  </div>
                </div>

                <Divider className="border-border-subtle my-4" />

                {/* Total */}
                <div className="flex justify-between">
                  <Typography element="span" className="font-display text-step-2 text-pallor-100">Total</Typography>
                  <Typography element="span" className="font-display text-step-2 text-blood-400 font-medium">{total}</Typography>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3 pt-2">
                  <Button
                    variant="ritual"
                    fullWidth
                    size="lg"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="group"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Opening the Portal...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Proceed to Ritual
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <Link href="/shop">
                    <Button variant="velvet" fullWidth size="md">
                      Continue Summoning
                    </Button>
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-4 border-t border-border-subtle space-y-3">
                  <Typography element="body" className="caption text-text-muted text-center">
                    Secure checkout • Free shipping on orders $200+ • 30-day returns
                  </Typography>
                  <div className="flex flex-wrap justify-center gap-4 text-center">
                    <div className="flex items-center gap-1 text-text-muted">
                      <Truck className="w-4 h-4" />
                      <span className="font-body text-xs">Free Shipping $200+</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-muted">
                      <Shield className="w-4 h-4" />
                      <span className="font-body text-xs">Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-muted">
                      <RotateCcw className="w-4 h-4" />
                      <span className="font-body text-xs">30-Day Returns</span>
                    </div>
                  </div>
                </div>

                {/* Source Notice */}
                {(hnhItems.length > 0 && affiliateItems.length > 0) && (
                  <div className="p-3 bg-blood-500/10 border border-blood-400/20">
                    <Typography element="p" className="caption text-blood-300 text-center">
                      This cart contains items from multiple realms. Horns & Halos items process via Shopify. Affiliate items redirect to partner sites.
                    </Typography>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}) {
  const sourceIcon = SOURCE_ICONS[item.source];
  const sourceLabel = SOURCE_LABELS[item.source];
  const lineTotal = item.price * item.quantity;

  return (
    <Card variant="velvet" className="p-0 overflow-hidden">
      <div className="flex gap-4 p-4">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-none overflow-hidden">
          <Image
            src={item.image.url}
            alt={item.image.altText || item.title}
            fill
            className="object-cover"
            sizes="80px"
          />
          {item.bloodType && (
            <div className="absolute top-1 left-1">
              <BloodTypeBadge bloodType={item.bloodType} size="sm" showLabel={false} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2">
              <Typography element="headline" className="font-display text-step-1 text-pallor-100 truncate pr-2">
                {item.title}
              </Typography>
              <button
                onClick={() => onRemove(item.id)}
                className="flex-shrink-0 p-1 text-pallor-400 hover:text-blood-400 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-1">
              {sourceIcon}
              <Typography element="muted" className="caption text-text-muted">{sourceLabel}</Typography>
            </div>

            <Typography element="span" className="caption text-text-secondary mt-1">
              {Object.entries(item.selectedOptions).map(([key, value]) => `${key}: ${value}`).join(" • ")}
            </Typography>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 bg-void-900 border border-border-subtle">
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-2 text-pallor-400 hover:text-pallor-100 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <Typography element="span" className="font-display text-step-1 text-pallor-100 w-10 text-center">
                {item.quantity}
              </Typography>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-2 text-pallor-400 hover:text-pallor-100"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <Typography element="span" className="font-display text-step-1 text-pallor-100 font-medium">
              {formatPrice(lineTotal)}
            </Typography>
          </div>
        </div>
      </div>
    </Card>
  );
}