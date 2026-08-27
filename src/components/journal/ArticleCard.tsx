"use client";

import Link from "next/link";
import { format } from "date-fns";
import { BookOpen, Flame, Heart, Megaphone } from "lucide-react";
import { type JournalArticle } from "@/lib/contentlayer";

const typeIcons = {
  essay: BookOpen,
  ritual: Flame,
  confession: Heart,
  summoning: Megaphone,
};

const typeLabels = {
  essay: "Essay",
  ritual: "Ritual",
  confession: "Confession",
  summoning: "Summoning",
};

interface ArticleCardProps {
  article: JournalArticle;
  variant?: "default" | "featured" | "compact";
}

export function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const TypeIcon = typeIcons[article.type];
  const typeLabel = typeLabels[article.type];

  if (variant === "compact") {
    return (
      <Link
        href={article.url}
        className="group flex gap-4 p-4 transition-all duration-300 ease-caress rounded-xl border border-border-subtle hover:border-wine-400/50 hover:bg-void-800/50"
      >
        {article.coverImage && (
          <div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
            <img
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-ui text-step--1 text-blood-400 uppercase tracking-wider">
                {typeLabel}
              </span>
              <time className="font-ui text-step--1 text-pallor-400">
                {format(new Date(article.publishedAt), "MMM d, yyyy")}
              </time>
            </div>
            <h3 className="font-display-alt text-step-1 text-pallor-100 group-hover:text-wine-400 transition-colors line-clamp-2">
              {article.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-step--1 text-pallor-400">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {article.readTime} min
            </span>
            {article.author && (
              <span className="font-body italic text-pallor-300">
                — {article.author}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <article className="relative group">
        <Link href={article.url} className="block">
          {article.coverImage && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
              <img
                src={article.coverImage}
                alt={article.coverAlt || article.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-ritual group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950/80 via-void-900/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-pallor-100">
                <TypeIcon className="w-5 h-5 text-blood-400" />
                <span className="font-ui text-step--1 uppercase tracking-wider">{typeLabel}</span>
                {article.featured && (
                  <span className="flex items-center gap-1 text-wine-300">
                    <Flame className="w-3.5 h-3.5" />
                    <span className="font-ui text-step--2">Featured</span>
                  </span>
                )}
              </div>
            </div>
          )}
        </Link>
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-ui text-step--1 text-blood-400 uppercase tracking-wider">
              {typeLabel}
            </span>
            <time className="font-ui text-step--1 text-pallor-400">
              {format(new Date(article.publishedAt), "MMMM d, yyyy")}
            </time>
            {article.featured && (
              <span className="flex items-center gap-1 text-wine-300">
                <Flame className="w-3.5 h-3.5" />
                <span className="font-ui text-step--2">Featured</span>
              </span>
            )}
          </div>
          <Link href={article.url}>
            <h2 className="font-display text-step-4 md:text-step-5 text-pallor-50 mb-3 group-hover:text-wine-400 transition-colors duration-300 line-clamp-2">
              {article.title}
            </h2>
          </Link>
          <p className="font-body text-step-0 text-pallor-300 leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-step--1 text-pallor-400">
            <Link
              href={article.url}
              className="flex items-center gap-1 hover:text-wine-400 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{article.readTime} min read</span>
            </Link>
            {article.author && (
              <span className="font-body italic text-pallor-300">
                — {article.author}
              </span>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-step--2 font-ui text-pallor-400 border border-border-subtle hover:border-wine-400 hover:text-pallor-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
                {article.tags.length > 3 && (
                  <span className="text-pallor-400">+{article.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative">
      <Link href={article.url} className="block">
        {article.coverImage && (
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
            <img
              src={article.coverImage}
              alt={article.coverAlt || article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 left-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <TypeIcon className="w-4 h-4 text-blood-400" />
              <span className="font-ui text-step--2 uppercase tracking-wider bg-void-950/80 px-2 py-1 rounded backdrop-blur">
                {typeLabel}
              </span>
            </div>
          </div>
        )}
      </Link>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="font-ui text-step--1 text-blood-400 uppercase tracking-wider">
          {typeLabel}
        </span>
        <time className="font-ui text-step--1 text-pallor-400">
          {format(new Date(article.publishedAt), "MMMM d, yyyy")}
        </time>
        {article.featured && (
          <span className="flex items-center gap-1 text-wine-300">
            <Flame className="w-3.5 h-3.5" />
            <span className="font-ui text-step--2">Featured</span>
          </span>
        )}
      </div>
      <Link href={article.url}>
        <h3 className="font-display-alt text-step-2 md:text-step-3 text-pallor-100 mb-2 group-hover:text-wine-400 transition-colors duration-300 line-clamp-2">
          {article.title}
        </h3>
      </Link>
      <p className="font-body text-step-0 text-pallor-300 leading-relaxed mb-4 line-clamp-3">
        {article.excerpt}
      </p>
      <div className="flex flex-wrap items-center gap-4 text-step--1 text-pallor-400 border-t border-border-subtle pt-4">
        <Link
          href={article.url}
          className="flex items-center gap-1 hover:text-wine-400 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{article.readTime} min read</span>
        </Link>
        {article.author && (
          <span className="font-body italic text-pallor-300">
            — {article.author}
          </span>
        )}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {article.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-step--2 font-ui text-pallor-400 border border-border-subtle hover:border-wine-400 hover:text-pallor-200 transition-colors"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 2 && (
              <span className="text-pallor-400">+{article.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}