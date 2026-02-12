'use client';

import { Link } from 'react-router';
import type { ComponentType, SVGProps } from 'react';
import { ArrowLeft } from 'lucide-react';

type RelatedLink = {
  to: string;
  label: string;
};

type LegalDocumentPageProps = {
  title: string;
  lastUpdated: string;
  contentHtml: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: string | number }>;
  relatedLinks: RelatedLink[];
  backLinkText: string;
  lastUpdatedLabel: string;
  relatedLinksTitle: string;
};

export function LegalDocumentPage({
  title,
  lastUpdated,
  contentHtml,
  icon: Icon,
  relatedLinks,
  backLinkText,
  lastUpdatedLabel,
  relatedLinksTitle,
}: LegalDocumentPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F1F8E9] to-white">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#7CB342] transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            {backLinkText}
          </Link>
          <div className="flex items-center gap-3">
            <Icon className="text-[#7CB342]" size={40} />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600 mt-2">
                {lastUpdatedLabel}: {lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div
            className="max-w-none text-gray-700 leading-relaxed [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:text-gray-700 [&_strong]:text-gray-900 [&_a]:text-[#7CB342] [&_a:hover]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-yellow-400 [&_blockquote]:bg-yellow-50 [&_blockquote]:pl-4 [&_blockquote]:py-2"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <section className="pt-6 border-t mt-8">
            <p className="text-sm text-gray-600 mb-3">{relatedLinksTitle}</p>
            <div className="flex flex-wrap gap-4">
              {relatedLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[#7CB342] hover:underline font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
