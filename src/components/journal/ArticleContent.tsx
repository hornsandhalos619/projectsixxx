import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { type JournalArticle } from "@/lib/content";

export function ArticleContent({
  article,
}: {
  article: JournalArticle;
  related: JournalArticle[];
  prevArticle?: JournalArticle | null;
  nextArticle?: JournalArticle | null;
}) {
  return (
    <article className="min-h-screen p-8 text-pallor-100">
      <Link href="/journal" className="text-pallor-400 hover:text-wine-400">← Return to Scriptorium</Link>
      <h1 className="mt-6 font-display text-step-5">{article.title}</h1>
      <p className="mt-4 max-w-3xl font-body text-pallor-300">{article.excerpt}</p>
      <div className="prose prose-invert mt-10 max-w-3xl">
        <MDXRemote source={article.body} />
      </div>
    </article>
  );
}
