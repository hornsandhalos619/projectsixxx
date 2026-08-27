import { Metadata } from 'next';
import { CommissionPortal } from '@/components/gallery/CommissionPortal';

export const metadata: Metadata = {
  title: 'Commission Portal',
  description: 'Summon a custom work. Multi-step brief builder with tiered pricing, contract e-signature, and progress tracking.',
  openGraph: {
    title: 'Commission Portal — The Sanctum',
    description: 'Summon a custom work. Multi-step brief builder with tiered pricing, contract e-signature, and progress tracking.',
    type: 'website',
  },
};

export default function CommissionsPage() {
  return <CommissionPortal />;
}