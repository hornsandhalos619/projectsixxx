import { Metadata } from "next";
import Link from "next/link";
import { getAllJournalArticles, getJournalArticlesByType } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Scriptorium — Journal & Community",
  description: "Essays, rituals, confessions, and summonings from the Horns & Halos coven.",
};

const types = [
  { href: "/journal/essays", label: "Essays" },
  { href: "/journal/rituals", label: "Rituals" },
  { href: "/journal/confessions", label: "Confessions" },
  { href: "/journal/summonings", label: "Summonings" },
  { href: "/journal/boards", label: "Boards" },
] as const;

export default function JournalIndexPage() {
  const articles = getAllJournalArticles();
  const counts = {
    essay: getJournalArticlesByType("essay").length,
    ritual: getJournalArticlesByType("ritual").length,
    confession: getJournalArticlesByType("confession").length,
    summoning: getJournalArticlesByType("summoning").length,
  };

  return (
    <div className="min-h-screen bg-void-900 p-8 text-pallor-100">
      <p className="font-ui text-sm uppercase tracking-widest text-blood-400">The Scriptorium</p>
      <h1 className="mt-4 font-display text-step-6">The Scriptorium</h1>
      <p className="mt-4 max-w-2xl font-body text-pallor-300">
        Essays forged in production fires, rituals for resilient systems, confessions from the 3 AM watch, and Overmind Grok transmissions.
      </p>
      <nav className="mt-8 flex flex-wrap gap-3">
        {types.map((type) => (
          <Link key={type.href} href={type.href} className="rounded border border-border-subtle px-4 py-2 hover:border-blood-400">
            {type.label}
            {type.label === "Essays" ? ` (${counts.essay})` : ""}
            {type.label === "Rituals" ? ` (${counts.ritual})` : ""}
            {type.label === "Confessions" ? ` (${counts.confession})` : ""}
            {type.label === "Summonings" ? ` (${counts.summoning})` : ""}
          </Link>
        ))}
      </nav>
      <div className="mt-12 space-y-6">
        {articles.map((article) => (
          <article key={article.slug} className="max-w-3xl border-b border-border-subtle pb-6">
            <p className="font-ui text-xs uppercase tracking-wider text-blood-400">{article.typeLabel}</p>
            <h2 className="mt-2 font-display text-step-3">
              <Link href={article.url} className="hover:text-wine-400">{article.title}</Link>
            </h2>
            <p className="mt-2 font-body text-pallor-300">{article.excerpt}</p>
            <p className="mt-2 font-ui text-sm text-pallor-400">
              {article.author} · {article.readTime} min
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
