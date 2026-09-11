"use client";

import { useState } from "react";
import Image from "next/image";
import type { UnifiedProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function ProductImageGallery({ product }: { product: UnifiedProduct }) {
  const image = product.featuredImage || product.images[0];
  if (!image) {
    return <div className="aspect-[4/5] bg-void-800" />;
  }
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-void-800">
      <Image src={image.url} alt={image.altText || product.title} fill className="object-cover" sizes="50vw" priority />
    </div>
  );
}

export function ProductInfo({ product }: { product: UnifiedProduct }) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-step-5 text-pallor-50">{product.title}</h1>
      <p className="font-display text-step-4 text-pallor-100">{formatPrice(product.priceMin, product.currency)}</p>
      <p className="font-body text-text-secondary">{product.description}</p>
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</Button>
        <span>{quantity}</span>
        <Button variant="ghost" onClick={() => setQuantity((q) => q + 1)}>+</Button>
      </div>
    </div>
  );
}
