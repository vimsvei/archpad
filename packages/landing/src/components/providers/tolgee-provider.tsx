'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CachePublicRecord, TolgeeProvider, TolgeeStaticData } from '@tolgee/react';
import { TolgeeBase } from '@/tolgee/shared';

type TolgeeLandingProviderProps = {
  language: string;
  /**
   * Server-prefetched translations (loadRequired at request time).
   * Avoids client fetch and CORS; works without build-time env vars.
   */
  staticData?: TolgeeStaticData | CachePublicRecord[];
  children: React.ReactNode;
};

const tolgee = TolgeeBase().init({ defaultLanguage: 'en' });

export function TolgeeLandingProvider({ language, staticData, children }: TolgeeLandingProviderProps) {
  const router = useRouter();

  useEffect(() => {
    void tolgee.changeLanguage(language);

    const { unsubscribe } = tolgee.on('permanentChange', () => {
      router.refresh();
    });
    return () => unsubscribe();
  }, [language, router]);

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
