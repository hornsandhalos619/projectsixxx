import { defineDocumentType, makeSource } from "contentlayer/source-files";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const Service = defineDocumentType(() => ({
  name: "Service",
  filePathPattern: `services/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    shortTitle: { type: "string", required: true },
    icon: { type: "string", required: true },
    tagline: { type: "string", required: true },
    description: { type: "string", required: true },
    valueProp: { type: "string", required: true },
    category: { type: "string", required: true },
    tierPricing: {
      type: "json",
      required: true,
    },
    leadMagnet: {
      type: "json",
      required: true,
    },
    calendlyUrl: { type: "string", required: true },
    featured: { type: "boolean", default: false },
    order: { type: "number", required: true },
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/services/${doc['slug']}` },
    bookUrl: { type: "string", resolve: (doc) => `/services/${doc['slug']}/book` },
    grimoireUrl: { type: "string", resolve: (doc) => `/services/grimoire/${doc['slug']}` },
  },
}));

export const CaseStudy = defineDocumentType(() => ({
  name: "CaseStudy",
  filePathPattern: `case-studies/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    serviceSlug: { type: "string", required: true },
    client: { type: "string", required: true },
    industry: { type: "string", required: true },
    challenge: { type: "string", required: true },
    solution: { type: "string", required: true },
    results: { type: "json", required: true },
    metrics: { type: "json", required: true },
    testimonial: {
      type: "json",
      required: true,
    },
    featured: { type: "boolean", default: false },
    order: { type: "number", required: true },
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/case-studies/${doc['slug']}` },
  },
}));

export const FAQ = defineDocumentType(() => ({
  name: "FAQ",
  filePathPattern: `faqs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: { type: "string", required: true },
    serviceSlug: { type: "string", required: true },
    question: { type: "string", required: true },
    answer: { type: "string", required: true },
    confession: { type: "string", required: false },
    order: { type: "number", required: true },
  },
}));

export const JournalArticle = defineDocumentType(() => ({
  name: "JournalArticle",
  filePathPattern: `journal/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    type: { 
      type: "string", 
      required: true,
      options: ["essay", "ritual", "confession", "summoning"]
    },
    author: { type: "string", required: true },
    authorRole: { type: "string", required: false },
    tags: { type: "list", of: { type: "string" }, required: false },
    featured: { type: "boolean", default: false },
    publishedAt: { type: "date", required: true },
    updatedAt: { type: "date", required: false },
    readTime: { type: "number", required: true },
    coverImage: { type: "string", required: false },
    coverAlt: { type: "string", required: false },
    seoTitle: { type: "string", required: false },
    seoDescription: { type: "string", required: false },
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/journal/${doc['slug']}` },
    typeLabel: { 
      type: "string", 
      resolve: (doc) => {
        const labels: Record<string, string> = {
          essay: "Essay",
          ritual: "Ritual",
          confession: "Confession",
          summoning: "Summoning"
        };
        return labels[doc['type']] || doc['type'];
      }
    },
  },
}));

export default makeSource({
  contentDirPath: path.resolve(__dirname, "src/content"),
  documentTypes: [Service, CaseStudy, FAQ, JournalArticle],
  disableImportAliasWarning: true,
});