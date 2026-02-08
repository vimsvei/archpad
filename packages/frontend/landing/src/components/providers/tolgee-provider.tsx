'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { CachePublicRecord, TolgeeProvider, TolgeeStaticData } from '@tolgee/react';
import { TolgeeBase } from '@/tolgee/shared';

type TolgeeLandingProviderProps = {
  language: string;
  /**
   * Server-prefetched translations (loadRequired at request time).
   * Data from Tolgee API, NOT from JSON files. Passed to avoid client fetch.
   */
  staticData?: TolgeeStaticData | CachePublicRecord[];
  children: React.ReactNode;
};

export function TolgeeLandingProvider({ language, staticData, children }: TolgeeLandingProviderProps) {
  const router = useRouter();

  // Create tolgee with correct language from the start for SSR.
  const tolgee = useMemo(() => {
    const t = TolgeeBase().init({
      defaultLanguage: language,
      language,
    });
    return t;
  }, []);

  useEffect(() => {
    void tolgee.changeLanguage(language);

    const { unsubscribe } = tolgee.on('permanentChange', () => {
      router.refresh();
    });
    return () => unsubscribe();
  }, [language, router, tolgee]);

  return (
    <TolgeeProvider
      tolgee={tolgee}
      fallback={null}
      ssr={staticData ? { language, staticData } : undefined}
    >
      {children}
    </TolgeeProvider>
  );
}
