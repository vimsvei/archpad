import { createNextMetadata } from '@/lib/next-metadata';
import { Pricing } from '@/components/pages/pricing';

export const metadata = createNextMetadata('/pricing');

export default function PricingPage() {
  return <Pricing />;
}
