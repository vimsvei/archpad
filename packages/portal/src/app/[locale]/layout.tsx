import '../globals.css';
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
  
  const tolgee = await getTolgee();
  const records = await tolgee.loadRequired();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <ApplicationProvider>
          <NextIntlClientProvider locale={locale}>
            <TolgeeNextProvider language={locale} staticData={records}>
              { children }
            </TolgeeNextProvider>
          </NextIntlClientProvider>
        </ApplicationProvider>
      </body>
    </html>
  )
}
