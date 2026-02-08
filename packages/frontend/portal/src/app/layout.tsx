import './globals.css'
import '@xyflow/react/dist/style.css';

import { Roboto } from 'next/font/google'
import { DEFAULT_LANGUAGE } from '@/tolgee/shared'

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
})

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params

  return (
    <html
      lang={locale ?? DEFAULT_LANGUAGE}
      suppressHydrationWarning
      className={roboto.variable}
    >
      <body>
        {children}
      </body>
    </html>
  )
}

