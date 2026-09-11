import { notFound } from "next/navigation";
import { MOCK_ARTWORKS } from "@/data/artworks";

export const dynamic = "force-dynamic";

export default async function PrintPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artwork = MOCK_ARTWORKS.find((a) => a.slug === slug && a.isForSale);
  if (!artwork) notFound();
  return (
    <div className="min-h-screen p-8 text-pallor-100">
      <h1 className="font-display text-step-5">{artwork.title} — Print</h1>
      <p className="mt-4 font-body text-pallor-300">Museum-quality print of {artwork.title}.</p>
    </div>
  );
}
