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
    // Если нужно загрузить все переводы, используем load() без параметров
    // Это загрузит все переводы для текущего языка
    try {
      records = await tolgee.load();
      console.log(`[Tolgee SSR] Using load() to fetch all translations for locale: ${locale}`);
    } catch (loadError) {
      // Если load() не работает, пробуем loadRequired()
      console.warn(`[Tolgee SSR] load() failed, trying loadRequired()...`, loadError);
      records = await tolgee.loadRequired();
    }
    
    // Логируем только один раз при первом запросе (используем статическую переменную)
    // Это предотвращает избыточное логирование при каждом рендере
    if (typeof (globalThis as any).__tolgee_logged === 'undefined') {
      (globalThis as any).__tolgee_logged = true;
      console.log(`[Tolgee SSR] Loaded ${records.length} translation record(s) for locale: ${locale}`);
      
      // Детальное логирование структуры записей
      if (records.length > 0) {
        console.log(`[Tolgee SSR] First record structure:`, JSON.stringify(records[0], null, 2).substring(0, 500));
        const sampleKeys = records.slice(0, 10).map((r: any) => {
          if (typeof r === 'string') return r;
          return r.key || r.namespace?.key || r.namespace || JSON.stringify(r).substring(0, 50);
        });
        console.log(`[Tolgee SSR] Sample translation keys (first 10):`, sampleKeys);
      }
      
      if (records.length < 4) {
        console.warn(`[Tolgee SSR] WARNING: Only ${records.length} translation record(s) loaded, but 4 translations exist in Tolgee project.`);
        console.warn(`[Tolgee SSR] This might indicate:`);
        console.warn(`  - loadRequired() only loads translations that are used in the code`);
        console.warn(`  - Some translations are not marked as "required" in the code`);
        console.warn(`  - Try using load() instead of loadRequired() to load all translations`);
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
