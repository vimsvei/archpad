'use client';

import { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  getPageMetadata,
  siteMetadata,
  type PageMetadata,
} from '@/lib/metadata';

export function usePageMeta(customMeta?: Partial<PageMetadata>) {
  const location = useLocation();

  useEffect(() => {
    const defaultMeta = getPageMetadata(location.pathname);
    const meta = { ...defaultMeta, ...customMeta };

    // Update title
    document.title = meta.title;

    // Helper function to set or update meta tag
    const setMetaTag = (
      property: string,
      content: string,
      isProperty = false,
    ) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMetaTag('description', meta.description);
    if (meta.keywords) {
      setMetaTag('keywords', meta.keywords);
    }

    // Open Graph tags
    setMetaTag('og:title', meta.title, true);
    setMetaTag('og:description', meta.description, true);
    setMetaTag('og:type', meta.ogType || 'website', true);
    setMetaTag('og:url', `${siteMetadata.siteUrl}${location.pathname}`, true);
    setMetaTag('og:site_name', siteMetadata.siteName, true);
    setMetaTag('og:locale', siteMetadata.locale, true);
    setMetaTag('og:image', meta.ogImage || siteMetadata.defaultImage, true);

    // Twitter Card tags
    setMetaTag('twitter:card', meta.twitterCard || 'summary_large_image');
    setMetaTag('twitter:site', siteMetadata.twitterHandle);
    setMetaTag('twitter:title', meta.title);
    setMetaTag('twitter:description', meta.description);
    setMetaTag('twitter:image', meta.ogImage || siteMetadata.defaultImage);

    // Additional meta tags for better SEO
    setMetaTag('robots', 'index, follow');
    setMetaTag('author', siteMetadata.siteName);

    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute(
      'href',
      `${siteMetadata.siteUrl}${location.pathname}`,
    );
  }, [location.pathname, customMeta]);
}
