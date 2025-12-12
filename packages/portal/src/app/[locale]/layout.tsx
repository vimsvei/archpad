import {getTolgee} from "@/tolgee/server";
import ApplicationProvider from "@/components/providers/application-provider";
import {TolgeeNextProvider} from "@/components/providers/tolgee-next-provider";
import {ALL_LANGUAGES} from "@/tolgee/shared";
import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";

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
  } catch (error) {
    console.error('Tolgee: failed to load translations, continuing without SSR records', error);
    records = [];
  }
  
  return (
    <ApplicationProvider>
      <NextIntlClientProvider locale={locale}>
        <TolgeeNextProvider language={locale} staticData={records}>
          {/*<main className="p-4 pb-8 flex items-center justify-center flex-col gap-8 min-h-screen">*/}
          <main>
            { children }
          </main>
        </TolgeeNextProvider>
      </NextIntlClientProvider>
    </ApplicationProvider>
  )
}
