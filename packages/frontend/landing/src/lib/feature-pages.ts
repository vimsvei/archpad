import { featurePages } from '@/content';

export type FeaturePage = (typeof featurePages)[0];

export function getFeaturePageBySlug(slug: string): FeaturePage | undefined {
  return featurePages.find((page) => page.slug === slug);
}

function getByPath(data: Record<string, any>, key: string): any {
  if (!key.includes('.')) {
    return data[key];
  }

  return key.split('.').reduce<any>((acc, part) => {
    if (acc === null || acc === undefined) return undefined;
    return acc[part];
  }, data);
}

export function getFeaturePageMetadata(
  page: FeaturePage | undefined,
  key: string,
): string {
  if (!page || !page.metadata) return '';
  const value = getByPath(page.metadata, key);
  return typeof value === 'string' ? value : '';
}

export function getFeaturePageMetadataValue<T>(
  page: FeaturePage | undefined,
  key: string,
  fallback: T,
): T {
  if (!page || !page.metadata) return fallback;
  const value = getByPath(page.metadata, key);
  return (value as T) ?? fallback;
}
