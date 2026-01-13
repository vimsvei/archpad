import {getTolgee} from "@/tolgee/server";
import ApplicationProvider from "@/components/providers/application-provider";
import {TolgeeNextProvider} from "@/components/providers/tolgee-next-provider";
import {ALL_LANGUAGES} from "@/tolgee/shared";
import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import { ToasterHost } from "@/components/layouts/toaster-host";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  
  const { locale } = await params;
  if (!ALL_LANGUAGES.includes(locale)) notFound();
  
  let records: any = [];
  try {
    const tolgee = await getTolgee();
    
    // Логируем конфигурацию Tolgee на сервере (только один раз)
    if (typeof (globalThis as any).__tolgee_config_logged === 'undefined') {
      (globalThis as any).__tolgee_config_logged = true;
      const apiKey = process.env.NEXT_PUBLIC_TOLGEE_API_KEY;
      const apiUrl = process.env.NEXT_PUBLIC_TOLGEE_API_URL;
      console.log('[Tolgee SSR] Configuration:', {
        apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET',
        apiUrl: apiUrl || 'NOT SET',
        language: locale,
      });
    }
    
    // loadRequired() загружает только переводы, которые используются в коде
    // Если загружается меньше переводов, чем ожидается, это может означать:
    // 1. Не все переводы используются в коде
    // 2. Переводы используются динамически и не определяются статическим анализом
    // 3. Переводы не правильно помечены как "required"
    records = await tolgee.loadRequired();
    
    // Логируем только один раз при первом запросе (используем статическую переменную)
    // Это предотвращает избыточное логирование при каждом рендере
    if (typeof (globalThis as any).__tolgee_logged === 'undefined') {
      (globalThis as any).__tolgee_logged = true;
      console.log(`[Tolgee SSR] Loaded ${records.length} translation record(s) for locale: ${locale}`);
      
      // Детальное логирование структуры записей и значений
      if (records.length > 0) {
        console.log(`[Tolgee SSR] First record structure:`, JSON.stringify(records[0], null, 2).substring(0, 500));
        
        // Логируем ключи переводов
        const sampleKeys = records.slice(0, 10).map((r: any) => {
          if (typeof r === 'string') return r;
          return r.key || r.namespace?.key || r.namespace || JSON.stringify(r).substring(0, 50);
        });
        console.log(`[Tolgee SSR] Sample translation keys (first 10):`, sampleKeys);
        
        // Логируем фактические значения переводов (ключ -> значение)
        // Пробуем извлечь значения из записей
        const translations: Record<string, any> = {};
        records.slice(0, 10).forEach((record: any) => {
          if (record && typeof record === 'object') {
            // Пробуем разные форматы записей Tolgee
            const key = record.key || record.namespace?.key || record.name || 'unknown';
            const value = record.translation || record.value || record.text || record;
            translations[key] = typeof value === 'string' ? value : JSON.stringify(value).substring(0, 100);
          }
        });
        console.log(`[Tolgee SSR] Sample translation values (first 10):`, translations);
        
        // Пробуем получить переводы через Tolgee API используя getTranslate
        try {
          const { getTranslate } = require('@/tolgee/server');
          const t = await getTranslate();
          const testKeys = sampleKeys.filter((k: any) => typeof k === 'string' && k !== 'unknown').slice(0, 5);
          if (testKeys.length > 0) {
            console.log(`[Tolgee SSR] Testing translation retrieval for keys:`, testKeys);
            testKeys.forEach((key: string) => {
              try {
                const translation = t(key);
                console.log(`[Tolgee SSR] Translation for "${key}":`, translation);
              } catch (e) {
                console.warn(`[Tolgee SSR] Could not get translation for "${key}":`, e);
              }
            });
          }
        } catch (e) {
          console.warn(`[Tolgee SSR] Could not test translation retrieval:`, e);
        }
      }
      
      if (records.length < 4) {
        console.warn(`[Tolgee SSR] WARNING: Only ${records.length} translation record(s) loaded, but 4 translations exist in Tolgee project.`);
        console.warn(`[Tolgee SSR] This might indicate:`);
        console.warn(`  - loadRequired() only loads translations that are statically analyzed in the code`);
        console.warn(`  - Some translations are used dynamically and not detected as "required"`);
        console.warn(`  - Translations might be used in client components, not server components`);
        console.warn(`[Tolgee SSR] Note: loadRequired() uses static analysis to find translations in the code`);
        console.warn(`[Tolgee SSR] Check Tolgee project: ${process.env.NEXT_PUBLIC_TOLGEE_API_URL}`);
      } else {
        console.log(`[Tolgee SSR] Successfully loaded ${records.length} translation records`);
      }
    }
  } catch (error) {
    // Логируем ошибки только один раз
    if (typeof (globalThis as any).__tolgee_error_logged === 'undefined') {
      (globalThis as any).__tolgee_error_logged = true;
      console.error('[Tolgee SSR] Failed to load translations, continuing without SSR records', error);
      if (error instanceof Error) {
        console.error('[Tolgee SSR] Error details:', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });
      }
    }
    records = [];
  }
  
  return (
    <ApplicationProvider>
      <NextIntlClientProvider locale={locale}>
        <TolgeeNextProvider language={locale} staticData={records}>
          {/*<main className="p-4 pb-8 flex items-center justify-center flex-col gap-8 min-h-screen">*/}
          <main>
            { children }
            <ToasterHost />
          </main>
        </TolgeeNextProvider>
      </NextIntlClientProvider>
    </ApplicationProvider>
  )
}
