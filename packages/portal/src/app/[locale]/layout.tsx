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
    records = await tolgee.loadRequired();
    // Логируем только один раз при первом запросе (используем статическую переменную)
    // Это предотвращает избыточное логирование при каждом рендере
    if (typeof (globalThis as any).__tolgee_logged === 'undefined') {
      (globalThis as any).__tolgee_logged = true;
      if (records.length < 10) {
        console.warn(`[Tolgee] Loaded only ${records.length} translation record(s) for locale: ${locale}. This might indicate a configuration issue or that translations are not yet added to Tolgee.`);
        console.warn(`[Tolgee] If you expect more translations, check Tolgee project: ${process.env.NEXT_PUBLIC_TOLGEE_API_URL}`);
      } else {
        console.log(`[Tolgee] Loaded ${records.length} translation records for locale: ${locale}`);
      }
    }
  } catch (error) {
    // Логируем ошибки только один раз
    if (typeof (globalThis as any).__tolgee_error_logged === 'undefined') {
      (globalThis as any).__tolgee_error_logged = true;
      console.error('[Tolgee] Failed to load translations, continuing without SSR records', error);
      if (error instanceof Error) {
        console.error('[Tolgee] Error details:', {
          message: error.message,
          stack: error.stack
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
