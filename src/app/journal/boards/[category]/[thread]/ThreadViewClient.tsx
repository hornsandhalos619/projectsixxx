"use client";

import Link from "next/link";
import { Flame, Heart, Eye, Skull, Lock, ChevronLeft, MessageSquare } from "lucide-react";
import { formatRelativeTime, type BoardThread, type BoardPost } from "@/lib/boards";

export function ThreadViewClient({
  category,
  thread,
  initialPosts,
}: {
  category: { id: string; name: string };
  thread: BoardThread;
  initialPosts: BoardPost[];
}) {
  return (
    <div className="min-h-screen p-8 text-pallor-100">
      <Link href={`/journal/boards/${category.id}`} className="text-pallor-400 hover:text-wine-400">
        <ChevronLeft className="inline h-4 w-4" /> {category.name}
      </Link>
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-pallor-400">
        {thread.isPinned ? <span>Pinned</span> : null}
        {thread.isLocked ? <span><Lock className="inline h-3 w-3" /> Locked</span> : null}
      </div>
      <h1 className="mt-4 font-display text-step-4">{thread.title}</h1>
      <p className="mt-2 text-pallor-300">{thread.author.name} · {thread.replyCount} replies · {thread.viewCount.toLocaleString()} views</p>
      <div className="mt-8 space-y-6">
        {initialPosts.map((post) => (
          <article key={post.id} className="rounded-xl border border-border-subtle p-6">
            <p className="font-display-alt text-pallor-100">{post.author.name}</p>
            <p className="text-sm text-pallor-400">{formatRelativeTime(post.createdAt)}</p>
            <p className="mt-4 whitespace-pre-wrap text-pallor-200">{post.content}</p>
            <p className="mt-4 text-sm text-pallor-400">
              <Flame className="inline h-3.5 w-3.5 text-blood-400" /> {post.reactions.fire}{" "}
              <Heart className="inline h-3.5 w-3.5 text-wine-400" /> {post.reactions.heart}{" "}
              <Skull className="inline h-3.5 w-3.5" /> {post.reactions.skull}{" "}
              <Eye className="inline h-3.5 w-3.5" /> {post.reactions.eye}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex gap-3">
        <Link href="/journal" className="text-blood-400 hover:text-wine-400">All journal rites</Link>
        <MessageSquare className="h-4 w-4 text-pallor-400" />
      </div>
    </div>
  );
}
