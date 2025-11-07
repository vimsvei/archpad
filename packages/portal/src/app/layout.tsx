import './globals.css';
import {getLanguage} from "@/tolgee/language";
import {getTolgee} from "@/tolgee/server";
import ApplicationProvider from "@/components/providers/application-provider";
import {TolgeeNextProvider} from "@/components/providers/tolgee-next-provider";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  
  const locale = await getLanguage();
  const tolgee = await getTolgee();
  const staticData = await tolgee.loadRequired();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <TolgeeNextProvider language={locale} staticData={staticData}>
          <ApplicationProvider>
            {children}
          </ApplicationProvider>
        </TolgeeNextProvider>
      </body>
    </html>
  )
}
