import { Metadata } from 'next';
import { GalleryPage } from '@/components/gallery/GalleryPage';

export const metadata: Metadata = {
  title: 'Generative Works',
  description: 'AI and generative art — algorithms dreaming in darkness. Explore the generative sanctum.',
  openGraph: {
    title: 'Generative Works — The Sanctum',
    description: 'AI and generative art — algorithms dreaming in darkness.',
    type: 'website',
  },
};

export default function GenerativeGalleryPage() {
  return <GalleryPage category="generative" />;
}