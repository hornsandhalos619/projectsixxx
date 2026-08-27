"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, Crown, Tag, Heart, Building2, ExternalLink, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/divider";
import Image from "next/image";
import { useCartStore, useCartItems, useCartTotal, useCartItemCount, useCartSubtotal, useCartTotalDiscount, useCartActions, useFormattedTotal, useFormattedSubtotal, useFormattedDiscount } from "@/lib/cart";
import type { CartItem, ProductSource } from "@/types/product";
import { cn, formatPrice } from "@/lib/utils";

const SOURCE_ICONS: Record<ProductSource, React.ReactNode> = {
  hnh: <Crown className="w-3 h-3" />,
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

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const items = useCartItems();
  const total = useFormattedTotal();
  const subtotal = useFormattedSubtotal();
  const discount = useFormattedDiscount();
  const itemCount = useCartItemCount();
  const { removeItem, updateQuantity, clearCart, getItemsBySource, getAffiliateItems, getHnHItems } = useCartActions();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const hnhItems = getHnHItems();
  const affiliateItems = getAffiliateItems();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-void-950/80 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed right-0 top-0 h-full w-full max-w-md bg-void-900 border-l border-border-subtle z-50 flex flex-col animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <CardHeader className="p-5 border-b border-border-subtle flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-blood-400" />
              <CardTitle className="font-display text-step-3">The Cart</CardTitle>
              {itemCount > 0 && (
                <Badge variant="blood" className="text-xs">
                  {itemCount}
                </Badge>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-pallor-400 hover:text-pallor-100 transition-colors rounded-none hover:bg-void-800"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-void-800 rounded-full flex items-center justify-center border border-border-subtle">
                <ShoppingBag className="w-8 h-8 text-pallor-400" />
              </div>
              <Typography element="h4" className="font-display text-step-2 text-pallor-100 mb-2">
                Your Cart is Empty
              </Typography>
              <Typography element="p" className="body text-text-secondary mb-6">
                The void awaits your offering. Summon some rituals.
              </Typography>
              <Button variant="ritual" fullWidth onClick={onClose}>
                Enter the Bazaar
              </Button>
            </div>
          ) : (
            <>
              {/* HnH Items */}
              {hnhItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-wine-300" />
                    <Typography element="span" className="caption text-pallor-200 uppercase tracking-wider">
                      Horns & Halos Official
                    </Typography>
                    <Badge variant="velvet" className="text-xs ml-auto">{hnhItems.length}</Badge>
                  </div>
                  {hnhItems.map((item) => (
                    <CartItemRow key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                  ))}
                </div>
              )}

              {/* Affiliate Items */}
              {affiliateItems.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blood-400" />
                    <Typography element="span" className="caption text-pallor-200 uppercase tracking-wider">
                      Affiliate Marketplace
                    </Typography>
                    <Badge variant="blood" className="text-xs ml-auto">{affiliateItems.length}</Badge>
                  </div>
                  {affiliateItems.map((item) => (
                    <CartItemRow key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
                  ))}
                </div>
              )}

              {/* Clear cart button */}
              {items.length > 0 && (
                <Button variant="ghost" fullWidth size="sm" onClick={clearCart} className="text-blood-400 hover:text-blood-300 mt-4">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Empty the Cart
                </Button>
              )}
            </>
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <CardContent className="p-5 border-t border-border-subtle flex-shrink-0 space-y-4">
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
              <div className="flex justify-between text-text-muted text-sm">
                <Typography element="span" className="font-body">Est. Tax (8%)</Typography>
                <Typography element="span" className="font-body">
                  {formatPrice((parseFloat(subtotal.replace(/[^0-9.]/g, "")) - parseFloat(discount.replace(/[^0-9.]/g, ""))) * 0.08)}
                </Typography>
              </div>
              <div className="flex justify-between text-text-muted text-sm">
                <Typography element="span" className="font-body">Est. Shipping</Typography>
                <Typography element="span" className="font-body">
                  {parseFloat(subtotal.replace(/[^0-9.]/g, "")) >= 200 ? "Free" : formatPrice(10)}
                </Typography>
              </div>
            </div>

            <Separator className="border-border-subtle" />

            <div className="flex justify-between">
              <Typography element="span" className="font-display text-step-2 text-pallor-100">Total</Typography>
              <Typography element="span" className="font-display text-step-2 text-blood-400 font-medium">{total}</Typography>
            </div>

            {/* Checkout buttons */}
            <div className="space-y-3 pt-2">
              <Button
                variant="ritual"
                fullWidth
                size="lg"
                onClick={() => {
                  setIsCheckingOut(true);
                  // Navigate to checkout - split by source
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
                }}
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

              <Button variant="velvet" fullWidth size="md" onClick={onClose}>
                Continue Summoning
              </Button>
            </div>

            <Typography element="p" className="caption text-text-muted text-center">
              Secure checkout • Free shipping on orders $200+ • 30-day returns
            </Typography>
          </CardContent>
        )}
      </aside>
    </>
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
    <div className="flex gap-3 p-3 bg-void-800 border border-border-subtle relative group">
      <div className="relative w-16 h-16 flex-shrink-0 rounded-none overflow-hidden">
        <Image
          src={item.image.url}
          alt={item.image.altText || item.title}
          fill
          className="object-cover"
          sizes="64px"
        />
        {item.bloodType && (
          <div className="absolute top-1 left-1">
            <Badge variant="ritual" className="text-[10px] px-1.5 py-0.5">
              {item.bloodType.charAt(0).toUpperCase() + item.bloodType.slice(1)}
            </Badge>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Typography element="h4" className="font-display text-step-1 text-pallor-100 truncate pr-2">
              {item.title}
            </Typography>
            <button
              onClick={() => onRemove(item.id)}
              className="flex-shrink-0 p-1 text-pallor-400 hover:text-blood-400 transition-colors opacity-0 group-hover:opacity-100"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-1">
            {sourceIcon}
            <Typography element="span" className="caption text-text-muted">{sourceLabel}</Typography>
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
            <Typography element="span" className="font-body text-step-1 text-pallor-100 w-8 text-center">
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
  );
}

import { useState } from "react";