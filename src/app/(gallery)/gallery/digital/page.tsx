import { Metadata } from 'next';
import { GalleryPage } from '@/components/gallery/GalleryPage';

export const metadata: Metadata = {
  title: 'Digital Art',
  description: 'Dark digital artworks — where pixels bleed into poetry. Explore the digital sanctum.',
  openGraph: {
    title: 'Digital Art — The Sanctum',
    description: 'Dark digital artworks — where pixels bleed into poetry.',
    type: 'website',
  },
};

export default function DigitalGalleryPage() {
  return <GalleryPage category="digital" />;
}