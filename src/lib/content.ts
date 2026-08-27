import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src/content');

function getAllFiles(dir: string, fileTypes: string[] = ['.mdx', '.md']): string[] {
  const files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, fileTypes));
    } else if (fileTypes.some(ext => file.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  return files;
}

function parseFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  const relativePath = path.relative(contentDir, filePath);
  const slug = relativePath.replace(/\.mdx?$/, '').replace(/\\/g, '/');
  return { ...data, slug, body, _raw: content };
}

export function getAllServices() {
  const files = getAllFiles(path.join(contentDir, 'services'));
  return files.map(parseFile).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getService(slug: string) {
  const services = getAllServices();
  return services.find(s => s.slug === slug);
}

export function getAllCaseStudies() {
  const files = getAllFiles(path.join(contentDir, 'case-studies'));
  return files.map(parseFile).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getCaseStudiesForService(serviceSlug: string) {
  const caseStudies = getAllCaseStudies();
  return caseStudies.filter(cs => cs.serviceSlug === serviceSlug);
}

export function getAllFAQs() {
  const files = getAllFiles(path.join(contentDir, 'faqs'));
  return files.map(parseFile).sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getFAQsForService(serviceSlug: string) {
  const faqs = getAllFAQs();
  return faqs.filter(f => f.serviceSlug === serviceSlug);
}

// Journal functions
export interface JournalArticle {
  slug: string;
  title: string;
  excerpt: string;
  type: 'essay' | 'ritual' | 'confession' | 'summoning';
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
  const files = getAllFiles(path.join(contentDir, 'journal'));
  return files
    .map(parseFile)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getJournalArticle(slug: string): JournalArticle | undefined {
  const articles = getAllJournalArticles();
  return articles.find(a => a.slug === slug);
}

export function getJournalArticlesByType(type: JournalArticle['type']): JournalArticle[] {
  const articles = getAllJournalArticles();
  return articles.filter(a => a.type === type);
}

export function getFeaturedJournalArticles(): JournalArticle[] {
  const articles = getAllJournalArticles();
  return articles.filter(a => a.featured);
}

export function getJournalArticlesForStaticParams() {
  return getAllJournalArticles().map(a => ({ slug: a.slug }));
}

export function generateStaticParams() {
  return getAllServices().map(s => ({ slug: s.slug }));
}