import { NextRequest, NextResponse } from 'next/server'
import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from '@/tolgee/shared'
import { createServerLogger } from '@archpad/logger'

const log = createServerLogger('portal.proxy')

const LOCALE_COOKIE = 'archpad_locale'
const SESSION_COOKIE = 'archpad_session'

const PRIVATE_PREFIXES = ['/dashboard', '/directories', '/application', '/motivation', '/settings', '/solutions', '/flows', '/business', '/strategy', '/technologies', '/implementation']

function stripTrailingSlash(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

function getLocaleFromRequest(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && ALL_LANGUAGES.includes(cookieLocale)) return cookieLocale

  const accept = request.headers.get('accept-language') ?? ''
  // Very small parser: pick first matching language tag.
  for (const part of accept.split(',')) {
    const tag = part.split(';')[0]?.trim()
    if (!tag) continue
    const exact = ALL_LANGUAGES.find((l) => l.toLowerCase() === tag.toLowerCase())
    if (exact) return exact
  }

  return DEFAULT_LANGUAGE
}

export default function proxy(request: NextRequest) {
  // Логируем информацию о сборке образа при первом запросе (только один раз)
  if (typeof (globalThis as any).__build_info_logged === 'undefined') {
    (globalThis as any).__build_info_logged = true
    log.info('Portal starting')
    log.info(`Build: commit=${process.env.BUILD_COMMIT_SHA || 'unknown'} version=${process.env.BUILD_VERSION || 'unknown'} branch=${process.env.BUILD_BRANCH || 'unknown'}`)
  }

  const { pathname } = request.nextUrl

  // Skip Next internals, API, and files (handled by matcher too, but keep safe).
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const cleaned = stripTrailingSlash(pathname)

  // "Native" auth gate for private routes:
  // We store only an opaque session id in httpOnly cookie (tokens live in auth-service DB).
  // If it's missing, redirect to the portal sign-in page.
  if (
    request.method === 'GET' &&
    PRIVATE_PREFIXES.some((p) => cleaned === p || cleaned.startsWith(`${p}/`)) &&
    !request.cookies.get(SESSION_COOKIE)?.value
  ) {
    const url = request.nextUrl.clone()
    const returnTo = `${cleaned}${url.search}`
    url.pathname = '/sign-in'
    url.search = `?return_to=${encodeURIComponent(returnTo)}`
    return NextResponse.redirect(url)
  }

  const localeInPath = ALL_LANGUAGES.find(
    (l) => cleaned === `/${l}` || cleaned.startsWith(`/${l}/`)
  )

  // Enforce "no-locale URLs": if user hits /<locale>/..., redirect to stripped path.
  if (localeInPath) {
    const stripped = cleaned.replace(`/${localeInPath}`, '') || '/'
    const url = request.nextUrl.clone()
    url.pathname = stripped
    return NextResponse.redirect(url)
  }

  // Internally, we still render from /[locale]/... by rewriting.
  const locale = getLocaleFromRequest(request)
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${cleaned === '/' ? '' : cleaned}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Do not run proxy for Next internals, API routes or static assets.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

