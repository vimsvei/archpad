import type { Metadata } from 'next';
import { getPageMetadata, siteMetadata } from './metadata';

export function createNextMetadata(pathname: string): Metadata {
  const meta = getPageMetadata(pathname);
  const keywords = meta.keywords
    ?.split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  return {
    title: meta.title,
    description: meta.description,
    keywords,
    authors: [{ name: siteMetadata.siteName }],
    robots: 'index, follow',
    alternates: { canonical: pathname },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: (meta.ogType as 'website' | 'article') ?? 'website',
      url: pathname,
      siteName: siteMetadata.siteName,
      locale: siteMetadata.locale,
      images: [meta.ogImage || siteMetadata.defaultImage],
    },
    twitter: {
      card: meta.twitterCard || 'summary_large_image',
      title: meta.title,
      description: meta.description,
      site: siteMetadata.twitterHandle,
      images: [meta.ogImage || siteMetadata.defaultImage],
    },
  };
}
