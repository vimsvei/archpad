import { NextRequest, NextResponse } from 'next/server'
import { ALL_LANGUAGES, DEFAULT_LANGUAGE } from '@/tolgee/shared'

const LOCALE_COOKIE = 'archpad_locale'

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
  const { pathname } = request.nextUrl

  // Skip Next internals, API, and files (handled by matcher too, but keep safe).
  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Ory proxy endpoints are locale-less; do not rewrite them.
  if (pathname.startsWith('/self-service')) {
    const url = request.nextUrl.clone()
    url.pathname = `/api/ory${pathname}`
    return NextResponse.rewrite(url)
  }
  if (pathname.startsWith('/sessions')) {
    const url = request.nextUrl.clone()
    url.pathname = `/api/ory${pathname}`
    return NextResponse.rewrite(url)
  }

  const cleaned = stripTrailingSlash(pathname)
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

