import '../globals.css';
import "@ory/elements-react/theme/styles.css"

import {getTolgee} from "@/tolgee/server";
import ApplicationProvider from "@/components/providers/application-provider";
import {TolgeeNextProvider} from "@/components/providers/tolgee-next-provider";
import {ALL_LANGUAGES} from "@/tolgee/shared";
import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import { getServerSession } from '@ory/nextjs/app';
import {SessionProvider} from "@ory/elements-react/client";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  
  const { locale } = await params;
  if (!ALL_LANGUAGES.includes(locale)) notFound();
  
  const tolgee = await getTolgee();
  const records = await tolgee.loadRequired();
  
  const session = await getServerSession();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>
          <ApplicationProvider>
            <NextIntlClientProvider locale={locale}>
              <TolgeeNextProvider language={locale} staticData={records}>
                <main className="p-4 pb-8 flex items-center justify-center flex-col gap-8 min-h-screen">
                  { children }
                </main>
              </TolgeeNextProvider>
            </NextIntlClientProvider>
          </ApplicationProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
