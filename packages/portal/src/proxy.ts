import { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createOryMiddleware } from '@ory/nextjs/middleware'

import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from '@/tolgee/shared'
import oryConfig from '../ory.config'

const intlMiddleware = createIntlMiddleware({
  locales: ALL_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  localePrefix: 'as-needed',
})

const oryMiddleware = createOryMiddleware(oryConfig)

export default async function proxy(request: NextRequest) {

  // if (process.env.NODE_ENV !== 'production') {
  //   process.env.NODE_TLS_REJECT_UNAUTHORIZED ??= '0'
  // }

  // Proxy Ory SDK endpoints first (self-service, sessions/whoami, etc.)
  try {
    const oryResponse = await oryMiddleware(request)
    if (oryResponse) return oryResponse
  } catch (e) {
    console.error('Ory middleware failed, continuing without proxy:', e)
  }

  return intlMiddleware(request)
}

export const config = {
  // Do not run proxy for Next internals, API routes or static assets.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

