import ApplicationProvider from "@/components/providers/application-provider";
import {TolgeeNextProvider} from "@/components/providers/tolgee-next-provider";
import {ALL_LANGUAGES} from "@/tolgee/shared";
import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import { ToasterHost } from "@/components/layouts/toaster-host";
import { createServerLogger } from "@archpad/logger";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  
  const { locale } = await params;
  if (!ALL_LANGUAGES.includes(locale)) notFound();
  
  const log = createServerLogger("portal");
  // Server prefetch: load translations at request time (not build).
  // Env vars from Vault at runtime; no CORS; Tolgee docs recommended.
  let staticData: Awaited<ReturnType<Awaited<ReturnType<typeof import('@/tolgee/server').getTolgee>>['loadRequired']>> | undefined;
  try {
    const { getTolgee } = await import('@/tolgee/server');
    const tolgee = await getTolgee();
    staticData = await tolgee.loadRequired();
    const count = Array.isArray(staticData) ? staticData.length : (staticData ? Object.keys(staticData).length : 0);
    log.info({ event: "Tolgee loadRequired OK", locale, keysCount: count });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    log.error({ event: "Tolgee loadRequired failed", locale, message: err.message }, undefined, err.stack);
  }
  
  return (
    <ApplicationProvider>
      <NextIntlClientProvider locale={locale}>
        <TolgeeNextProvider language={locale} staticData={staticData}>
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
