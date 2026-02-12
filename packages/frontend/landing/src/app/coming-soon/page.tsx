import { createNextMetadata } from '@/lib/next-metadata';
import { ComingSoon } from '@/components/pages/coming-soon';

export const metadata = createNextMetadata('/coming-soon');

export default function ComingSoonPage() {
  return <ComingSoon />;
}
