import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import '@/styles/index.css';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { getPageMetadata, siteMetadata } from '@/lib/metadata';

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const homeMeta = getPageMetadata('/');

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: homeMeta.title,
  description: homeMeta.description,
  keywords: homeMeta.keywords
    ?.split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean),
  openGraph: {
    title: homeMeta.title,
    description: homeMeta.description,
    type: 'website',
    siteName: siteMetadata.siteName,
    locale: siteMetadata.locale,
    images: [siteMetadata.defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
    title: homeMeta.title,
    description: homeMeta.description,
    images: [siteMetadata.defaultImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
