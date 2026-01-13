'use client';

import React from "react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {CachePublicRecord, TolgeeProvider, TolgeeStaticData} from "@tolgee/react";
import {TolgeeBase} from "@/tolgee/shared";

type TolgeeNextProviderProps = {
  language: string;
  staticData: TolgeeStaticData | CachePublicRecord[];
  children: React.ReactNode;
};

export const TolgeeNextProvider = ({ language, staticData, children }: TolgeeNextProviderProps) => {
  const router = useRouter();
  
  // Инициализируем Tolgee с правильным языком и статическими данными
  const tolgee = React.useMemo(() => {
    return TolgeeBase().init({
      language,
      staticData: staticData || [],
    });
  }, [language, staticData]);
  
  useEffect(() => {
    // Устанавливаем язык при изменении
    if (tolgee.getLanguage() !== language) {
      tolgee.changeLanguage(language);
    }
    
    // Логирование для отладки (только на клиенте)
    if (typeof window !== 'undefined') {
      console.log('[Tolgee Client] Initialized with language:', language);
      console.log('[Tolgee Client] Static data records:', staticData?.length || 0);
      
      // Проверяем конфигурацию Tolgee
      const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;
      console.log('[Tolgee Client] Config check:', {
        apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET',
        apiUrl: apiUrl || 'NOT SET',
        language: tolgee.getLanguage(),
        isInitialized: tolgee.isLoaded(),
      });
      
      // Проверяем, загружены ли переводы
      tolgee.run().then(() => {
        console.log('[Tolgee Client] Translations loaded, current language:', tolgee.getLanguage());
        console.log('[Tolgee Client] Is loaded:', tolgee.isLoaded());
        // Логируем информацию о статических данных (SSR)
        if (staticData && Array.isArray(staticData) && staticData.length > 0) {
          const sampleKeys = staticData.slice(0, 5).map((record: any) => 
            record.key || record.namespace?.key || 'unknown'
          );
          console.log('[Tolgee Client] Static data keys (sample):', sampleKeys);
          console.log('[Tolgee Client] Total static data records:', staticData.length);
          
          // Логируем значения переводов из staticData
          const translations: Record<string, any> = {};
          staticData.slice(0, 5).forEach((record: any) => {
            if (record && typeof record === 'object') {
              const key = record.key || record.namespace?.key || 'unknown';
              const value = record.translation || record.value || record.text || JSON.stringify(record).substring(0, 100);
              translations[key] = value;
            }
          });
          console.log('[Tolgee Client] Static data translation values (sample):', translations);
          
          // Тестируем получение переводов через Tolgee API
          try {
            sampleKeys.slice(0, 3).forEach((key: string) => {
              if (key !== 'unknown') {
                // Пробуем разные способы получить перевод
                const translation = (tolgee as any).translate?.(key) || (tolgee as any).t?.(key) || key;
                console.log(`[Tolgee Client] Translation test for "${key}":`, translation);
              }
            });
          } catch (e) {
            console.warn('[Tolgee Client] Could not test translations:', e);
          }
        } else {
          console.warn('[Tolgee Client] No static data provided from SSR');
        }
      }).catch((error) => {
        console.error('[Tolgee Client] Failed to load translations:', error);
      });
    }
    
    // this ensures server components refresh, after translation change
    const { unsubscribe } = tolgee.on('permanentChange', () => {
      router.refresh();
    });
    return () => unsubscribe();
  }, [tolgee, router, language, staticData]);
  
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
