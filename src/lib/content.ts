import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

function getAllFiles(dir: string, fileTypes: string[] = [".mdx", ".md"]): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, fileTypes));
    } else if (fileTypes.some((ext) => file.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFile(filePath: string) {
  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = matter(content);
  const relativePath = path.relative(contentDir, filePath);
  const slug = relativePath
    .replace(/\.mdx?$/, "")
    .replace(/\\/g, "/")
    .replace(/^(journal|services|case-studies|faqs)\//, "");
  return { ...data, slug, body, _raw: content };
}

export function getAllServices() {
  return getAllFiles(path.join(contentDir, "services"))
    .map(parseFile)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getService(slug: string) {
  return getAllServices().find((s) => s.slug === slug || s.slug.endsWith(`/${slug}`));
}

export function getAllCaseStudies() {
  return getAllFiles(path.join(contentDir, "case-studies"))
    .map(parseFile)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getCaseStudiesForService(serviceSlug: string) {
  return getAllCaseStudies().filter((cs) => cs.serviceSlug === serviceSlug);
}

export function getAllFAQs() {
  return getAllFiles(path.join(contentDir, "faqs"))
    .map(parseFile)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getFAQsForService(serviceSlug: string) {
  return getAllFAQs().filter((f) => f.serviceSlug === serviceSlug);
}

export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  type: "essay" | "ritual" | "confession" | "summoning";
  author: string;
  authorRole?: string;
  tags?: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  coverImage?: string;
  coverAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  body: string;
  _raw: string;
  url: string;
  typeLabel: string;
}

export function getAllJournalArticles(): JournalArticle[] {
  return getAllFiles(path.join(contentDir, "journal"))
    .map((filePath) => {
      const parsed = parseFile(filePath) as JournalArticle;
      const slug = String(parsed.slug || "").replace(/^journal\//, "");
      return {
        ...parsed,
        slug,
        url: `/journal/${slug}`,
        typeLabel: parsed.typeLabel || String(parsed.type || "essay"),
        featured: Boolean(parsed.featured),
        readTime: parsed.readTime || 6,
      };
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getJournalArticle(slug: string) {
  return getAllJournalArticles().find((a) => a.slug === slug);
}

export function getJournalArticlesByType(type: JournalArticle["type"]) {
  return getAllJournalArticles().filter((a) => a.type === type);
}

export function getJournalArticlesByTag(tag: string) {
  const needle = tag.toLowerCase();
  return getAllJournalArticles().filter((article) =>
    (article.tags || []).some((entry) => entry.toLowerCase() === needle)
  );
}

export function getFeaturedJournalArticles() {
  return getAllJournalArticles().filter((a) => a.featured);
}

export function getJournalArticlesForStaticParams() {
  return getAllJournalArticles().map((a) => ({ slug: a.slug }));
}

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}
