import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Users, Flame, Lock, Hash, AlertTriangle, Star, ChevronRight, ChevronLeft, Plus, Filter, Search } from "lucide-react";
import { boardCategories, getCategory, getThreadsForCategory, formatRelativeTime, type BoardCategory, type BoardThread } from "@/lib/boards";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategory(resolvedParams.category);
  
  if (!category) {
    return { title: "Category Not Found" };
  }
  
  return {
    title: `${category.name} — The Message Boards`,
    description: category.description,
    openGraph: {
      type: "website",
      title: `${category.name} — The Message Boards`,
      description: category.description,
      images: [`/og-board-${category.id}.jpg`],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} — The Message Boards`,
      description: category.description,
      images: [`/og-board-${category.id}.jpg`],
    },
  };
}

const categoryIcons = {
  sanctum: MessageSquare,
  "dark-infrastructure": Flame,
  codex: Hash,
  grimoire: Star,
  forge: AlertTriangle,
  "inner-circle": Lock,
} as const;

export async function generateStaticParams() {
  return boardCategories.map((category) => ({
    category: category.id,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const category = getCategory(resolvedParams.category);
  
  if (!category) {
    notFound();
  }
  
  const threads = getThreadsForCategory(category.id);
  const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || MessageSquare;
  
  // Sort: pinned first, then by last activity
  const sortedThreads = [...threads].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="min-h-screen texture-velvet">
      {/* Header */}
      <header className="relative pt-16 pb-12 md:pt-24 md:pb-16 border-b border-border-subtle">
        <div className="container">
          <Link 
            href="/journal/boards" 
            className="inline-flex items-center gap-2 text-pallor-400 hover:text-wine-400 transition-colors mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-ui text-step-0">All Chambers</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blood-400/10 border border-blood-400/30 text-blood-400 font-ui text-step--1 uppercase tracking-wider mb-4">
                <Icon className="w-4 h-4" />
                <span>The Message Boards</span>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${category.color} bg-current/10 border border-current/30`}>
                  <Icon className="w-9 h-9" />
                </div>
                <div>
                  <h1 className="font-display text-step-5 md:text-step-6 text-pallor-50">
                    {category.name}
                  </h1>
                  {category.isPrivate && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pallor-400/10 border border-pallor-400/30 text-pallor-400 font-ui text-step--2 mt-1">
                      <Lock className="w-3 h-3" />
                      Private Chamber
                    </span>
                  )}
                </div>
              </div>
              
              <p className="body text-pallor-300 max-w-2xl">
                {category.description}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/journal/boards/${category.id}/new-thread`}
                className="btn-primary flex items-center gap-2 text-step-0"
              >
                <Plus className="w-4 h-4" />
                New Thread
              </Link>
              <button className="btn-ghost flex items-center gap-2 text-step-0">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="btn-ghost flex items-center gap-2 text-step-0">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-step-0 font-ui text-pallor-400 border-t border-border-subtle pt-6">
            <div className="flex flex-wrap items-center gap-6">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {category.threadCount} thread{category.threadCount !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {category.postCount} post{category.postCount !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1">
                <span>Last active {formatRelativeTime(category.lastActivity)}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Threads List */}
      <main className="section">
        <div className="container">
          {sortedThreads.length === 0 ? (
            <div className="text-center py-16">
              <Icon className="w-16 h-16 mx-auto text-pallor-400/50 mb-6" />
              <h2 className="heading-3 mb-2">No Rites Yet</h2>
              <p className="body text-pallor-300 mb-6 max-w-md mx-auto">
                This chamber awaits its first thread. Be the one to light the candle.
              </p>
              <Link
                href={`/journal/boards/${category.id}/new-thread`}
                className="btn-primary inline-flex items-center gap-2 text-step-0"
              >
                <Plus className="w-4 h-4" />
                Start the First Thread
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedThreads.map((thread) => (
                <ThreadRow key={thread.id} thread={thread} category={category} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom CTA */}
      <section className="section border-t border-border-subtle">
        <div className="container">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto text-center border border-blood-400/30">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-blood-400/20 to-wine-400/20 border border-blood-400/30">
              <Plus className="w-8 h-8 text-blood-400" />
            </div>
            <h2 className="heading-2 mb-3">Begin a New Rite</h2>
            <p className="body text-pallor-300 mb-6">
              Have a question? A confession? A showcase? Start a thread in this chamber.
            </p>
            <Link
              href={`/journal/boards/${category.id}/new-thread`}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-step-0"
            >
              <Plus className="w-4 h-4" />
              New Thread
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ThreadRow({ thread, category }: { thread: BoardThread; category: BoardCategory }) {
  return (
    <Link
      href={`/journal/boards/${category.id}/${thread.id}`}
      className="group block glass rounded-xl p-4 md:p-6 border border-border-subtle hover:border-wine-400/50 hover:bg-void-800/50 transition-all duration-300 relative"
    >
      {/* Pinned/Locked badges */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {thread.isPinned && (
          <span className="px-2 py-0.5 rounded text-step--2 font-ui text-blood-400 bg-blood-400/10 border border-blood-400/30 flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Pinned
          </span>
        )}
        {thread.isLocked && (
          <span className="px-2 py-0.5 rounded text-step--2 font-ui text-pallor-400 bg-pallor-400/10 border border-pallor-400/30 flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Locked
          </span>
        )}
        {thread.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded text-step--2 font-ui text-pallor-400 border border-border-subtle hover:border-wine-400 hover:text-pallor-200 transition-colors">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display-alt text-step-1 md:text-step-2 text-pallor-100 group-hover:text-wine-400 transition-colors mb-2 line-clamp-1">
            {thread.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4 text-step-0 text-pallor-400">
            <span className="font-body italic text-pallor-300">{thread.author.name}</span>
            <span className="font-ui text-pallor-500">·</span>
            <time dateTime={thread.createdAt} className="font-ui">
              {formatDistanceToNow(new Date(thread.createdAt), { addSuffix: true })}
            </time>
            {thread.updatedAt !== thread.createdAt && (
              <>
                <span className="font-ui text-pallor-500">·</span>
                <span className="font-ui">updated {formatRelativeTime(thread.updatedAt)}</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 md:items-center md:flex-row-reverse md:gap-4 flex-shrink-0">
          <div className="flex items-center gap-4 text-step-0 font-ui text-pallor-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              {thread.replyCount}
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-4 h-4" />
              {thread.viewCount}
            </span>
          </div>
          
          <div className="text-right md:text-left">
            <div className="font-ui text-step-0 text-pallor-300">
              Last: <span className="font-body italic text-pallor-200">{thread.lastReply.author}</span>
            </div>
            <div className="font-ui text-step--1 text-pallor-400">
              {formatRelativeTime(thread.lastReply.at)}
            </div>
          </div>
          
          <ChevronRight className="w-5 h-5 text-pallor-400 group-hover:text-wine-400 transition-colors hidden md:block" />
        </div>
      </div>
    </Link>
  );
}