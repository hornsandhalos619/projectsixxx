import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductImageGallery, ProductInfo } from "@/components/shop/ProductDetailClient";
import { getUnifiedProduct } from "@/lib/unified-shop";
import { getHouseCatalog } from "@/lib/house-catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function findProduct(slug: string) {
  return (await getUnifiedProduct(slug)) || getHouseCatalog().find((p) => p.handle === slug) || null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) return { title: "Ritual Not Found" };
  return { title: product.title, description: (product.description || product.title).slice(0, 160) };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) notFound();
  return (
    <div className="min-h-screen bg-void-900 text-text-primary">
      <div className="container py-10">
        <Link href="/shop" className="text-blood-400">Return to the Bazaar</Link>
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <ProductImageGallery product={product} />
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
