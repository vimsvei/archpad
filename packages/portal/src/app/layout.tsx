import './globals.css'
import '@ory/elements-react/theme/styles.css'

import { getServerSession } from '@ory/nextjs/app'
import { SessionProvider } from '@ory/elements-react/client'

import { DEFAULT_LANGUAGE } from '@/tolgee/shared'

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

  // Session provider must wrap the whole app (both public/private routes).
  // If fetching fails, we continue with `null` session.
  let session = null
  try {
    session = await getServerSession()
  } catch (e: any) {
    // During `next build`, Next may try to statically prerender special routes,
    // and `getServerSession()` uses `headers()`, making the route dynamic.
    // We don't want to spam logs for that case.
    if (e?.digest !== 'DYNAMIC_SERVER_USAGE') {
      console.error('Failed to get server session:', e)
    }
  }

  return (
    <html lang={locale ?? DEFAULT_LANGUAGE} suppressHydrationWarning>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}

