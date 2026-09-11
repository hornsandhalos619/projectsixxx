import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getThread, getPostsForThread, boardCategories, getThreadsForCategory } from "@/lib/boards";
import { ThreadViewClient } from "./ThreadViewClient";

interface ThreadPageProps {
  params: Promise<{ category: string; thread: string }>;
}

export async function generateMetadata({ params }: ThreadPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const category = getCategory(resolvedParams.category);
  const thread = category ? getThread(category.id, resolvedParams.thread) : undefined;
  if (!thread) return { title: "Thread Not Found" };
  return {
    title: `${thread.title} — ${category?.name || "The Message Boards"}`,
    description: `Discussion in ${category?.name}: ${thread.title}`,
  };
}

export async function generateStaticParams() {
  const params: { category: string; thread: string }[] = [];
  for (const category of boardCategories) {
    const threads = getThreadsForCategory(category.id);
    for (const thread of threads) {
      params.push({ category: category.id, thread: thread.id });
    }
  }
  return params;
}

export default async function ThreadPage({ params }: ThreadPageProps) {
  const resolvedParams = await params;
  const category = getCategory(resolvedParams.category);
  if (!category) notFound();
  const thread = getThread(category.id, resolvedParams.thread);
  if (!thread) notFound();
  const posts = getPostsForThread(thread.id);
  return (
    <ThreadViewClient
      category={{ id: category.id, name: category.name }}
      thread={thread}
      initialPosts={posts}
    />
  );
}
