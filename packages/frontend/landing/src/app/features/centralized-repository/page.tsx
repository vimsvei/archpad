import { createNextMetadata } from '@/lib/next-metadata';
import { FeatureCentralizedRepository } from '@/components/pages/feature-centralized-repository';

export const metadata = createNextMetadata('/features/centralized-repository');

export default function FeatureCentralizedRepositoryPage() {
  return <FeatureCentralizedRepository />;
}
