import { createNextMetadata } from '@/lib/next-metadata';
import { Contact } from '@/components/pages/contact';

export const metadata = createNextMetadata('/contact');

export default function ContactPage() {
  return <Contact />;
}
