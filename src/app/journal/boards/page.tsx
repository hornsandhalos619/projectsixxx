import { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Users, Flame, Lock, Hash, AlertTriangle, Star, ChevronRight, Plus } from "lucide-react";
import { boardCategories, formatRelativeTime } from "@/lib/boards";

export const metadata: Metadata = {
  title: "The Message Boards — Community",
  description: "Category-threaded discussions for the coven. Technical deep-dives, project showcases, dark philosophy, and the occasional summoning.",
  keywords: ["forum", "message boards", "community", "discussion", "dark academia", "software engineering", "systems architecture"],
  openGraph: {
    type: "website",
    title: "The Message Boards — Projectsixxx Journal",
    description: "Category-threaded discussions for the coven.",
    images: ["/og-boards.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Message Boards — Projectsixxx Journal",
    description: "Category-threaded discussions for the coven.",
    images: ["/og-boards.jpg"],
  },
};

const categoryIcons = {
  sanctum: MessageSquare,
  "dark-infrastructure": Flame,
  codex: Hash,
  grimoire: Star,
  forge: AlertTriangle,
  "inner-circle": Lock,
} as const;

export default function BoardsIndexPage() {
  return (
    <div className="min-h-screen texture-velvet">
      {/* Hero Section */}
      <section className="section relative overflow-hidden">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/journal" 
              className="inline-flex items-center gap-2 text-pallor-400 hover:text-wine-400 transition-colors mb-6 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="font-ui text-step-0">Return to Scriptorium</span>
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blood-400/10 border border-blood-400/30 text-blood-400 font-ui text-step--1 uppercase tracking-wider mb-6">
              <MessageSquare className="w-4 h-4" />
              <span>The Scriptorium</span>
            </div>
            
            <h1 className="heading-display mb-4">
              The Message Boards
            </h1>
            <p className="body-large text-pallor-200 max-w-2xl mx-auto mb-8">
              Category-threaded discussions for the coven. Technical deep-dives, project showcases, 
              dark philosophy, and the occasional summoning.
            </p>
            
            <div className="flex items-center justify-center gap-8 text-step-0 font-ui text-pallor-400">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                {boardCategories.reduce((sum, c) => sum + c.threadCount, 0)} threads
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {boardCategories.reduce((sum, c) => sum + c.postCount, 0)} posts
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                247 initiates
              </span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-5 w-72 h-72 rounded-full bg-blood-400/5 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-5 w-72 h-72 rounded-full bg-wine-400/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="heading-2">Chambers</h2>
              <p className="body text-pallor-300 mt-1">Each chamber holds its own rites. Choose your path.</p>
            </div>
            <Link
              href="/journal/boards/new-thread"
              className="btn-primary flex items-center gap-2 text-step-0"
            >
              <Plus className="w-4 h-4" />
              New Thread
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardCategories.map((category) => {
              const Icon = categoryIcons[category.id as keyof typeof categoryIcons] || MessageSquare;
              const threads = category.threadCount;
              const posts = category.postCount;
              
              return (
                <Link
                  key={category.id}
                  href={`/journal/boards/${category.id}`}
                  className="group relative block glass rounded-2xl p-6 border border-border-subtle hover:border-wine-400/50 hover:bg-void-800/50 transition-all duration-500 ease-caress overflow-hidden"
                >
                  {/* Private indicator */}
                  {category.isPrivate && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-pallor-400/10 border border-pallor-400/30 text-pallor-400 font-ui text-step--2">
                      <Lock className="w-3 h-3" />
                      Private
                    </div>
                  )}
                  
                  {/* Pinned indicator */}
                  {category.isPinned && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-blood-400/10 border border-blood-400/30 text-blood-400 font-ui text-step--2">
                      <Star className="w-3 h-3 fill-current" />
                      Pinned
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center ${category.color} bg-current/10 border border-current/30 group-hover:scale-105 transition-transform duration-500`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display-alt text-step-1 text-pallor-100 group-hover:text-wine-400 transition-colors mb-2">
                        {category.name}
                      </h3>
                      <p className="font-body text-step-0 text-pallor-300 leading-relaxed mb-4 line-clamp-2">
                        {category.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-step--1 text-pallor-400">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {threads} thread{threads !== 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" />
                          {posts} post{posts !== 1 ? 's' : ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <span>{formatRelativeTime(category.lastActivity)}</span>
                        </span>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-5 h-5 text-pallor-400 group-hover:text-wine-400 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="section border-y border-border-subtle bg-void-950/50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-display text-step-5 text-blood-400 mb-1">
                {boardCategories.reduce((sum, c) => sum + c.threadCount, 0)}
              </div>
              <div className="font-ui text-step-0 text-pallor-400 uppercase tracking-wider">Threads</div>
            </div>
            <div>
              <div className="font-display text-step-5 text-wine-400 mb-1">
                {boardCategories.reduce((sum, c) => sum + c.postCount, 0).toLocaleString()}
              </div>
              <div className="font-ui text-step-0 text-pallor-400 uppercase tracking-wider">Posts</div>
            </div>
            <div>
              <div className="font-display text-step-5 text-pallor-300 mb-1">247</div>
              <div className="font-ui text-step-0 text-pallor-400 uppercase tracking-wider">Initiates</div>
            </div>
            <div>
              <div className="font-display text-step-5 text-wine-300 mb-1">12</div>
              <div className="font-ui text-step-0 text-pallor-400 uppercase tracking-wider">Chambers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="section">
        <div className="container">
          <h2 className="heading-2 mb-8 text-center">Recent Activity Across Chambers</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {boardCategories
              .flatMap(category => 
                (mockThreads[category.id] || []).map(thread => ({
                  ...thread,
                  categoryName: category.name,
                  categoryId: category.id,
                  categoryColor: category.color,
                }))
              )
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 5)
              .map((thread) => (
                <Link
                  key={thread.id}
                  href={`/journal/boards/${thread.categoryId}/${thread.id}`}
                  className="group block glass rounded-xl p-4 border border-border-subtle hover:border-wine-400/50 hover:bg-void-800/50 transition-all duration-300"
                >
                  <div className="flex flex-wrap items-start gap-4">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${thread.categoryColor}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-ui text-step--1 text-pallor-400 uppercase tracking-wider">
                          {thread.categoryName}
                        </span>
                        {thread.isPinned && (
                          <span className="px-1.5 py-0.5 rounded text-step--2 font-ui text-blood-400 bg-blood-400/10 border border-blood-400/30">
                            Pinned
                          </span>
                        )}
                        {thread.isLocked && (
                          <span className="px-1.5 py-0.5 rounded text-step--2 font-ui text-pallor-400 bg-pallor-400/10 border border-pallor-400/30">
                            Locked
                          </span>
                        )}
                      </div>
                      <h3 className="font-display-alt text-step-1 text-pallor-100 group-hover:text-wine-400 transition-colors mb-1 line-clamp-1">
                        {thread.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-step--1 text-pallor-400">
                        <span className="font-body italic">{thread.author.name}</span>
                        <span>·</span>
                        <span>{formatRelativeTime(thread.updatedAt)}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {thread.replyCount}
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" />
                          {thread.viewCount}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-pallor-400 group-hover:text-wine-400 transition-colors flex-shrink-0" />
                  </div>
                </Link>
              ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/journal/boards"
              className="btn-ghost inline-flex items-center gap-2 px-8 py-4 text-step-0"
            >
              View All Activity
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="section border-t border-border-subtle">
        <div className="container">
          <div className="glass rounded-3xl p-8 md:p-12 max-w-2xl mx-auto text-center border border-blood-400/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blood-400/5 via-transparent to-wine-400/5" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br from-blood-400/20 to-wine-400/20 border border-blood-400/30">
                <Users className="w-10 h-10 text-blood-400" />
              </div>
              <h2 className="heading-2 mb-3">Not Yet Sworn?</h2>
              <p className="body text-pallor-300 mb-6">
                The boards are open to all who respect the rites. Read freely. Post after swearing fealty.
              </p>
              <Link
                href="/journal"
                className="btn-primary inline-flex items-center gap-2 px-8 py-3 text-step-0"
              >
                Swear Fealty
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Import mockThreads for recent activity
import { mockThreads } from "@/lib/boards";