'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Artwork {
  id: string;
  slug: string;
  title: string;
  artist: {
    name: string;
    slug: string;
  };
  category: 'digital' | 'photography' | 'generative' | 'commissions';
  thumbnail: string;
  width: number;
  height: number;
  year: number;
  medium: string;
}

interface MasonryGridProps {
  artworks: Artwork[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  className?: string;
}

export function MasonryGrid({
  artworks,
  onLoadMore,
  hasMore,
  isLoading,
  className,
}: MasonryGridProps) {
  const [columns, setColumns] = useState(4);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate optimal columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      if (gridRef.current) {
        const width = gridRef.current.offsetWidth;
        const minColumnWidth = 280; // minimum column width in px
        const newColumns = Math.max(1, Math.floor(width / minColumnWidth));
        setColumns(Math.min(newColumns, 6));
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoading, onLoadMore]);

  // Calculate column heights for masonry layout
  const columnHeights = useRef<number[]>(new Array(6).fill(0));
  const artworkColumns = useRef<Map<string, number>>(new Map());

  const getColumnForArtwork = useCallback((artwork: Artwork, index: number) => {
    // Check if we already assigned a column
    if (artworkColumns.current.has(artwork.id)) {
      return artworkColumns.current.get(artwork.id)!;
    }

    // Find shortest column
    let minHeight = Infinity;
    let targetColumn = 0;
    for (let i = 0; i < columns; i++) {
      if (columnHeights.current[i] < minHeight) {
        minHeight = columnHeights.current[i];
        targetColumn = i;
      }
    }

    // Estimate height based on aspect ratio
    const aspectRatio = artwork.width / artwork.height;
    const columnWidth = 100 / columns; // percentage
    const estimatedHeight = (columnWidth / aspectRatio) * 100; // rough estimate

    columnHeights.current[targetColumn] += estimatedHeight;
    artworkColumns.current.set(artwork.id, targetColumn);

    return targetColumn;
  }, [columns]);

  // Reset column heights when columns change
  useEffect(() => {
    columnHeights.current = new Array(6).fill(0);
    artworkColumns.current.clear();
  }, [columns]);

  const getColumnStyles = (columnIndex: number) => ({
    gridColumn: columnIndex + 1,
  });

  if (artworks.length === 0) {
    return (
      <div className={cn('text-center py-20', className)}>
        <div className="velvet-shimmer h-64 w-full max-w-md mx-auto rounded-velvet" />
        <p className="text-text-muted mt-6 text-ui">The sanctum awaits its first offering...</p>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)} ref={gridRef}>
      <div
        className="grid gap-4 md:gap-6"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
        role="list"
        aria-label="Artwork gallery"
      >
        {artworks.map((artwork, index) => {
          const column = getColumnForArtwork(artwork, index);
          const aspectRatio = artwork.width / artwork.height;

          return (
            <article
              key={artwork.id}
              className={cn(
                'card-velvet group relative overflow-hidden rounded-velvet',
                'transition-all duration-[var(--dur-sigh)] ease-[var(--ease-sigh)]',
                'cursor-pointer',
                'hover:shadow-velvet hover:border-wine-300/30',
                'hover:scale-[1.01]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void-900'
              )}
              style={getColumnStyles(column)}
              role="listitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = `/gallery/work/${artwork.slug}`;
                }
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: `${aspectRatio}` }}
              >
                {/* Velvet shimmer placeholder */}
                <div className="absolute inset-0 velvet-shimmer" aria-hidden="true" />

                <Image
                  src={artwork.thumbnail}
                  alt={artwork.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[var(--ease-sigh)] group-hover:scale-105"
                  sizes={`(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw`}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  loading="lazy"
                />

                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 px-2 py-1 text-xs font-ui uppercase tracking-wider
                    bg-void-900/80 backdrop-blur-sm border border-wine-300/20
                    text-wine-300 rounded-obsidian"
                >
                  {artwork.category.charAt(0).toUpperCase() + artwork.category.slice(1)}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void-950/90 via-void-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--dur-sigh)] ease-[var(--ease-sigh)] flex items-end p-4">
                  <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-[var(--dur-sigh)] ease-[var(--ease-sigh)]">
                    <h3 className="text-display font-medium text-text-primary line-clamp-1 mb-1">
                      {artwork.title}
                    </h3>
                    <p className="text-ui text-text-secondary text-sm">
                      Summoned by {artwork.artist.name}
                    </p>
                    <p className="text-ui text-text-muted text-xs mt-1">
                      {artwork.medium} • {artwork.year}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Load more trigger */}
      <div
        ref={loadMoreRef}
        className="h-20 flex items-center justify-center"
        aria-live="polite"
        aria-label="Loading more artworks"
      >
        {isLoading && (
          <div className="flex items-center gap-3 text-text-muted">
            <div className="w-6 h-6 border-2 border-blood-400/50 border-t-blood-400 rounded-full animate-spin" />
            <span className="text-ui">Summoning more works...</span>
          </div>
        )}
        {!hasMore && artworks.length > 0 && (
          <p className="text-ui text-text-muted">The sanctum is complete.</p>
        )}
      </div>
    </div>
  );
}

// Skeleton loader for initial load
export function MasonryGridSkeleton({ columns = 4, count = 12 }: { columns?: number; count?: number }) {
  return (
    <div
      className="grid gap-4 md:gap-6"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      aria-label="Loading gallery"
      role="list"
    >
      {Array.from({ length: count }).map((_, i) => (
        <article
          key={i}
          className="card-velvet overflow-hidden rounded-velvet animate-pulse"
          style={{ aspectRatio: 0.75 + (i % 3) * 0.15 }}
        >
          <div className="velvet-shimmer absolute inset-0" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}