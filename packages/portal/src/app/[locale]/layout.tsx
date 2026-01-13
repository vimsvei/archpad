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
    console.log(`[Tolgee] Loaded ${records.length} translation records for locale: ${locale}`);
  } catch (error) {
    console.error('[Tolgee] Failed to load translations, continuing without SSR records', error);
    if (error instanceof Error) {
      console.error('[Tolgee] Error details:', {
        message: error.message,
        stack: error.stack
      });
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
