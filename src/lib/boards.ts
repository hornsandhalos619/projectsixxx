import { formatDistanceToNow } from "date-fns";
import { MessageSquare, Users, Flame, Lock, ChevronRight, Hash, AlertTriangle, Star } from "lucide-react";

export interface BoardCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  threadCount: number;
  postCount: number;
  lastActivity: string;
  isPrivate?: boolean;
  isPinned?: boolean;
}

export interface BoardThread {
  id: string;
  categoryId: string;
  title: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  replyCount: number;
  viewCount: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
  lastReply: {
    author: string;
    at: string;
  };
}

export interface BoardPost {
  id: string;
  threadId: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
    joinedAt: string;
  };
  content: string;
  createdAt: string;
  updatedAt?: string;
  isOP: boolean;
  reactions: {
    fire: number;
    heart: number;
    skull: number;
    eye: number;
  };
  userReactions: string[];
}

// Board Categories
export const boardCategories: BoardCategory[] = [
  {
    id: "sanctum",
    name: "The Sanctum",
    description: "General discussion for the coven. Introductions, off-topic, and the daily rites.",
    icon: MessageSquare,
    color: "text-blood-400",
    threadCount: 47,
    postCount: 1234,
    lastActivity: "2026-07-24T14:30:00Z",
    isPinned: true,
  },
  {
    id: "dark-infrastructure",
    name: "Dark Infrastructure",
    description: "Systems architecture, resilience patterns, observability, and the Grimoire discussions.",
    icon: Flame,
    color: "text-wine-400",
    threadCount: 23,
    postCount: 567,
    lastActivity: "2026-07-23T09:15:00Z",
  },
  {
    id: "codex",
    name: "The Codex",
    description: "Code reviews, architecture decisions, library evaluations, and technical deep-dives.",
    icon: Hash,
    color: "text-pallor-300",
    threadCount: 31,
    postCount: 892,
    lastActivity: "2026-07-24T11:45:00Z",
  },
  {
    id: "grimoire",
    name: "The Grimoire",
    description: "Rituals, confessions, and summonings discussion. Meta-discussion about Journal content.",
    icon: Star,
    color: "text-wine-300",
    threadCount: 12,
    postCount: 234,
    lastActivity: "2026-07-22T18:20:00Z",
  },
  {
    id: "forge",
    name: "The Forge",
    description: "Project showcases, works in progress, collaboration requests, and commission posts.",
    icon: AlertTriangle,
    color: "text-blood-400",
    threadCount: 18,
    postCount: 445,
    lastActivity: "2026-07-24T08:00:00Z",
  },
  {
    id: "inner-circle",
    name: "The Inner Circle",
    description: "Private discussions for sworn members. Strategy, planning, and coven matters.",
    icon: Lock,
    color: "text-pallor-400",
    threadCount: 8,
    postCount: 156,
    lastActivity: "2026-07-21T22:10:00Z",
    isPrivate: true,
  },
];

