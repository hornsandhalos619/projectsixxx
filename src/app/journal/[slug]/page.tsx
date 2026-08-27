import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalArticle, getAllJournalArticles, type JournalArticle } from "@/lib/content";
import { ArticleContent } from "@/components/journal/ArticleContent";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getJournalArticle(resolvedParams.slug);
  
  if (!article) {
    return { title: "Article Not Found" };
  }
  
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: {
      type: "article",
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
      tags: article.tags,
      images: article.coverImage ? [{ url: article.coverImage, alt: article.coverAlt || article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = getAllJournalArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = getJournalArticle(resolvedParams.slug);
  
  if (!article) {
    notFound();
  }
  
  return <ArticleContent article={article} />;
}