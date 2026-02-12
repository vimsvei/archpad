import { createNextMetadata } from '@/lib/next-metadata';
import { DesignPartnerProgram } from '@/components/pages/design-partner-program';

export const metadata = createNextMetadata('/design-partner-program');

export default function DesignPartnerProgramPage() {
  return <DesignPartnerProgram />;
}
