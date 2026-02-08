import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALE_COOKIE = 'archpad_locale';
const SUPPORTED_LOCALES = ['en', 'ru-RU', 'es-ES', 'sr'];
const DEFAULT_LOCALE = 'en';

// Country code (ISO 3166-1 alpha-2) -> locale
const COUNTRY_TO_LOCALE: Record<string, string> = {
  RU: 'ru-RU', // Russia
  BY: 'ru-RU', // Belarus
  KZ: 'ru-RU', // Kazakhstan
  UA: 'ru-RU', // Ukraine (many speak Russian)
  ES: 'es-ES', // Spain
  MX: 'es-ES', // Mexico
  AR: 'es-ES', // Argentina
  RS: 'sr', // Serbia
  ME: 'sr', // Montenegro
  BA: 'sr', // Bosnia
};

function getLocaleFromGeo(request: NextRequest): string {
  const country =
    request.headers.get('x-vercel-ip-country') ??
    (request as NextRequest & { geo?: { country?: string } }).geo?.country;

  if (country) {
    const locale = COUNTRY_TO_LOCALE[country.toUpperCase()];
    if (locale && SUPPORTED_LOCALES.includes(locale)) return locale;
  }

  return DEFAULT_LOCALE;
}

function getLocaleFromAcceptLanguage(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const parts = acceptLanguage.split(',').map((p) => {
    const [lang, q] = p.trim().split(';q=');
    return { lang: lang?.split('-')[0]?.toLowerCase(), q: q ? parseFloat(q) : 1 };
  });

  for (const { lang } of parts.sort((a, b) => b.q - a.q)) {
    if (lang === 'ru') return 'ru-RU';
    if (lang === 'es') return 'es-ES';
    if (lang === 'sr') return 'sr';
    if (lang === 'en') return 'en';
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect old locale URLs to root (e.g. /ru-RU -> /, /en -> /)
  const firstSegment = pathname.split('/')[1];
  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    const newPath = pathname === `/${firstSegment}` ? '/' : pathname.slice(firstSegment.length + 1) || '/';
    const url = request.nextUrl.clone();
    url.pathname = newPath;
    const res = NextResponse.redirect(url);
    res.cookies.set(LOCALE_COOKIE, firstSegment, { path: '/' });
    return res;
  }

  const response = NextResponse.next();

  let locale = request.cookies.get(LOCALE_COOKIE)?.value;

  if (!locale || !SUPPORTED_LOCALES.includes(locale)) {
    locale = getLocaleFromGeo(request);
    if (locale === DEFAULT_LOCALE) {
      locale = getLocaleFromAcceptLanguage(request);
    }
    response.cookies.set(LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365 });
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
