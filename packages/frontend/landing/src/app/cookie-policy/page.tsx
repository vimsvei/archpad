import { createNextMetadata } from '@/lib/next-metadata';
import { CookiePolicy } from '@/components/pages/cookie-policy';

export const metadata = createNextMetadata('/cookie-policy');

export default function CookiePolicyPage() {
  return <CookiePolicy />;
}
