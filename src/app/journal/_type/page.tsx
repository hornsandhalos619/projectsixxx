import Link from "next/link";
import { getJournalArticlesByType, type JournalArticle } from "@/lib/content";

const typeConfig = {
  essay: { label: "Essays", description: "Deep dives on business, creativity, and darkness." },
  ritual: { label: "Rituals", description: "How-to guides, frameworks, and templates." },
  confession: { label: "Confessions", description: "Personal notes, failures, and lessons." },
  summoning: { label: "Summonings", description: "Launches, partnerships, and drops." },
} as const;

export default function TypeFilterPage({ type }: { type: JournalArticle["type"] }) {
  const config = typeConfig[type];
  const articles = getJournalArticlesByType(type);

  return (
    <div className="min-h-screen bg-void-900 p-8 text-pallor-100">
      <Link href="/journal" className="font-ui text-sm text-pallor-400 hover:text-wine-400">
        ← Return to Scriptorium
      </Link>
      <h1 className="mt-6 font-display text-step-5">{config.label}</h1>
      <p className="mt-3 max-w-2xl font-body text-pallor-300">{config.description}</p>
      <div className="mt-10 space-y-6">
        {articles.length === 0 ? (
          <p className="text-pallor-400">No rites in this wing yet.</p>
        ) : (
          articles.map((article) => (
            <article key={article.slug} className="max-w-3xl border-b border-border-subtle pb-6">
              <h2 className="font-display text-step-3">
                <Link href={article.url} className="hover:text-wine-400">{article.title}</Link>
              </h2>
              <p className="mt-2 font-body text-pallor-300">{article.excerpt}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