// Mock Threads
export const mockThreads: Record<string, BoardThread[]> = {
  sanctum: [
    {
      id: "welcome-coven",
      categoryId: "sanctum",
      title: "🕯️ Welcome New Initiates — Introduce Yourselves Here",
      author: { name: "Vesper Thorne", role: "Chief Architect" },
      createdAt: "2026-01-15T10:00:00Z",
      updatedAt: "2026-07-24T14:30:00Z",
      replyCount: 156,
      viewCount: 3421,
      isPinned: true,
      isLocked: false,
      tags: ["meta", "welcome", "pinned"],
      lastReply: { author: "nyx_shadow", at: "2026-07-24T14:30:00Z" },
    },
    {
      id: "daily-rites-thread",
      categoryId: "sanctum",
      title: "Daily Rites — What did you ship today?",
      author: { name: "Marcus Vane", role: "DevOps Adept" },
      createdAt: "2026-07-20T06:00:00Z",
      updatedAt: "2026-07-24T13:22:00Z",
      replyCount: 89,
      viewCount: 1876,
      isPinned: true,
      isLocked: false,
      tags: ["daily", "ritual", "pinned"],
      lastReply: { author: "cipher_null", at: "2026-07-24T13:22:00Z" },
    },
    {
      id: "music-while-coding",
      categoryId: "sanctum",
      title: "What's playing in your headphones while you debug?",
      author: { name: "Elena Rossi", role: "Creative Technologist" },
      createdAt: "2026-07-18T22:15:00Z",
      updatedAt: "2026-07-24T10:11:00Z",
      replyCount: 67,
      viewCount: 934,
      isPinned: false,
      isLocked: false,
      tags: ["music", "culture", "off-topic"],
      lastReply: { author: "void_walker", at: "2026-07-24T10:11:00Z" },
    },
    {
      id: "mechanical-keyboards",
      categoryId: "sanctum",
      title: "Mechanical keyboard appreciation thread — show us your board",
      author: { name: "Sarah Chen", role: "Senior Engineer" },
      createdAt: "2026-07-15T14:30:00Z",
      updatedAt: "2026-07-23T19:45:00Z",
      replyCount: 43,
      viewCount: 712,
      isPinned: false,
      isLocked: false,
      tags: ["hardware", "aesthetics", "showcase"],
      lastReply: { author: "keycap_witch", at: "2026-07-23T19:45:00Z" },
    },
  ],
  "dark-infrastructure": [
    {
      id: "circuit-breaker-patterns",
      categoryId: "dark-infrastructure",
      title: "Circuit breaker patterns — when to trip, when to reset?",
      author: { name: "Vesper Thorne", role: "Chief Architect" },
      createdAt: "2026-07-10T09:00:00Z",
      updatedAt: "2026-07-23T09:15:00Z",
      replyCount: 34,
      viewCount: 876,
      isPinned: true,
      isLocked: false,
      tags: ["patterns", "resilience", "pinned"],
      lastReply: { author: "marcus_vane", at: "2026-07-23T09:15:00Z" },
    },
    {
      id: "logging-liturgy-discussion",
      categoryId: "dark-infrastructure",
      title: "Discussion: The Liturgy of Logging — your implementations?",
      author: { name: "Marcus Vane", role: "DevOps Adept" },
      createdAt: "2026-07-18T14:00:00Z",
      updatedAt: "2026-07-22T16:30:00Z",
      replyCount: 28,
      viewCount: 543,
      isPinned: false,
      isLocked: false,
      tags: ["logging", "observability", "ritual"],
      lastReply: { author: "sre_shaman", at: "2026-07-22T16:30:00Z" },
    },
    {
      id: "database-split-brain",
      categoryId: "dark-infrastructure",
      title: "Postmortem: How we survived a split-brain (and what we changed)",
      author: { name: "Vesper Thorne", role: "Chief Architect" },
      createdAt: "2026-07-12T05:30:00Z",
      updatedAt: "2026-07-21T11:20:00Z",
      replyCount: 41,
      viewCount: 1123,
      isPinned: false,
      isLocked: false,
      tags: ["postmortem", "database", "confession"],
      lastReply: { author: "data_priestess", at: "2026-07-21T11:20:00Z" },
    },
  ],
  codex: [
    {
      id: "rust-vs-go-2026",
      categoryId: "codex",
      title: "Rust vs Go in 2026 — for backend services, what's the verdict?",
      author: { name: "Cipher Null", role: "Platform Engineer" },
      createdAt: "2026-07-08T11:00:00Z",
      updatedAt: "2026-07-24T11:45:00Z",
      replyCount: 67,
      viewCount: 2134,
      isPinned: false,
      isLocked: false,
      tags: ["languages", "backend", "debate"],
      lastReply: { author: "rust_acolyte", at: "2026-07-24T11:45:00Z" },
    },
    {
      id: "react-server-components",
      categoryId: "codex",
      title: "RSC in production — pain points and patterns after 6 months",
      author: { name: "Sarah Chen", role: "Senior Engineer" },
      createdAt: "2026-06-28T10:00:00Z",
      updatedAt: "2026-07-23T14:22:00Z",
      replyCount: 52,
      viewCount: 1567,
      isPinned: true,
      isLocked: false,
      tags: ["react", "rsc", "production", "pinned"],
      lastReply: { author: "next_js_shaman", at: "2026-07-23T14:22:00Z" },
    },
  ],
  grimoire: [
    {
      id: "grimoire-feedback",
      categoryId: "grimoire",
      title: "The Grimoire is unsealed — feedback, requests, and errata",
      author: { name: "The Coven Council", role: "Horns & Halos" },
      createdAt: "2026-07-25T00:00:00Z",
      updatedAt: "2026-07-24T18:20:00Z",
      replyCount: 23,
      viewCount: 678,
      isPinned: true,
      isLocked: false,
      tags: ["meta", "feedback", "pinned", "announcement"],
      lastReply: { author: "grimoire_keeper", at: "2026-07-24T18:20:00Z" },
    },
    {
      id: "ritual-request-deployment",
      categoryId: "grimoire",
      title: "Request: Ritual for database migration ceremonies",
      author: { name: "Data Priestess", role: "DBA" },
      createdAt: "2026-07-22T15:30:00Z",
      updatedAt: "2026-07-23T10:15:00Z",
      replyCount: 8,
      viewCount: 189,
      isPinned: false,
      isLocked: false,
      tags: ["request", "database", "ritual"],
      lastReply: { author: "marcus_vane", at: "2026-07-23T10:15:00Z" },
    },
  ],
  forge: [
    {
      id: "showcase-dark-dashboard",
      categoryId: "forge",
      title: "[Showcase] Dark mode dashboard with blood-red accents — built with Next.js + Tailwind",
      author: { name: "Void Walker", role: "Frontend Adept" },
      createdAt: "2026-07-20T18:00:00Z",
      updatedAt: "2026-07-24T08:00:00Z",
      replyCount: 24,
      viewCount: 567,
      isPinned: false,
      isLocked: false,
      tags: ["showcase", "frontend", "tailwind", "dark-mode"],
      lastReply: { author: "css_warlock", at: "2026-07-24T08:00:00Z" },
    },
    {
      id: "collab-agentic-bots",
      categoryId: "forge",
      title: "Seeking collaborators: Agentic bot framework for Discord/Slack",
      author: { name: "Agent Smith", role: "AI Engineer" },
      createdAt: "2026-07-15T12:00:00Z",
      updatedAt: "2026-07-22T09:30:00Z",
      replyCount: 15,
      viewCount: 334,
      isPinned: false,
      isLocked: false,
      tags: ["collaboration", "ai", "bots", "hiring"],
      lastReply: { author: "bot_summoner", at: "2026-07-22T09:30:00Z" },
    },
  ],
  "inner-circle": [
    {
      id: "q3-planning",
      categoryId: "inner-circle",
      title: "Q3 Planning — Roadmap, resources, and ritual calendar",
      author: { name: "Vesper Thorne", role: "Chief Architect" },
      createdAt: "2026-07-01T09:00:00Z",
      updatedAt: "2026-07-21T22:10:00Z",
      replyCount: 34,
      viewCount: 156,
      isPinned: true,
      isLocked: false,
      tags: ["planning", "roadmap", "private", "pinned"],
      lastReply: { author: "coven_council", at: "2026-07-21T22:10:00Z" },
    },
  ],
};

