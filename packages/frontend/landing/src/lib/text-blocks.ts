import { textBlocks } from '@/content';

export type TextBlock = (typeof textBlocks)[0];

export function getTextBlockBySlug(slug: string): TextBlock | undefined {
  return textBlocks.find((block) => block.slug === slug);
}

export function getAllTextBlocks(): TextBlock[] {
  return textBlocks;
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

// Utility to safely access metadata
export function getMetadata(block: TextBlock | undefined, key: string): string {
  if (!block || !block.metadata) return '';
  const value = getByPath(block.metadata, key);
  return typeof value === 'string' ? value : '';
}

export function getMetadataValue<T>(
  block: TextBlock | undefined,
  key: string,
  fallback: T,
): T {
  if (!block || !block.metadata) return fallback;
  const value = getByPath(block.metadata, key);
  return (value as T) ?? fallback;
}
