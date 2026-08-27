'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

type Category = 'all' | 'digital' | 'photography' | 'generative' | 'commissions';

interface CategoryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  counts?: Record<Category, number>;
  className?: string;
}

const CATEGORIES: { value: Category; label: string; icon?: React.ReactNode }[] = [
  { value: 'all', label: 'All Works' },
  { value: 'digital', label: 'Digital Art' },
  { value: 'photography', label: 'Dark Photography' },
  { value: 'generative', label: 'Generative' },
  { value: 'commissions', label: 'Commissions' },
];

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
  counts,
  className,
}: CategoryFilterProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 md:gap-3',
        'overflow-x-auto pb-4 scrollbar-hide',
        className
      )}
      role="tablist"
      aria-label="Artwork categories"
    >
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          role="tab"
          aria-selected={activeCategory === value}
          aria-controls={`gallery-panel-${value}`}
          id={`gallery-tab-${value}`}
          onClick={() => onCategoryChange(value)}
          className={cn(
            'btn-whisper whitespace-nowrap px-4 py-2',
            'transition-all duration-[var(--dur-flutter)] ease-[var(--ease-flutter)]',
            activeCategory === value
              ? 'bg-blood-500/20 border-blood-400/50 text-blood-300 shadow-blood-glow/20'
              : 'border-transparent hover:border-wine-300/30 hover:text-wine-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void-900'
          )}
        >
          {label}
          {counts && counts[value] !== undefined && (
            <span
              className={cn(
                'ml-2 px-1.5 py-0.5 text-xs font-mono rounded-obsidian',
                activeCategory === value
                  ? 'bg-blood-500/30 text-blood-300'
                  : 'bg-void-800 text-text-muted'
              )}
              aria-label={`${counts[value]} works`}
            >
              {counts[value]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

// Sort options
type SortOption = 'newest' | 'oldest' | 'popular' | 'title';

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
  className?: string;
}

export function SortSelect({ value, onChange, className }: SortSelectProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Newest Summoned' },
    { value: 'oldest', label: 'Oldest Relics' },
    { value: 'popular', label: 'Most Coveted' },
    { value: 'title', label: 'Title (A–Z)' },
  ];

  return (
    <label className={cn('relative', className)}>
      <span className="sr-only">Sort artworks</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className={cn(
          'btn-whisper appearance-none pr-10 py-2 px-4',
          'bg-void-800/50 border border-transparent',
          'hover:border-wine-300/30 hover:text-wine-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-400 focus-visible:ring-offset-2 focus-visible:ring-offset-void-900',
          'text-ui text-sm'
        )}
        aria-label="Sort artworks"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </label>
  );
}