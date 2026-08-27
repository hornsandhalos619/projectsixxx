import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Flame, Heart, Megaphone } from "lucide-react";
import { getJournalArticlesByType, getFeaturedJournalArticles, type JournalArticle } from "@/lib/content";
import { ArticleCard } from "@/components/journal";

interface TypeFilterPageProps {
  type: 'essay' | 'ritual' | 'confession' | 'summoning';
}

const typeConfig = {
  essay: { 
    icon: BookOpen, 
    label: "Essays", 
    description: "Deep dives on business, creativity, darkness — 2000+ words each",
    seoTitle: "Essays — The Scriptorium",
    seoDescription: "Long-form essays on systems architecture, dark philosophy, and building resilient organizations.",
  },
  ritual: { 
    icon: Flame, 
    label: "Rituals", 
    description: "How-to guides, frameworks, templates — 500-1500 words each",
    seoTitle: "Rituals — The Scriptorium",
    seoDescription: "Practical ceremonies for deployments, logging, incident response, and system stewardship.",
  },
  confession: { 
    icon: Heart, 
    label: "Confessions", 
    description: "Personal notes, failures, lessons — 300-800 words each",
    seoTitle: "Confessions — The Scriptorium",
    seoDescription: "Honest postmortems and lessons learned from production fires and leadership mistakes.",
  },
  summoning: { 
    icon: Megaphone, 
    label: "Summonings", 
    description: "Launches, partnerships, drops — announcements from the coven",
    seoTitle: "Summonings — The Scriptorium",
    seoDescription: "Official announcements, launches, partnerships, and community updates from Horns & Halos.",
  },
} as const;

export async function generateMetadata({ type }: TypeFilterPageProps): Promise<Metadata> {
  const config = typeConfig[type];
  return {
    title: config.seoTitle,
    description: config.seoDescription,
    openGraph: {
      type: "website",
      title: config.seoTitle,
      description: config.seoDescription,
      images: [`/og-journal-${type}.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seoTitle,
      description: config.seoDescription,
      images: [`/og-journal-${type}.jpg`],
    },
  };
}

export default function TypeFilterPage({ type }: TypeFilterPageProps) {
  const config = typeConfig[type];
  const Icon = config.icon;
  const articles = getJournalArticlesByType(type);
  const featuredArticles = getFeaturedJournalArticles().filter(a => a.type === type);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <div className="min-h-screen texture-velvet">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Link href="/journal" className="inline-flex items-center gap-2 text-pallor-400 hover:text-wine-400 transition-colors mb-6 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="font-ui text-step-0">Return to Scriptorium</span>
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blood-400/10 border border-blood-400/30 text-blood-400 font-ui text-step--1 uppercase tracking-wider mb-6">
              <Icon className="w-4 h-4" />
              <span>The Scriptorium</span>
            </div>
            
            <h1 className="heading-display mb-4">
              {config.label}
            </h1>
            <p className="body-large text-pallor-200 max-w-2xl mx-auto">
              {config.description}
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-4 text-step-0 font-ui text-pallor-400">
              <span className="flex items-center gap-1">
                <Icon className="w-4 h-4" />
                {articles.length} entries
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blood-400" />
                {featuredArticles.length} featured
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-5 w-72 h-72 rounded-full bg-blood-400/5 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-5 w-72 h-72 rounded-full bg-wine-400/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="section border-y border-border-subtle">
          <div className="container">
            <h2 className="heading-2 mb-8 text-center">Featured {config.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="section">
        <div className="container">
          {featuredArticles.length > 0 && (
            <h2 className="heading-2 mb-8 text-center">All {config.label}</h2>
          )}
          
          <div className="space-y-6 max-w-3xl mx-auto">
            {regularArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>

          {regularArticles.length === 0 && featuredArticles.length === 0 && (
            <div className="text-center py-16">
              <Icon className="w-16 h-16 mx-auto text-pallor-400/50 mb-6" />
              <h3 className="heading-3 mb-2">No {config.label.toLowerCase()} yet</h3>
              <p className="body text-pallor-300">
                The scriptorium awaits its first {type === 'summoning' ? 'summoning' : `${type}r`}.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-border-subtle">
        <div className="container">
          <div className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto text-center border border-blood-400/30">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br from-blood-400/20 to-wine-400/20 border border-blood-400/30">
              <Icon className="w-10 h-10 text-blood-400" />
            </div>
            <h2 className="heading-2 mb-3">Seek Other Rites</h2>
            <p className="body text-pallor-300 mb-6">
              The scriptorium holds many chambers. Explore the other types of rites recorded here.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(typeConfig).map(([t, c]) => (
                <Link
                  key={t}
                  href={`/journal/${t}s`}
                  className={`px-4 py-2 rounded-lg font-ui text-step-0 transition-all duration-300 ${
                    t === type
                      ? "bg-blood-400/20 text-blood-400 border border-blood-400/30"
                      : "bg-void-800/50 text-pallor-300 border border-border-subtle hover:border-wine-400/50 hover:text-pallor-100"
                  }`}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}