'use client';

import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {CachePublicRecord, TolgeeProvider, TolgeeStaticData} from "@tolgee/react";
import {TolgeeBase} from "@/tolgee/shared";

type TolgeeNextProviderProps = {
  language: string;
  staticData: TolgeeStaticData | CachePublicRecord[];
  children: React.ReactNode;
};

const tolgee = TolgeeBase().init();

export const TolgeeNextProvider = ({ language, staticData, children }: TolgeeNextProviderProps) => {
  const router = useRouter();
  
  useEffect(() => {
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
      ssr={{ language, staticData }}
    >
      {children}
    </TolgeeProvider>
  );
}
