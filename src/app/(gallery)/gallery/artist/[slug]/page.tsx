import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArtist, getAllArtists } from '@/data/artists';
import { ArtistProfile } from '@/components/gallery/ArtistProfile';

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtist(slug);
  
  if (!artist) {
    return { title: 'Artist Not Found' };
  }

  return {
    title: artist.name,
    description: artist.bio.slice(0, 160),
    openGraph: {
      title: `${artist.name} — Summoned Artist`,
      description: artist.bio.slice(0, 160),
      type: 'profile',
      images: [{ url: artist.avatar, width: 400, height: 400 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: artist.name,
      description: artist.bio.slice(0, 160),
      images: [artist.avatar],
    },
  };
}

export async function generateStaticParams() {
  const artists = getAllArtists();
  return artists.map((artist) => ({ slug: artist.slug }));
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtist(slug);

  if (!artist) {
    notFound();
  }

  return <ArtistProfile artist={artist} />;
}