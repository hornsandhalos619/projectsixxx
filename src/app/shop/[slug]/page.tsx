import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getHouseCatalog } from "@/lib/house-catalog";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

function findProduct(slug: string) {
  return getHouseCatalog().find((p) => p.handle === slug) || null;
}

export function generateStaticParams() {
  return getHouseCatalog().map((p) => ({ slug: p.handle }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return { title: "Ritual Not Found" };
  return { title: product.title, description: product.description.slice(0, 160) };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-void-900 p-8 text-pallor-100">
      <Link href="/shop" className="text-blood-400 hover:text-wine-400">
        ← Return to the Bazaar
      </Link>
      <p className="mt-8 font-ui text-xs uppercase tracking-widest text-blood-400">Horns & Halos Exclusive</p>
      <h1 className="mt-3 font-display text-step-5">{product.title}</h1>
      <p className="mt-3 font-display text-step-3 text-pallor-100">${product.priceMin.toFixed(2)}</p>
      <p className="mt-6 max-w-xl font-body leading-relaxed text-pallor-300">{product.description}</p>
      <p className="mt-8 font-ui text-sm text-pallor-400">Ships from the House · 30-day returns · Secure checkout</p>
      <Link href="/cart" className="mt-10 inline-block border border-blood-400 px-6 py-3 font-ui text-blood-400 hover:bg-blood-400/10">
        Add to Cart
      </Link>
    </div>
  );
}
