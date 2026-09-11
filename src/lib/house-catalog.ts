import type { UnifiedProduct } from "@/types/product";

function product(partial: {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  category: UnifiedProduct["category"];
  tags: UnifiedProduct["tags"];
}): UnifiedProduct {
  const image = {
    id: `${partial.id}-img`,
    url: "/og-default.jpg",
    altText: partial.title,
    width: 1200,
    height: 630,
    position: 0,
  };
  const variant = {
    id: `${partial.id}-default`,
    sku: partial.handle.toUpperCase(),
    title: "Standard",
    price: partial.price,
    currency: "USD",
    available: true,
    inventoryQuantity: 66,
    selectedOptions: { Size: "M" },
    image,
  };
  return {
    id: partial.id,
    sourceId: partial.id,
    source: "hnh",
    sourceUrl: `/shop/${partial.handle}`,
    title: partial.title,
    handle: partial.handle,
    description: partial.description,
    vendor: "Horns & Halos",
    productType: "Apparel",
    category: partial.category,
    tags: partial.tags,
    priceMin: partial.price,
    priceMax: partial.price,
    currency: "USD",
    onSale: false,
    variants: [variant],
    options: [{ name: "Size", values: ["S", "M", "L", "XL"] }],
    selectedVariant: variant,
    images: [image],
    featuredImage: image,
    availableForSale: true,
    totalInventory: 66,
    trackInventory: false,
    bloodType: "exclusive",
    rating: 5,
    reviewCount: 6,
    reviews: [],
    seo: { title: partial.title, handle: partial.handle },
    createdAt: "2026-09-01T00:00:00.000Z",
    updatedAt: "2026-09-01T00:00:00.000Z",
    publishedAt: "2026-09-01T00:00:00.000Z",
    isCurated: true,
    relatedProductIds: [],
    collectionIds: ["house"],
  };
}

export function getHouseCatalog(): UnifiedProduct[] {
  return [
    product({
      id: "hnh-horned-six-tee",
      handle: "horned-six-tee",
      title: "Horned Six Seal Tee",
      description: "Black ritual tee with the horned six seal. House merch from Horns & Halos.",
      price: 48,
      category: "apparel",
      tags: ["exclusive", "sigil", "ritual-wear"],
    }),
    product({
      id: "hnh-cathedral-hoodie",
      handle: "cathedral-hoodie",
      title: "Cathedral Hoodie",
      description: "Heavyweight void hoodie for the coven. Official Horns & Halos drop.",
      price: 96,
      category: "outerwear",
      tags: ["new", "dark-aesthetic", "coven-curated"],
    }),
    product({
      id: "hnh-bazaar-cap",
      handle: "bazaar-cap",
      title: "Bazaar Sigil Cap",
      description: "Embroidered six-seal cap. One cart. Infinite darkness.",
      price: 36,
      category: "headwear",
      tags: ["bestseller", "sigil"],
    }),
    product({
      id: "hnh-altar-print",
      handle: "altar-print",
      title: "Altar Seal Print",
      description: "Museum-weight print of the horned six. Hang it over the workbench.",
      price: 72,
      category: "art",
      tags: ["limited", "occult"],
    }),
  ];
}
