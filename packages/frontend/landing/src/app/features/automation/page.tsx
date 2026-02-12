import { createNextMetadata } from '@/lib/next-metadata';
import { FeatureAutomation } from '@/components/pages/feature-automation';

export const metadata = createNextMetadata('/features/automation');

export default function FeatureAutomationPage() {
  return <FeatureAutomation />;
}
