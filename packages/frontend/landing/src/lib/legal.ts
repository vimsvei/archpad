import { legalDocuments } from '@/content';

export type LegalDocument = (typeof legalDocuments)[0];

export function getLegalDocumentBySlug(
  slug: string,
): LegalDocument | undefined {
  return legalDocuments.find((doc) => doc.slug === slug);
}

export function getAllLegalDocuments(): LegalDocument[] {
  return legalDocuments;
}
