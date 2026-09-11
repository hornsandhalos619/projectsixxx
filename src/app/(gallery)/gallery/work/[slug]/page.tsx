import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_ARTWORKS } from "@/data/artworks";

export const dynamic = "force-dynamic";

interface WorkPageProps {
  params: Promise<{ slug: string }>;
}

function findArtwork(slug: string) {
  return MOCK_ARTWORKS.find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = findArtwork(slug);
  if (!artwork) return { title: "Work Not Found" };
  return {
    title: artwork.title,
    description: artwork.description?.slice(0, 160) || `${artwork.title} by ${artwork.artist.name}`,
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const artwork = findArtwork(slug);
  if (!artwork) notFound();
  return (
    <div className="min-h-screen p-8 text-pallor-100">
      <a href="/gallery" className="text-sm text-pallor-400 hover:text-blood-400">← Return to Sanctum</a>
      <h1 className="mt-6 font-display text-step-5">{artwork.title}</h1>
      <p className="mt-2 font-body text-pallor-300">{artwork.artist.name} — {artwork.medium}, {artwork.year}</p>
    </div>
  );
}
