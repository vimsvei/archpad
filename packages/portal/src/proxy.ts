import { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createOryMiddleware } from '@ory/nextjs/middleware'

import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from '@/tolgee/shared'
import oryConfig from '../ory.config'

const intlMiddleware = createIntlMiddleware({
  locales: ALL_LANGUAGES,
  defaultLocale: DEFAULT_LANGUAGE,
  // Our App Router lives under /[locale]/..., so locale must always be present in URL.
  // This makes /sign-in?flow=... become /<detected-locale>/sign-in?flow=...
  localePrefix: 'always',
})

const oryMiddleware = createOryMiddleware(oryConfig)

export default async function proxy(request: NextRequest) {

  // Proxy Ory SDK endpoints first (self-service, sessions/whoami, etc.)
  try {
    const oryResponse = await oryMiddleware(request)
    // `createOryMiddleware` returns `NextResponse.next()` when the path does not match
    // any Ory endpoints. In that case we MUST continue to the next-intl middleware,
    // otherwise locale redirects (e.g. /sign-in -> /<locale>/sign-in) won't happen.
    if (oryResponse && oryResponse.headers.get('x-middleware-next') !== '1') {
      return oryResponse
    }
  } catch (e) {
    console.error('Ory middleware failed, continuing without proxy:', e)
  }

  return intlMiddleware(request)
}

export const config = {
  // Do not run proxy for Next internals, API routes or static assets.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

