import './globals.css'
import '@xyflow/react/dist/style.css';

import { DEFAULT_LANGUAGE } from '@/tolgee/shared'

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

  return (
    <html lang={locale ?? DEFAULT_LANGUAGE} suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  )
}

