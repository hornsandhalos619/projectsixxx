import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MOCK_ARTWORKS } from '@/data/artworks';
import { Lightbox } from '@/components/gallery/Lightbox';
import { Heart, Share2, Maximize, Crown } from 'lucide-react';

interface WorkPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lightbox?: string }>;
}

function findArtwork(slug: string) {
  return MOCK_ARTWORKS.find(a => a.slug === slug);
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = findArtwork(slug);
  
  if (!artwork) {
    return { title: 'Work Not Found' };
  }

  return {
    title: artwork.title,
    description: artwork.description?.slice(0, 160) || `${artwork.title} by ${artwork.artist.name} — ${artwork.medium}, ${artwork.year}`,
    openGraph: {
      title: `${artwork.title} — ${artwork.artist.name}`,
      description: artwork.description?.slice(0, 160) || `${artwork.medium}, ${artwork.year}`,
      type: 'website',
      images: [{ url: artwork.image, width: artwork.width, height: artwork.height }],
    },
    twitter: {
      card: 'summary_large_image',
      title: artwork.title,
      description: `${artwork.artist.name} — ${artwork.medium}, ${artwork.year}`,
      images: [artwork.image],
    },
  };
}

export async function generateStaticParams() {
  return MOCK_ARTWORKS.map(artwork => ({ slug: artwork.slug }));
}

export default async function WorkPage({ params, searchParams }: WorkPageProps) {
  const { slug } = await params;
  const { lightbox } = await searchParams;
  const artwork = findArtwork(slug);

  if (!artwork) {
    notFound();
  }

  // If lightbox param is present, show the lightbox
  if (lightbox === 'true') {
    const index = MOCK_ARTWORKS.findIndex(a => a.slug === slug);
    return (
      <Lightbox
        artworks={MOCK_ARTWORKS}
        initialIndex={index >= 0 ? index : 0}
        onClose={() => window.history.back()}
      />
    );
  }

  // Otherwise show the work page with structured data and link to lightbox
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VisualArtwork',
            name: artwork.title,
            artist: {
              '@type': 'Person',
              name: artwork.artist.name,
              url: `/gallery/artist/${artwork.artist.slug}`,
            },
            artform: artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1),
            artMedium: artwork.medium,
            dateCreated: artwork.year.toString(),
            width: `${artwork.width}px`,
            height: `${artwork.height}px`,
            image: artwork.image,
            url: `/gallery/work/${artwork.slug}`,
            description: artwork.description,
            ...(artwork.edition && {
              limitedEdition: artwork.edition.total,
              editionNumber: artwork.edition.number,
              isSigned: artwork.edition.isSigned,
            }),
            ...(artwork.isForSale && artwork.price && {
              offers: {
                '@type': 'Offer',
                price: artwork.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'Projectsixxx Gallery',
                },
              },
            }),
          }),
        }}
      />
      <div className="min-h-screen texture-velvet py-20">
        <div className="container-nocturne max-w-4xl">
          <article className="space-y-12">
            {/* Back link */}
            <a
              href="/gallery"
              className="inline-flex items-center gap-2 text-ui text-text-muted hover:text-wine-300 transition-colors mb-4"
            >
              ← Return to Sanctum
            </a>

            {/* Main Image with Shader */}
            <div className="relative rounded-velvet overflow-hidden card-velvet">
              <div style={{ aspectRatio: `${artwork.width}/${artwork.height}` }}>
                {/* This would use the ShaderCanvas component in a real implementation */}
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Metadata */}
            <header className="space-y-4">
              <span className="text-ui text-xs uppercase tracking-widest text-blood-400">
                {artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1)}
              </span>
              <h1 className="text-display text-4xl md:text-5xl lg:text-6xl gradient-velvet">
                {artwork.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-text-secondary">
                <a
                  href={`/gallery/artist/${artwork.artist.slug}`}
                  className="link-ritual text-body font-medium"
                >
                  Summoned by {artwork.artist.name}
                </a>
                <span className="text-ui">{artwork.year}</span>
                <span className="text-ui">{artwork.medium}</span>
                <span className="text-ui">{artwork.dimensions}</span>
              </div>
            </header>

            {/* Description */}
            {artwork.description && (
              <section className="prose prose-invert max-w-none text-body text-text-secondary">
                <p className="whitespace-pre-wrap">{artwork.description}</p>
              </section>
            )}

            {/* Details Grid */}
            <section className="grid md:grid-cols-2 gap-6 card-velvet p-6">
              <div>
                <h3 className="text-ui text-text-muted text-xs uppercase tracking-wider mb-2">Medium</h3>
                <p className="text-body text-text-primary">{artwork.medium}</p>
              </div>
              <div>
                <h3 className="text-ui text-text-muted text-xs uppercase tracking-wider mb-2">Year</h3>
                <p className="text-body text-text-primary">{artwork.year}</p>
              </div>
              <div>
                <h3 className="text-ui text-text-muted text-xs uppercase tracking-wider mb-2">Dimensions</h3>
                <p className="text-body text-text-primary">{artwork.dimensions}</p>
              </div>
              <div>
                <h3 className="text-ui text-text-muted text-xs uppercase tracking-wider mb-2">Resolution</h3>
                <p className="text-body text-text-primary">{artwork.width} × {artwork.height} px</p>
              </div>
              {artwork.edition && (
                <div className="md:col-span-2 p-4 bg-blood-500/10 border border-blood-400/20 rounded-velvet">
                  <h3 className="text-ui text-text-muted text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-blood-400" />
                    Edition
                  </h3>
                  <p className="text-body text-text-primary">
                    {artwork.edition.number} of {artwork.edition.total}
                    {artwork.edition.isSigned && ' • Signed by the artist'}
                  </p>
                </div>
              )}
            </section>

            {/* Actions */}
            <section className="flex flex-wrap gap-4">
              <a
                href={`/gallery/print/${artwork.slug}`}
                className="btn-ritual flex-1 min-w-[200px] text-center"
              >
                Acquire Print
              </a>
              <button className="btn-covenant flex-1 min-w-[200px]">
                <Heart className="w-4 h-4 mr-2" />
                Collect
              </button>
              <button className="btn-whisper flex-1 min-w-[200px]">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <a
                href={`/gallery/work/${artwork.slug}?lightbox=true`}
                className="btn-whisper flex-1 min-w-[200px] text-center"
              >
                <Maximize className="w-4 h-4 mr-2" />
                View in Sanctum
              </a>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}