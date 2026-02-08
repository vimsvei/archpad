import './globals.css';
import { cookies } from 'next/headers';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://archpad.pro';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ArchPad — платформа для архитектурных артефактов',
    template: '%s | ArchPad',
  },
  description:
    'Репозиторий проектов, справочники, решения — работа с архитектурными артефактами в единой среде.',
  keywords: ['архитектура', 'enterprise', 'репозиторий', 'ArchiMate', 'EA'],
  authors: [{ name: 'ArchPad' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteUrl,
    siteName: 'ArchPad',
    title: 'ArchPad — платформа для архитектурных артефактов',
    description:
      'Репозиторий проектов, справочники, решения — работа с архитектурными артефактами в единой среде.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArchPad — платформа для архитектурных артефактов',
    description:
      'Репозиторий проектов, справочники, решения — работа с архитектурными артефактами в единой среде.',
  },
};

const LOCALE_TO_LANG: Record<string, string> = {
  'ru-RU': 'ru',
  en: 'en',
  'es-ES': 'es',
  sr: 'sr',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const cookieStore = await cookies();
  const locale = cookieStore.get('archpad_locale')?.value ?? 'en';
  const lang = LOCALE_TO_LANG[locale] ?? 'en';

  return (
    <html lang={lang} suppressHydrationWarning className={roboto.variable}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
