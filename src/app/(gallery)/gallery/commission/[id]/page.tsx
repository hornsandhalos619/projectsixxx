import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CommissionTracking } from '@/components/gallery/CommissionTracking';

interface CommissionPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CommissionPageProps): Promise<Metadata> {
  const { id } = await params;
  
  return {
    title: `Commission #${id}`,
    description: `Track the progress of your commission covenant. Milestones, messages, and delivery.`,
    openGraph: {
      title: `Commission #${id} — Tracking`,
      description: `Track the progress of your commission covenant.`,
      type: 'website',
    },
  };
}

export default async function CommissionPage({ params }: CommissionPageProps) {
  const { id } = await params;
  
  // In production, verify the commission exists and user has access
  // For now, we'll show the tracking page
  return <CommissionTracking commissionId={id} />;
}