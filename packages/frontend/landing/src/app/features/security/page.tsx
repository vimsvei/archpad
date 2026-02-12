import { createNextMetadata } from '@/lib/next-metadata';
import { FeatureSecurity } from '@/components/pages/feature-security';

export const metadata = createNextMetadata('/features/security');

export default function FeatureSecurityPage() {
  return <FeatureSecurity />;
}
