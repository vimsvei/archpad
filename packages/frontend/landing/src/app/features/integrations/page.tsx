import { createNextMetadata } from '@/lib/next-metadata';
import { FeatureIntegrations } from '@/components/pages/feature-integrations';

export const metadata = createNextMetadata('/features/integrations');

export default function FeatureIntegrationsPage() {
  return <FeatureIntegrations />;
}
