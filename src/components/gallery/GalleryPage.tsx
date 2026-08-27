'use client';

import { useState, useEffect, useCallback } from 'react';
import { MasonryGrid, MasonryGridSkeleton } from './MasonryGrid';
import { CategoryFilter, SortSelect } from './CategoryFilter';
import { ShaderCanvas } from './ShaderCanvas';
import { cn } from '@/lib/utils';
import { Search, Filter, Grid, List, Loader2 } from 'lucide-react';
import { MOCK_ARTWORKS, Artwork } from '@/data/artworks';
import dynamic from 'next/dynamic';

const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

type GalleryCategory = 'all' | 'digital' | 'photography' | 'generative' | 'commissions';

interface GalleryPageProps {
  category: GalleryCategory;
}

export function GalleryPage({ category }: GalleryPageProps) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'digital' | 'photography' | 'generative' | 'commissions'>(category);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular' | 'title'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);

  // Calculate category counts
  useEffect(() => {
    const counts = {
      all: MOCK_ARTWORKS.length,
      digital: MOCK_ARTWORKS.filter(a => a.category === 'digital').length,
      photography: MOCK_ARTWORKS.filter(a => a.category === 'photography').length,
      generative: MOCK_ARTWORKS.filter(a => a.category === 'generative').length,
      commissions: MOCK_ARTWORKS.filter(a => a.category === 'commissions').length,
    };
    setCategoryCounts(counts);
  }, []);

  // Filter and sort artworks
  const getFilteredArtworks = useCallback(() => {
    let result = [...MOCK_ARTWORKS];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter(a => a.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        a => a.title.toLowerCase().includes(query) ||
             a.artist.name.toLowerCase().includes(query) ||
             a.medium.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'oldest':
        result.sort((a, b) => a.year - b.year);
        break;
      case 'popular':
        result.sort((a, b) => (b.edition?.total || 0) - (a.edition?.total || 0));
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Load initial artworks
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      const filtered = getFilteredArtworks();
      setArtworks(filtered);
      setDisplayedArtworks(filtered.slice(0, ITEMS_PER_PAGE));
      setPage(1);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [getFilteredArtworks]);

  // Load more
  const loadMore = useCallback(() => {
    if (isLoadingMore) return;
    
    setIsLoadingMore(true);
    const filtered = getFilteredArtworks();
    const nextPage = page + 1;
    const nextItems = filtered.slice(page * ITEMS_PER_PAGE, nextPage * ITEMS_PER_PAGE);
    
    if (nextItems.length > 0) {
      setTimeout(() => {
        setDisplayedArtworks(prev => [...prev, ...nextItems]);
        setPage(nextPage);
        setIsLoadingMore(false);
      }, 400);
    } else {
      setIsLoadingMore(false);
    }
  }, [page, isLoadingMore, getFilteredArtworks]);

  const hasMore = displayedArtworks.length < getFilteredArtworks().length;

  const handleOpenLightbox = useCallback((index: number) => {
    const filtered = getFilteredArtworks();
    const artwork = displayedArtworks[index];
    const globalIndex = filtered.findIndex(a => a.id === artwork.id);
    setLightboxIndex(globalIndex);
  }, [displayedArtworks, getFilteredArtworks]);

  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Category label
  const categoryLabels: Record<string, string> = {
    all: 'All Works',
    digital: 'Digital Art',
    photography: 'Dark Photography',
    generative: 'Generative',
    commissions: 'Commissions',
  };

  if (isLoading) {
    return (
      <div className="container-nocturne py-20">
        <header className="mb-12 md:mb-16">
          <h1 className="text-display text-5xl md:text-6xl lg:text-7xl gradient-velvet mb-4">
            The Sanctum
          </h1>
          <p className="text-body text-text-secondary text-lg max-w-2xl">
            Where darkness takes form. Each work a summoning, each artist a conjurer.
          </p>
        </header>
        <MasonryGridSkeleton columns={4} count={12} />
      </div>
    );
  }

  const filtered = getFilteredArtworks();

  return (
    <div className="container-nocturne py-12 md:py-16 lg:py-20">
      {/* Header */}
      <header className="mb-10 md:mb-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
          <div>
            <span className="text-ui text-xs uppercase tracking-widest text-blood-400 mb-2 block">
              {categoryLabels[activeCategory]}
            </span>
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl gradient-velvet">
              The Sanctum
            </h1>
            <p className="text-body text-text-secondary mt-2 max-w-2xl">
              {filtered.length} {filtered.length === 1 ? 'work' : 'works'} in the collection.
              {searchQuery && ` Search: "${searchQuery}"`}
            </p>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search the sanctum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full pl-10 pr-4 py-2.5 rounded-velvet',
                  'bg-void-800/50 border border-border-subtle',
                  'text-text-primary placeholder:text-text-muted',
                  'focus:outline-none focus:border-blood-400 focus:ring-1 focus:ring-blood-400',
                  'text-ui transition-all duration-[var(--dur-flutter)]'
                )}
                aria-label="Search artworks"
              />
            </div>
            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          counts={categoryCounts as Record<'all' | 'digital' | 'photography' | 'generative' | 'commissions', number>}
        />
      </header>

      {/* Gallery Grid */}
      <section aria-label="Artwork gallery">
        <MasonryGrid
          artworks={displayedArtworks}
          onLoadMore={loadMore}
          hasMore={hasMore}
          isLoading={isLoadingMore}
        />
      </section>

      {/* CTA for commissions */}
      {activeCategory === 'all' || activeCategory === 'commissions' ? (
        <section className="mt-20 md:mt-24 text-center">
          <div className="card-obsidian max-w-3xl mx-auto p-8 md:p-12">
            <h2 className="text-display text-3xl md:text-4xl gradient-wine mb-4">
              Summon Your Vision
            </h2>
            <p className="text-body text-text-secondary mb-8 max-w-lg mx-auto">
              Commission a bespoke work from our coven of artists. From concept to covenant — your darkness, given form.
            </p>
            <a
              href="/gallery/commissions"
              className="btn-ritual inline-flex items-center gap-2"
            >
              Enter the Commission Portal
              <span className="text-lg">→</span>
            </a>
          </div>
        </section>
      ) : null}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          artworks={filtered}
          initialIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onShare={(artwork) => {
            if (navigator.share) {
              navigator.share({
                title: artwork.title,
                text: `Summoned by ${artwork.artist.name}: ${artwork.title}`,
                url: window.location.origin + `/gallery/work/${artwork.slug}`,
              });
            } else {
              navigator.clipboard.writeText(window.location.origin + `/gallery/work/${artwork.slug}`);
            }
          }}
          onCollect={(artwork) => {
            // Add to collection - would integrate with user account
            console.log('Collect:', artwork.id);
          }}
          onBuyPrint={(artwork) => {
            // Navigate to print purchase flow
            window.location.href = `/gallery/print/${artwork.slug}`;
          }}
        />
      )}

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: filtered.slice(0, 20).map((artwork, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'VisualArtwork',
                name: artwork.title,
                artist: {
                  '@type': 'Person',
                  name: artwork.artist.name,
                  url: `${window.location.origin}/gallery/artist/${artwork.artist.slug}`,
                },
                artform: 'Digital Art',
                artMedium: artwork.medium,
                dateCreated: artwork.year.toString(),
                width: `${artwork.width}px`,
                height: `${artwork.height}px`,
                image: artwork.image,
                url: `${window.location.origin}/gallery/work/${artwork.slug}`,
                description: artwork.description,
                offers: artwork.isForSale && artwork.price ? {
                  '@type': 'Offer',
                  price: artwork.price,
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                } : undefined,
              },
            })),
          }),
        }}
      />
    </div>
  );
}