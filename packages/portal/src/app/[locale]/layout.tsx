import './globals.css';
import {getTolgee} from "@/tolgee/server";
import ApplicationProvider from "@/components/providers/application-provider";
import {TolgeeNextProvider} from "@/components/providers/tolgee-next-provider";
import {ReactNode} from "react";
import {ALL_LANGUAGES} from "@/tolgee/shared";
import {notFound} from "next/navigation";

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  
  const { locale } = await params;
  if (!ALL_LANGUAGES.includes(locale)) {
    notFound();
  }
  const tolgee = await getTolgee();
  const records = await tolgee.loadRequired();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <TolgeeNextProvider language={locale} staticData={records}>
          <ApplicationProvider>
            { children }
          </ApplicationProvider>
        </TolgeeNextProvider>
      </body>
    </html>
  )
}
