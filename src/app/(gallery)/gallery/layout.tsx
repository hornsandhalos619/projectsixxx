import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Sanctum',
  description: 'Dark sensual gallery showcasing digital art, photography, generative works, and commissions. Enter the realm where luxury bleeds into the profane.',
  openGraph: {
    title: 'The Sanctum — Projectsixxx Gallery',
    description: 'Dark sensual gallery showcasing digital art, photography, generative works, and commissions.',
    type: 'website',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}