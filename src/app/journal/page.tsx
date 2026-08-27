import { Metadata } from "next";
import { Link } from "next/link";
import { BookOpen, Flame, Heart, Megaphone, ChevronRight } from "lucide-react";
import { getAllJournalArticles, getFeaturedJournalArticles, getJournalArticlesByType, type JournalArticle } from "@/lib/content";
import { ArticleCard } from "@/components/journal";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "The Scriptorium — Journal & Community",
  description: "Essays, rituals, confessions, and summonings from the Horns & Halos coven. Dark academia meets systems engineering.",
  keywords: ["journal", "blog", "essays", "rituals", "confessions", "announcements", "dark academia", "systems engineering", "software architecture"],
  openGraph: {
    type: "website",
    title: "The Scriptorium — Projectsixxx Journal",
    description: "Essays, rituals, confessions, and summonings from the Horns & Halos coven.",
    images: ["/og-journal.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Scriptorium — Projectsixxx Journal",
    description: "Essays, rituals, confessions, and summonings from the Horns & Halos coven.",
    images: ["/og-journal.jpg"],
  },
};

const typeConfig = {
  essay: { icon: BookOpen, label: "Essays", description: "Deep dives on business, creativity, darkness", count: 0 },
  ritual: { icon: Flame, label: "Rituals", description: "How-to guides, frameworks, templates", count: 0 },
  confession: { icon: Heart, label: "Confessions", description: "Personal notes, failures, lessons", count: 0 },
  summoning: { icon: Megaphone, label: "Summonings", description: "Launches, partnerships, drops", count: 0 },
} as const;

type JournalType = keyof typeof typeConfig;

export default function JournalIndexPage() {
  const allArticles = getAllJournalArticles();
  const featuredArticles = getFeaturedJournalArticles();
  
  // Count articles by type
  Object.keys(typeConfig).forEach((key) => {
    const type = key as JournalType;
    typeConfig[type].count = getJournalArticlesByType(type).length;
  });

  const recentArticles = allArticles.slice(0, 10);
  const nonFeaturedRecent = recentArticles.filter(a => !a.featured).slice(0, 6);

  return (
    <div className="min-h-screen texture-velvet">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blood-400/10 border border-blood-400/30 text-blood-400 font-ui text-step--1 uppercase tracking-wider mb-6 animate-in">
              <span>The Scriptorium</span>
            </div>
            <h1 className="heading-display mb-6 animate-in stagger-1">
              The Scriptorium
            </h1>
            <p className="body-large text-pallor-200 max-w-2xl mx-auto animate-in stagger-2">
              Where the coven records its rites — essays forged in production fires, rituals for resilient systems, 
              confessions from the 3 AM watch, and summonings of what&apos;s to come.
            </p>
            
            {/* Type Filters */}
            <nav className="mt-10 animate-in stagger-3" aria-label="Journal content types">
              <ul className="flex flex-wrap justify-center gap-3" role="list">
                {Object.entries(typeConfig).map(([type, config]) => (
                  <li key={type}>
                    <Link
                      href={`/journal/${type}s`}
                      className="group flex items-center gap-3 px-5 py-3.5 rounded-xl border border-border-subtle hover:border-wine-400/50 hover:bg-void-800/50 transition-all duration-300 ease-caress min-w-[200px]"
                    >
                      <config.icon className="w-5 h-5 text-blood-400 group-hover:text-wine-400 transition-colors flex-shrink-0" aria-hidden="true" />
                      <div className="text-left">
                        <span className="font-display-alt text-step-0 text-pallor-100 group-hover:text-wine-400 transition-colors">
                          {config.label}
                        </span>
                        <p className="font-ui text-step--1 text-pallor-400 mt-0.5 line-clamp-1">
                          {config.description}
                        </p>
                        <span className="font-mono text-step--2 text-pallor-400">
                          {config.count} entries
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-pallor-400 group-hover:text-wine-400 transition-colors ml-auto" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-5 w-72 h-72 rounded-full bg-blood-400/5 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-5 w-72 h-72 rounded-full bg-wine-400/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="section border-y border-border-subtle">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="heading-2">Featured Rites</h2>
                <p className="body text-pallor-300 mt-1">Chosen by the council — essential reading for the initiate</p>
              </div>
              <Link
                href="/journal"
                className="link-muted font-ui text-step-0 flex items-center gap-1 hover:text-wine-400"
              >
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Entries */}
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="heading-2">Latest Entries</h2>
              <p className="body text-pallor-300 mt-1">The most recent rites recorded in the scriptorium</p>
            </div>
            <Link
              href="/journal"
              className="link-muted font-ui text-step-0 flex items-center gap-1 hover:text-wine-400"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nonFeaturedRecent.map((article, index) => (
              <ArticleCard key={article.slug} article={article} variant="default" />
            ))}
          </div>

          {allArticles.length > nonFeaturedRecent.length + featuredArticles.length && (
            <div className="text-center mt-12">
              <Link
                href="/journal/all"
                className="btn-ghost inline-flex items-center gap-2 px-8 py-4 text-step-0"
              >
                Load More Rites
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section">
        <div className="container">
          <div className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto text-center border border-blood-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blood-400/5 via-transparent to-wine-400/5" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blood-400/10 border border-blood-400/30 text-blood-400 font-ui text-step--1 uppercase tracking-wider mb-6">
                <Flame className="w-4 h-4" />
                <span>Join the Coven</span>
              </div>
              <h2 className="heading-2 mb-4">Swear Fealty to the Grimoire</h2>
              <p className="body text-pallor-300 mb-8 max-w-lg mx-auto">
                Receive the Dark Infrastructure playbook, new rituals, and confessions — forged in production fires, delivered to your inbox.
              </p>
              <form action="/api/newsletter/subscribe" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                  className="input flex-1 text-center sm:text-left"
                  autoComplete="email"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  I Swear Fealty
                </button>
              </form>
              <p className="font-ui text-step--1 text-pallor-400 mt-4">
                No spam. No marketing. Only the Grimoire. Unseal anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Message Boards Link */}
      <section className="section border-t border-border-subtle">
        <div className="container">
          <Link
            href="/journal/boards"
            className="group block max-w-2xl mx-auto glass rounded-2xl p-8 md:p-12 text-center border border-border-subtle hover:border-wine-400/50 hover:bg-void-800/50 transition-all duration-500 ease-caress"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br from-blood-400/20 to-wine-400/20 border border-blood-400/30 group-hover:scale-105 transition-transform duration-500">
              <Megaphone className="w-10 h-10 text-blood-400 group-hover:text-wine-400 transition-colors" />
            </div>
            <h2 className="heading-2 mb-3">The Message Boards</h2>
            <p className="body text-pallor-300 mb-6 max-w-lg mx-auto">
              Category-threaded discussions for the coven. Technical deep-dives, project showcases, dark philosophy, and the occasional summoning.
            </p>
            <div className="flex items-center justify-center gap-4 text-step-0 font-ui text-pallor-400">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                12 Categories
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                Active Threads
              </span>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="btn-sigil">Enter the Boards</span>
              <ChevronRight className="w-5 h-5 text-blood-400 group-hover:text-wine-400 transition-colors" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}