// Mock Posts for threads
export const mockPosts: Record<string, BoardPost[]> = {
  "welcome-coven": [
    {
      id: "post-1",
      threadId: "welcome-coven",
      author: { name: "Vesper Thorne", role: "Chief Architect", joinedAt: "2025-01-15T00:00:00Z" },
      content: `Welcome to **The Sanctum**, the gathering hall of the Horns & Halos coven.

This is where we speak as peers — no titles required, only respect for the craft.

**Introduce yourself:**
- What name do you go by?
- What darkness do you work in? (backend, frontend, infra, design, etc.)
- What brought you to the coven?
- One thing you're currently building or learning

**A few rites to observe:**
1. **No performative expertise** — we're all learning. Ask questions. Admit unknowns.
2. **Confessions welcome** — share your failures. They teach us more than victories.
3. **No gatekeeping** — the only requirement is genuine interest in the craft.
4. **Seal your words** — think before you post. This is a permanent record.

Light a candle. Pull up a stool. The fire is warm.

— Vesper`,
      createdAt: "2026-01-15T10:00:00Z",
      isOP: true,
      reactions: { fire: 47, heart: 32, skull: 12, eye: 8 },
      userReactions: [],
    },
    {
      id: "post-2",
      threadId: "welcome-coven",
      author: { name: "Marcus Vane", role: "DevOps Adept", joinedAt: "2025-03-22T00:00:00Z" },
      content: `**Marcus Vane** — DevOps Adept

I tend the deployment pipelines, the logging liturgy, and the incident response rites. Been with the coven since the early days of the Grimoire.

Currently: Refining the **Ritual of the Rollback** — practicing monthly fire drills so the real thing is muscle memory.

Also: Slowly migrating our observability stack from "whatever works" to "structured, queryable, honest."

Favorite ritual: The 3 AM page that *doesn't* wake me because the circuit breaker held.

🕯️`,
      createdAt: "2026-01-15T10:15:00Z",
      isOP: false,
      reactions: { fire: 23, heart: 18, skull: 5, eye: 3 },
      userReactions: [],
    },
    {
      id: "post-3",
      threadId: "welcome-coven",
      author: { name: "nyx_shadow", role: "Initiate", joinedAt: "2026-07-20T00:00:00Z" },
      content: `**nyx_shadow** — Initiate

Just swore fealty last week. Background in backend (Go, Postgres, some Rust lately). Found the coven through the "Architecture of Darkness" essay — the bit about productive settling hit different.

Currently building: A log aggregation sidecar that doesn't require a PhD to operate.

Learning: How to write runbooks that 3 AM me will actually understand.

Confession: I've definitely said "I got this" when I absolutely did not have this. Working on it.

Good to be here. 🕯️`,
      createdAt: "2026-07-24T14:30:00Z",
      isOP: false,
      reactions: { fire: 12, heart: 15, skull: 2, eye: 1 },
      userReactions: [],
    },
  ],
  "circuit-breaker-patterns": [
    {
      id: "post-10",
      threadId: "circuit-breaker-patterns",
      author: { name: "Vesper Thorne", role: "Chief Architect", joinedAt: "2025-01-15T00:00:00Z" },
      content: `Following up on the **Architecture of Darkness** essay — let's go deeper on circuit breakers.

The pattern is simple: **fail fast, recover gracefully, learn continuously.**

But the *implementation* is where the darkness lives. Some questions for the coven:

**Thresholds:**
- Fixed count (5 failures) vs rate-based (10% error rate over 30s)?
- Different thresholds for different error types? (timeout vs 5xx vs circuit breaker downstream)

**Reset strategy:**
- Fixed cooldown (30s)?
- Exponential backoff?
- Half-open probe requests?
- Manual intervention required?

**Observability:**
- What metrics do you emit? (state changes, rejected calls, probe results)
- How do you alert? (page on open? daily digest?)
- Do you correlate with business metrics?

**The confession:**
Our current implementation uses fixed thresholds + fixed cooldown. It works *okay* but has false positives during deployments (healthy service, brief blip during rollout).

**What does your circuit breaker confess?**`,
      createdAt: "2026-07-10T09:00:00Z",
      isOP: true,
      reactions: { fire: 34, heart: 12, skull: 3, eye: 15 },
      userReactions: [],
    },
    {
      id: "post-11",
      threadId: "circuit-breaker-patterns",
      author: { name: "marcus_vane", role: "DevOps Adept", joinedAt: "2025-03-22T00:00:00Z" },
      content: `We moved to **rate-based with adaptive cooldown** last quarter.

\`\`\`typescript
interface CircuitBreakerConfig {
  // Trip if error rate exceeds threshold over window
  errorRateThreshold: 0.1; // 10%
  evaluationWindow: 30000; // 30s rolling window
  minimumRequests: 20; // Don't trip on low traffic
  
  // Cooldown adapts based on failure pattern
  baseCooldown: 30000; // 30s
  maxCooldown: 300000; // 5min
  cooldownMultiplier: 1.5; // Exponential backoff
  
  // Half-open: probe with shadow traffic first
  probeStrategy: 'shadow' | 'real' | 'mixed';
  probeCount: 3;
}
\`\`\`

**Key changes:**
1. **Rate-based** — ignores brief blips during deployments
2. **Minimum requests** — doesn't trip on idle services
3. **Adaptive cooldown** — repeated trips = longer penance
4. **Shadow probes** — test with copied production traffic before real users

**Results:** 73% fewer false positives. 2 real incidents caught faster because we weren't alert-fatigued.

The config is in the Grimoire under **Patterns → Circuit Breakers as Confession**.`,
      createdAt: "2026-07-10T09:45:00Z",
      isOP: false,
      reactions: { fire: 28, heart: 8, skull: 1, eye: 12 },
      userReactions: [],
    },
  ],
};

// Helper functions
export function getCategory(categoryId: string): BoardCategory | undefined {
  return boardCategories.find(c => c.id === categoryId);
}

export function getThreadsForCategory(categoryId: string): BoardThread[] {
  return mockThreads[categoryId] || [];
}

export function getThread(categoryId: string, threadId: string): BoardThread | undefined {
  return mockThreads[categoryId]?.find(t => t.id === threadId);
}

export function getPostsForThread(threadId: string): BoardPost[] {
  return mockPosts[threadId] || [];
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}