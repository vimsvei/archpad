import { createNextMetadata } from '@/lib/next-metadata';
import { FeatureTeamCollaboration } from '@/components/pages/feature-team-collaboration';

export const metadata = createNextMetadata('/features/team-collaboration');

export default function FeatureTeamCollaborationPage() {
  return <FeatureTeamCollaboration />;
}
