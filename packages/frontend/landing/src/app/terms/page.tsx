import { createNextMetadata } from '@/lib/next-metadata';
import { TermsOfService } from '@/components/pages/terms-of-service';

export const metadata = createNextMetadata('/terms');

export default function TermsPage() {
  return <TermsOfService />;
}
