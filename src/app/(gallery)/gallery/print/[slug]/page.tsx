import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_ARTWORKS } from '@/data/artworks';
import { PrintSales } from '@/components/gallery/print/PrintSales';
import { PrintProduct } from '@/lib/print-api';

interface PrintPageProps {
  params: Promise<{ slug: string }>;
}

function findArtwork(slug: string) {
  return MOCK_ARTWORKS.find(a => a.slug === slug);
}

function createPrintProduct(artwork: ReturnType<typeof findArtwork>): PrintProduct | null {
  if (!artwork || !artwork.isForSale) return null;
  
  return {
    id: `print-${artwork.id}`,
    artworkId: artwork.id,
    title: artwork.title,
    imageUrl: artwork.image,
    imageWidth: artwork.width,
    imageHeight: artwork.height,
    basePrice: artwork.price || 200,
    paperOptions: ['matte', 'gloss', 'metallic', 'fine-art', 'canvas'],
    frameOptions: ['none', 'black', 'gold', 'ornate', 'float'],
    sizeOptions: ['8x10', '11x14', '16x20', '18x24', '24x36', 'custom'],
    edition: artwork.edition ? {
      total: artwork.edition.total,
      number: artwork.edition.number,
      isSigned: artwork.edition.isSigned,
      isNumbered: true,
      certificateOfAuthenticity: true,
    } : undefined,
  };
}

export async function generateMetadata({ params }: PrintPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = findArtwork(slug);
  
  if (!artwork) {
    return { title: 'Print Not Found' };
  }

  return {
    title: `${artwork.title} — Print`,
    description: `Acquire a museum-quality print of "${artwork.title}" by ${artwork.artist.name}. Multiple papers, frames, and sizes available.`,
    openGraph: {
      title: `${artwork.title} — Print Edition`,
      description: `Museum-quality print of "${artwork.title}" by ${artwork.artist.name}.`,
      type: 'product',
      images: [{ url: artwork.image, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${artwork.title} — Print`,
      description: `Acquire a museum-quality print by ${artwork.artist.name}.`,
      images: [artwork.image],
    },
  };
}

export async function generateStaticParams() {
  return MOCK_ARTWORKS
    .filter(a => a.isForSale)
    .map(artwork => ({ slug: artwork.slug }));
}

export default async function PrintPage({ params }: PrintPageProps) {
  const { slug } = await params;
  const artwork = findArtwork(slug);
  const product = createPrintProduct(artwork);

  if (!artwork || !product) {
    notFound();
  }

  return <PrintSales product={product} />;
}