"use client";

import { useRef } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { BookOpen, Flame, Heart, Megaphone, Calendar, Clock, User, Tag, Share2, ChevronLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { type JournalArticle } from "@/lib/content";
import { ReadingProgress } from "@/components/journal/ReadingProgress";
import { TableOfContents, useTableOfContents } from "@/components/journal/TableOfContents";
import { NewsletterCapture } from "@/components/journal/NewsletterCapture";
import { CodeHighlight } from "@/components/journal/CodeHighlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { getAllJournalArticles } from "@/lib/content";
import { ArticleCard } from "@/components/journal";

const typeConfig = {
  essay: { icon: BookOpen, label: "Essay", color: "text-blood-400" },
  ritual: { icon: Flame, label: "Ritual", color: "text-wine-400" },
  confession: { icon: Heart, label: "Confession", color: "text-pallor-300" },
  summoning: { icon: Megaphone, label: "Summoning", color: "text-wine-300" },
} as const;

type JournalType = keyof typeof typeConfig;

// Components for MDX rendering
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="font-display text-step-4 md:text-step-5 text-pallor-50 mb-6 mt-10 first:mt-0" />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="font-display-alt text-step-3 md:text-step-4 text-pallor-100 mb-4 mt-10" />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="font-display-alt text-step-2 text-pallor-200 mb-3 mt-8" />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 {...props} className="font-display-alt text-step-1 text-pallor-200 mb-2 mt-6" />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="font-body text-step-0 text-pallor-200 leading-relaxed mb-6" />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="link text-blood-400 hover:text-wine-400 underline-offset-2" target="_blank" rel="noopener noreferrer" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="list-disc list-inside space-y-2 font-body text-step-0 text-pallor-200 mb-6 ml-4" />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="list-decimal list-inside space-y-2 font-body text-step-0 text-pallor-200 mb-6 ml-4" />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li {...props} className="leading-relaxed" />
  ),
  blockquote: (props: React.QuoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} className="border-l-4 border-blood-400 pl-6 my-6 italic font-body text-step-0 text-pallor-300 relative">
      <span className="absolute left-[-1.5rem] top-0 font-display text-step-1 text-blood-400/50">\"</span>
      {props.children}
    </blockquote>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} className="font-mono text-step-0 bg-void-800 px-1.5 py-0.5 rounded text-blood-400" />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const codeElement = props.children as React.ReactElement;
    const language = codeElement?.props?.className?.replace("language-", "") || "typescript";
    const code = codeElement?.props?.children as string;
    
    return (
      <div className="my-6">
        <CodeHighlight
          language={language}
          code={code}
          showLineNumbers={true}
        />
      </div>
    );
  },
  hr: () => (
    <hr className="my-12 border-border-subtle" />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table {...props} className="w-full border-collapse font-body text-step-0" />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead {...props} className="border-b border-border-subtle" />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th {...props} className="text-left p-3 font-ui text-step-0 text-pallor-100 border-b border-border-subtle" />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td {...props} className="p-3 text-pallor-200 border-b border-border-subtle/50" />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong {...props} className="font-semibold text-pallor-100" />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em {...props} className="italic text-pallor-200" />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-8 rounded-xl overflow-hidden border border-border-subtle">
      <img {...props} className="w-full h-auto" loading="lazy" />
    </div>
  ),
};

interface ArticleContentProps {
  article: JournalArticle;
}

export function ArticleContent({ article }: ArticleContentProps) {
  const TypeIcon = typeConfig[article.type].icon;
  const typeLabel = typeConfig[article.type].label;
  const typeColor = typeConfig[article.type].color;
  const contentRef = useRef<HTMLDivElement>(null);
  const headings = useTableOfContents(contentRef);

  // Find previous/next articles
  const allArticles = getAllJournalArticles();
  const currentIndex = allArticles.findIndex(a => a.slug === article.slug);
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  return (
    <article className="min-h-screen">
      <ReadingProgress />
      
      {/* Header */}
      <header className="relative pt-16 pb-12 md:pt-24 md:pb-16 border-b border-border-subtle">
        <div className="container">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-pallor-400 hover:text-wine-400 transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-ui text-step-0">Return to Scriptorium</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <TypeIcon className={`w-5 h-5 ${typeColor}`} aria-hidden="true" />
            <span className="font-ui text-step-0 uppercase tracking-wider text-blood-400">{typeLabel}</span>
            {article.featured && (
              <span className="flex items-center gap-1 text-wine-300">
                <Flame className="w-3.5 h-3.5" />
                <span className="font-ui text-step--2">Featured</span>
              </span>
            )}
          </div>
          
          <h1 className="font-display text-step-5 md:text-step-6 lg:text-step-7 text-pallor-50 mb-6 leading-tight">
            {article.title}
          </h1>
          
          <p className="font-body text-step-1 text-pallor-300 leading-relaxed max-w-3xl mb-8">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-step-0 text-pallor-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="font-body italic">{article.author}</span>
              {article.authorRole && (
                <>
                  <span className="text-pallor-500">,</span>
                  <span className="font-ui text-step-0">{article.authorRole}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.publishedAt}>
                {format(new Date(article.publishedAt), "MMMM d, yyyy")}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4" />
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/journal?tag=${encodeURIComponent(tag)}`}
                      className="px-2 py-0.5 rounded text-step--1 font-ui text-pallor-400 border border-border-subtle hover:border-wine-400 hover:text-pallor-200 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {article.coverImage && (
          <div className="absolute inset-0 -z-10 opacity-20">
            <img
              src={article.coverImage}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-900/50 to-transparent" />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="container section">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Article Body */}
          <div className="lg:col-span-3">
            <div ref={contentRef} className="prose prose-invert max-w-none">
              <MDXRemote
                source={article.body}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    ],
                  },
                }}
              />
            </div>
            
            {/* Share / Navigation */}
            <div className="mt-16 pt-8 border-t border-border-subtle">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-pallor-400" />
                  <span className="font-ui text-step-0 text-pallor-400">Share this rite:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : `https://projectsixxx.com${article.url}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-pallor-400 hover:text-wine-400 hover:bg-void-800 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : `https://projectsixxx.com${article.url}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-pallor-400 hover:text-wine-400 hover:bg-void-800 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  {prevArticle && (
                    <Link
                      href={prevArticle.url}
                      className="btn-ghost text-step-0 flex items-center gap-2 px-4 py-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:block">Previous</span>
                    </Link>
                  )}
                  {nextArticle && (
                    <Link
                      href={nextArticle.url}
                      className="btn-sigil text-step-0 flex items-center gap-2 px-4 py-2"
                    >
                      <span className="hidden sm:block">Next</span>
                      <ChevronLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            {/* Newsletter Capture */}
            <NewsletterCapture triggerAt={40} articleTitle={article.title} />
          </div>
          
          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} className="max-h-[calc(100vh-8rem)] overflow-y-auto" />
          </aside>
        </div>
      </div>
      
      {/* Related Articles */}
      <section className="section border-t border-border-subtle">
        <div className="container">
          <h2 className="heading-2 mb-8 text-center">Related Rites</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allArticles
              .filter(a => a.slug !== article.slug && a.type === article.type)
              .slice(0, 3)
              .map((relatedArticle) => (
                <ArticleCard key={relatedArticle.slug} article={relatedArticle} variant="compact" />
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}