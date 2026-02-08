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
  
  // Server prefetch: load translations at request time (not build).
  // Env vars from Vault at runtime; no CORS; Tolgee docs recommended.
  let staticData: Awaited<ReturnType<Awaited<ReturnType<typeof import('@/tolgee/server').getTolgee>>['loadRequired']>> | undefined;
  try {
    const { getTolgee } = await import('@/tolgee/server');
    const tolgee = await getTolgee();
    staticData = await tolgee.loadRequired();
  } catch (e) {
    console.warn('[portal] Tolgee loadRequired failed, falling back to client fetch:', e);
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
