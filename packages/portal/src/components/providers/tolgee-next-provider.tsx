'use client';

import React from "react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {TolgeeProvider} from "@tolgee/react";
import {TolgeeBase} from "@/tolgee/shared";

type TolgeeNextProviderProps = {
  language: string;
  children: React.ReactNode;
};

export const TolgeeNextProvider = ({ language, children }: TolgeeNextProviderProps) => {
  const router = useRouter();
  
  // Инициализируем Tolgee с правильным языком
  // Tolgee загружает переводы динамически через API на клиенте
  const tolgee = React.useMemo(() => {
    const instance = TolgeeBase().init({
      language,
      // Не передаем staticData - переводы загружаются динамически через API
    });
    return instance;
  }, [language]);
  
  useEffect(() => {
    // Устанавливаем язык при изменении
    if (tolgee.getLanguage() !== language) {
      tolgee.changeLanguage(language);
    }
    
    // Логирование для отладки (только на клиенте)
    if (typeof window !== 'undefined') {
      console.log('[Tolgee Client] Initialized with language:', language);
      
      // Проверяем конфигурацию Tolgee
      const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;
      console.log('[Tolgee Client] Config check:', {
        apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET',
        apiUrl: apiUrl || 'NOT SET',
        language: tolgee.getLanguage(),
        isInitialized: tolgee.isLoaded(),
      });
      
      // Загружаем переводы динамически через Tolgee API
      // Это позволяет получать актуальные переводы без пересборки приложения
      console.log('[Tolgee Client] Loading translations dynamically from API...');
      tolgee.run().then(() => {
        console.log('[Tolgee Client] Translations loaded, current language:', tolgee.getLanguage());
        console.log('[Tolgee Client] Is loaded:', tolgee.isLoaded());
        
        // Логируем загруженные переводы
        const translations = tolgee.getTranslations();
        if (translations && typeof translations === 'object') {
          const keys = Object.keys(translations).slice(0, 5);
          console.log('[Tolgee Client] Loaded translation keys (sample):', keys);
          console.log('[Tolgee Client] Total translations loaded:', Object.keys(translations).length);
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
  }, [tolgee, router, language]);
  
  return (
    <TolgeeProvider
      tolgee={tolgee}
      fallback="Loading"
    >
      {children}
    </TolgeeProvider>
  );
}
