import { createNextMetadata } from '@/lib/next-metadata';
import { Register } from '@/components/pages/register';

export const metadata = createNextMetadata('/register');

export default function RegisterPage() {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
  return <Register turnstileSiteKey={turnstileSiteKey} />;
}
