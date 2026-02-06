'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {CachePublicRecord, TolgeeProvider, TolgeeStaticData} from "@tolgee/react";
import {DEFAULT_LANGUAGE, TolgeeBase} from "@/tolgee/shared";

type TolgeeNextProviderProps = {
  language: string;
  /**
   * Optional SSR hydration data.
   * In our setup we load translations dynamically from Tolgee API on the client,
   * so `staticData` is usually not provided.
   */
  staticData?: TolgeeStaticData | CachePublicRecord[];
  children: React.ReactNode;
};

const tolgee = TolgeeBase().init({ defaultLanguage: DEFAULT_LANGUAGE });

export const TolgeeNextProvider = ({ language, staticData, children }: TolgeeNextProviderProps) => {
  const router = useRouter();
  
  useEffect(() => {
    // Ensure Tolgee is on the correct language for current route.
    // (We don't rely on SSR staticData in local/dev setups.)
    void tolgee.changeLanguage(language);

    // this ensures server components refresh, after translation change
    const { unsubscribe } = tolgee.on('permanentChange', () => {
      router.refresh();
    });
    return () => unsubscribe();
  }, [tolgee, router]);
  
  return (
    <TolgeeProvider
      tolgee={tolgee}
      fallback="Loading"
      ssr={staticData ? { language, staticData } : undefined}
    >
      {children}
    </TolgeeProvider>
  );
}
