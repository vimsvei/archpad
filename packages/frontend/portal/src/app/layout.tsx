import "./globals.css"
import "@xyflow/react/dist/style.css"

import { Roboto } from "next/font/google"
import ApplicationProvider from "@/components/providers/application-provider"
import { TolgeeNextProvider } from "@/components/providers/tolgee-next-provider"
import { ToasterHost } from "@/components/layouts/toaster-host"
import { createServerLogger } from "@archpad/logger"
import { getLanguage } from "@/tolgee/language"
import { DEFAULT_LANGUAGE } from "@/tolgee/shared"

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  display: "swap",
})

type RootLayoutProps = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLanguage()

  const log = createServerLogger("portal")
  const { getTolgeeEnvInfo } = await import("@/tolgee/shared")
  const envInfo = getTolgeeEnvInfo()

  log.info({
    event: "Tolgee prefetch start",
    locale,
    apiUrlSource: envInfo.apiUrlSource,
    isInternalUrl: envInfo.isInternalUrl,
    hasApiKey: envInfo.hasApiKey,
  })

  let staticData: Awaited<
    ReturnType<
      Awaited<ReturnType<typeof import("@/tolgee/server")["getTolgee"]>>["loadRequired"]
    >
  > | undefined
  try {
    const { getTolgee } = await import("@/tolgee/server")
    const tolgee = await getTolgee()
    staticData = await tolgee.loadRequired()
    const count = Array.isArray(staticData)
      ? staticData.length
      : staticData
        ? Object.keys(staticData).length
        : 0
    if (count === 0) {
      log.warn({
        event: "Tolgee loadRequired empty",
        locale,
        apiUrlSource: envInfo.apiUrlSource,
        hint: "Translations will come from staticData (messages/*.json)",
      })
    } else {
      log.info({
        event: "Tolgee loadRequired OK",
        locale,
        keysCount: count,
        apiUrlSource: envInfo.apiUrlSource,
      })
    }
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    log.error(
      {
        event: "Tolgee loadRequired failed",
        locale,
        message: err.message,
        apiUrlSource: envInfo.apiUrlSource,
        isInternalUrl: envInfo.isInternalUrl,
        hint: envInfo.isInternalUrl
          ? "Internal K8s URL may be unreachable. Using staticData fallback."
          : "Check Tolgee API reachability. Using staticData fallback.",
      },
      undefined,
      err.stack
    )
  }

  return (
    <html
      lang={locale ?? DEFAULT_LANGUAGE}
      suppressHydrationWarning
      className={roboto.variable}
    >
      <body>
        <ApplicationProvider>
          <TolgeeNextProvider language={locale} staticData={staticData}>
            <main>
              {children}
              <ToasterHost />
            </main>
          </TolgeeNextProvider>
        </ApplicationProvider>
      </body>
    </html>
  )
}
