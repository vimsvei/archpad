'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { TolgeeProvider } from '@tolgee/react';
import { TolgeeBase } from '@/tolgee/shared';

type TolgeeLandingProviderProps = {
  language: string;
  children: React.ReactNode;
};

const tolgee = TolgeeBase().init({ defaultLanguage: 'en' });

export function TolgeeLandingProvider({ language, children }: TolgeeLandingProviderProps) {
  const router = useRouter();

  useEffect(() => {
    void tolgee.changeLanguage(language);

    const { unsubscribe } = tolgee.on('permanentChange', () => {
      router.refresh();
    });
    return () => unsubscribe();
  }, [language, router]);

  return (
    <TolgeeProvider tolgee={tolgee} fallback={null}>
      {children}
    </TolgeeProvider>
  );
}
