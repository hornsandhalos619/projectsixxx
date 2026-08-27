import { Metadata } from 'next';
import { GalleryPage } from '@/components/gallery/GalleryPage';

export const metadata: Metadata = {
  title: 'Dark Photography',
  description: 'Dark photography — shadows captured, souls exposed. Explore the photographic sanctum.',
  openGraph: {
    title: 'Dark Photography — The Sanctum',
    description: 'Dark photography — shadows captured, souls exposed.',
    type: 'website',
  },
};

export default function PhotographyGalleryPage() {
  return <GalleryPage category="photography" />;
}