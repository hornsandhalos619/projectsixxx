"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartState, CartItem, UnifiedProduct, ProductVariant, ProductImage } from "@/types/product";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";

const CART_STORAGE_KEY = "hnh-cart";

interface CartActions {
  // Core actions
  addItem: (product: UnifiedProduct, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Item helpers
  getItem: (itemId: string) => CartItem | undefined;
  getItemByProductVariant: (productId: string, variantId: string) => CartItem | undefined;
  isInCart: (productId: string, variantId: string) => boolean;
  getItemCount: (productId: string, variantId: string) => number;

  // Calculations
  recalculate: () => void;

  // Affiliate handling
  getItemsBySource: (source: UnifiedProduct["source"]) => CartItem[];
  getAffiliateItems: () => CartItem[];
  getHnHItems: () => CartItem[];

  // Persistence
  hydrate: () => void;
}

type CartStore = CartState & CartActions;

const initialState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  totalDiscount: 0,
  estimatedTax: 0,
  estimatedShipping: 0,
  total: 0,
  currency: "USD",
  appliedDiscountCodes: [],
  updatedAt: new Date().toISOString(),
};

function calculateTotals(items: CartItem[]): Omit<CartState, "items" | "appliedDiscountCodes" | "updatedAt"> {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiscount = items.reduce(
    (sum, item) => sum + (item.compareAtPrice ? (item.compareAtPrice - item.price) * item.quantity : 0),
    0
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Estimated tax (simplified - 8% for US)
  const estimatedTax = subtotal * 0.08;

  // Estimated shipping - free over $200, otherwise $10
  const estimatedShipping = subtotal >= 200 ? 0 : 10;

  const total = subtotal - totalDiscount + estimatedTax + estimatedShipping;

  return {
    itemCount,
    subtotal,
    totalDiscount,
    estimatedTax,
    estimatedShipping,
    total,
    currency: "USD",
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addItem: (product, variant, quantity = 1) => {
        const { items } = get();
        const existingIndex = items.findIndex(
          (item) => item.productId === product.id && item.variantId === variant.id
        );

        let newItems: CartItem[];

        if (existingIndex >= 0) {
          // Update existing item quantity
          newItems = items.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          const primaryImage = product.featuredImage || product.images[0];
          const newItem: CartItem = {
            id: `${product.id}-${variant.id}-${Date.now()}`,
            productId: product.id,
            variantId: variant.id,
            quantity,
            title: product.title,
            handle: product.handle,
            price: variant.price,
            compareAtPrice: variant.compareAtPrice,
            currency: product.currency,
            image: primaryImage || {
              id: "placeholder",
              url: "/placeholder-product.jpg",
              altText: product.title,
              width: 400,
              height: 400,
              position: 0,
            },
            selectedOptions: variant.selectedOptions,
            source: product.source,
            sourceUrl: product.sourceUrl,
            bloodType: product.bloodType,
          };
          newItems = [...items, newItem];
        }

        const totals = calculateTotals(newItems);
        set({
          items: newItems,
          ...totals,
          updatedAt: new Date().toISOString(),
        });
      },

      removeItem: (itemId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== itemId);
        const totals = calculateTotals(newItems);
        set({
          items: newItems,
          ...totals,
          updatedAt: new Date().toISOString(),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const { items } = get();
        const newItems = items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        );
        const totals = calculateTotals(newItems);
        set({
          items: newItems,
          ...totals,
          updatedAt: new Date().toISOString(),
        });
      },

      clearCart: () => {
        set({ ...initialState, updatedAt: new Date().toISOString() });
      },

      getItem: (itemId) => {
        return get().items.find((item) => item.id === itemId);
      },

      getItemByProductVariant: (productId, variantId) => {
        return get().items.find(
          (item) => item.productId === productId && item.variantId === variantId
        );
      },

      isInCart: (productId, variantId) => {
        return get().items.some(
          (item) => item.productId === productId && item.variantId === variantId
        );
      },

      getItemCount: (productId, variantId) => {
        const item = get().getItemByProductVariant(productId, variantId);
        return item?.quantity || 0;
      },

      recalculate: () => {
        const { items } = get();
        const totals = calculateTotals(items);
        set({ ...totals, updatedAt: new Date().toISOString() });
      },

      getItemsBySource: (source) => {
        return get().items.filter((item) => item.source === source);
      },

      getAffiliateItems: () => {
        return get().items.filter((item) => item.source !== "hnh");
      },

      getHnHItems: () => {
        return get().items.filter((item) => item.source === "hnh");
      },

      hydrate: () => {
        // Triggered on client-side hydration
        const { items } = get();
        if (items.length > 0) {
          const totals = calculateTotals(items);
          set({ ...totals });
        }
      },
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        appliedDiscountCodes: state.appliedDiscountCodes,
        note: state.note,
        currency: state.currency,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrate();
        }
      },
    }
  )
);

// Selector hooks for performance
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartItemCount = () => useCartStore((state) => state.itemCount);
export const useCartSubtotal = () => useCartStore((state) => state.subtotal);
export const useCartTotal = () => useCartStore((state) => state.total);
export const useCartTotalDiscount = () => useCartStore((state) => state.totalDiscount);
export const useCartIsEmpty = () => useCartStore((state) => state.items.length === 0);
export const useCartCurrency = () => useCartStore((state) => state.currency);

// Formatted price selectors
export const useFormattedSubtotal = () => {
  const subtotal = useCartSubtotal();
  const currency = useCartCurrency();
  return formatPrice(subtotal, currency);
};

export const useFormattedTotal = () => {
  const total = useCartTotal();
  const currency = useCartCurrency();
  return formatPrice(total, currency);
};

export const useFormattedDiscount = () => {
  const discount = useCartTotalDiscount();
  const currency = useCartCurrency();
  return formatPrice(discount, currency);
};

// Cart actions hook
export const useCartActions = () =>
  useCartStore((state) => ({
    addItem: state.addItem,
    removeItem: state.removeItem,
    updateQuantity: state.updateQuantity,
    clearCart: state.clearCart,
    getItem: state.getItem,
    isInCart: state.isInCart,
    getItemCount: state.getItemCount,
    getItemsBySource: state.getItemsBySource,
    getAffiliateItems: state.getAffiliateItems,
    getHnHItems: state.getHnHItems,
  }));

// Helper to create cart item from product for quick-add
export function createCartItemFromProduct(
  product: UnifiedProduct,
  variant?: ProductVariant,
  quantity: number = 1
): { product: UnifiedProduct; variant: ProductVariant; quantity: number } | null {
  const selectedVariant = variant || product.variants.find((v) => v.available) || product.variants[0];
  if (!selectedVariant) return null;

  return { product, variant: selectedVariant, quantity };
}