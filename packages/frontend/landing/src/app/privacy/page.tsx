import { createNextMetadata } from '@/lib/next-metadata';
import { PrivacyPolicy } from '@/components/pages/privacy-policy';

export const metadata = createNextMetadata('/privacy');

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}
