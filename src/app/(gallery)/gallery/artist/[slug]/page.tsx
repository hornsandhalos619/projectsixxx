import { notFound } from "next/navigation";
import { getArtist } from "@/data/artists";

export const dynamic = "force-dynamic";

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = getArtist(slug);
  if (!artist) notFound();
  return (
    <div className="min-h-screen p-8 text-pallor-100">
      <h1 className="font-display text-step-5">{artist.name}</h1>
      <p className="mt-4 max-w-2xl font-body text-pallor-300">{artist.bio}</p>
    </div>
  );
}
