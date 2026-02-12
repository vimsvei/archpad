'use client';

import { Shield } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { getLegalDocumentBySlug } from '@/lib/legal';
import { LegalDocumentPage } from '@/components/legal-document-page';
import {
  getTextBlockBySlug,
  getMetadata,
  getMetadataValue,
} from '@/lib/text-blocks';

export function PrivacyPolicy() {
  usePageMeta();
  const doc = getLegalDocumentBySlug('privacy');
  const notFound = getLegalDocumentBySlug('not-found');
  const pageContent = getTextBlockBySlug('privacy-policy-page');
  const relatedLinks = getMetadataValue<Array<{ to: string; label: string }>>(
    pageContent,
    'relatedLinks',
    [],
  );

  if (!doc) {
    return (
      <div>{notFound?.title ?? getMetadata(pageContent, 'notFoundTitle')}</div>
    );
  }

  return (
    <LegalDocumentPage
      title={doc.title}
      lastUpdated={doc.lastUpdated}
      contentHtml={doc.content}
      icon={Shield}
      relatedLinks={relatedLinks}
      backLinkText={getMetadata(pageContent, 'backLink')}
      lastUpdatedLabel={getMetadata(pageContent, 'lastUpdatedLabel')}
      relatedLinksTitle={getMetadata(pageContent, 'relatedLinksTitle')}
    />
  );
}
