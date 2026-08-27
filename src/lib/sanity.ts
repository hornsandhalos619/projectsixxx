import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(sanityConfig);

export const previewClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getClient = (preview = false) => (preview ? previewClient : sanityClient);

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function urlForPreview(source: SanityImageSource) {
  return imageUrlBuilder(previewClient).image(source);
}

// GROQ query helpers
export const groq = String.raw;

export const sanityQueries = {
  // Home page
  hero: groq`*[_type == "hero"][0]{
    headline,
    subheadline,
    ctaText,
    ctaHref,
    backgroundVideo,
    particleConfig
  }`,

  portals: groq`*[_type == "portal"] | order(order asc) {
    title,
    description,
    icon,
    href,
    thumbnail,
    hoverEffect
  }`,

  activityFeed: groq`*[_type in ["order", "galleryWork", "journalPost"]] | order(_createdAt desc)[0..9]{
    _type,
    _createdAt,
    title,
    slug,
    thumbnail,
    author->{
      name,
      username,
      image
    }
  }`,

  // Shop
  products: groq`*[_type == "product" && isActive == true] | order(_createdAt desc) {
    _id,
    handle,
    title,
    description,
    vendor,
    price,
    compareAtPrice,
    currency,
    images,
    featuredImage,
    tags,
    bloodType,
    variants[]{
      title,
      sku,
      price,
      inventory,
      option1,
      option2,
      option3,
      image
    }
  }`,

  productByHandle: (handle: string) => groq`*[_type == "product" && handle == $handle && isActive == true][0]{
    _id,
    handle,
    title,
    description,
    vendor,
    price,
    compareAtPrice,
    currency,
    images,
    featuredImage,
    tags,
    bloodType,
    variants[]{
      title,
      sku,
      price,
      inventory,
      option1,
      option2,
      option3,
      image
    }
  }`,

  // Services
  services: groq`*[_type == "service" && isActive == true] | order(sortOrder asc) {
    _id,
    handle,
    title,
    shortDesc,
    description,
    icon,
    category,
    tierPricing,
    features,
    process,
    caseStudies,
    faq,
    leadMagnet,
    leadMagnetUrl,
    calendlyUrl,
    isFeatured
  }`,

  serviceByHandle: (handle: string) => groq`*[_type == "service" && handle == $handle && isActive == true][0]{
    _id,
    handle,
    title,
    shortDesc,
    description,
    icon,
    category,
    tierPricing,
    features,
    process,
    caseStudies,
    faq,
    leadMagnet,
    leadMagnetUrl,
    calendlyUrl
  }`,

  // Gallery
  galleryWorks: groq`*[_type == "galleryWork" && isPublished == true] | order(publishedAt desc) {
    _id,
    handle,
    title,
    description,
    artist->{
      name,
      username,
      image
    },
    category,
    images,
    thumbnail,
    tags,
    isForSale,
    printPrice,
    originalPrice,
    isNft,
    views,
    likes,
    isFeatured,
    publishedAt
  }`,

  galleryWorkByHandle: (handle: string) => groq`*[_type == "galleryWork" && handle == $handle && isPublished == true][0]{
    _id,
    handle,
    title,
    description,
    artist->{
      name,
      username,
      image,
      bio
    },
    category,
    images,
    thumbnail,
    tags,
    isForSale,
    printPrice,
    originalPrice,
    isNft,
    nftContract,
    nftTokenId,
    nftChain,
    views,
    likes,
    isFeatured,
    publishedAt
  }`,

  // Journal
  journalPosts: groq`*[_type == "journalPost" && isPublished == true] | order(publishedAt desc) {
    _id,
    handle,
    title,
    excerpt,
    type,
    category,
    tags,
    author->{
      name,
      username,
      image
    },
    featuredImage,
    readingTime,
    views,
    likes,
    isFeatured,
    publishedAt
  }`,

  journalPostByHandle: (handle: string) => groq`*[_type == "journalPost" && handle == $handle && isPublished == true][0]{
    _id,
    handle,
    title,
    excerpt,
    content,
    type,
    category,
    tags,
    author->{
      name,
      username,
      image,
      bio
    },
    featuredImage,
    seoTitle,
    seoDescription,
    readingTime,
    views,
    likes,
    isFeatured,
    publishedAt
  }`,

  // Site settings
  siteSettings: groq`*[_type == "siteSettings"][0]{
    siteName,
    siteDescription,
    defaultSeoImage,
    socialLinks,
    footerLinks,
    newsletterSettings
  }`,
};

// Helper to fetch with preview support
export async function fetchSanity<T>(
  query: string,
  params?: Record<string, unknown>,
  preview = false
): Promise<T | null> {
  const client = getClient(preview);
  return client.fetch<T>(query, params);
}

// Image optimization
export function getImageUrl(source: SanityImageSource, options?: { width?: number; height?: number; quality?: number; fit?: "clip" | "crop" | "fill" | "max" }) {
  let url = urlFor(source);
  if (options?.width) url = url.width(options.width);
  if (options?.height) url = url.height(options.height);
  if (options?.quality) url = url.quality(options.quality);
  if (options?.fit) url = url.fit(options.fit);
  return url.auto("format").url();
}