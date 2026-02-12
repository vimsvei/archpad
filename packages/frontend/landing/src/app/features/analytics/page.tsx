import { createNextMetadata } from '@/lib/next-metadata';
import { FeatureAnalytics } from '@/components/pages/feature-analytics';

export const metadata = createNextMetadata('/features/analytics');

export default function FeatureAnalyticsPage() {
  return <FeatureAnalytics />;
}
