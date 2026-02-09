import { NextRequest, NextResponse } from "next/server"
import { ALL_LANGUAGES } from "@/tolgee/shared"
import { createServerLogger } from "@archpad/logger"

const log = createServerLogger("portal.proxy")

const LOCALE_COOKIE = "archpad_locale"
const SESSION_COOKIE = "archpad_session"

const PRIVATE_PREFIXES = [
  "/dashboard",
  "/directories",
  "/application",
  "/motivation",
  "/settings",
  "/solutions",
  "/flows",
  "/business",
  "/strategy",
  "/technologies",
  "/implementation",
]

function stripTrailingSlash(pathname: string) {
  return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname
}

function getLocaleFromRequest(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookieLocale && ALL_LANGUAGES.includes(cookieLocale)) return cookieLocale

  const accept = request.headers.get("accept-language") ?? ""
  for (const part of accept.split(",")) {
    const tag = part.split(";")[0]?.trim()
    if (!tag) continue
    const exact = ALL_LANGUAGES.find((l) => l.toLowerCase() === tag.toLowerCase())
    if (exact) return exact
  }

  return "ru-RU"
}

export default function proxy(request: NextRequest) {
  if (typeof (globalThis as any).__build_info_logged === "undefined") {
    (globalThis as any).__build_info_logged = true
    log.info("Portal starting")
    log.info(
      `Build: commit=${process.env.BUILD_COMMIT_SHA || "unknown"} version=${process.env.BUILD_VERSION || "unknown"} branch=${process.env.BUILD_BRANCH || "unknown"}`
    )
  }

  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api") || pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next()
  }

  const cleaned = stripTrailingSlash(pathname)

  // Auth gate for private routes
  if (
    request.method === "GET" &&
    PRIVATE_PREFIXES.some((p) => cleaned === p || cleaned.startsWith(`${p}/`)) &&
    !request.cookies.get(SESSION_COOKIE)?.value
  ) {
    const url = request.nextUrl.clone()
    const returnTo = `${cleaned}${url.search}`
    url.pathname = "/sign-in"
    url.search = `?return_to=${encodeURIComponent(returnTo)}`
    return NextResponse.redirect(url)
  }

  // Redirect /<locale>/... to stripped path (backward compat for old bookmarks)
  const localeInPath = ALL_LANGUAGES.find((l) => cleaned === `/${l}` || cleaned.startsWith(`/${l}/`))
  if (localeInPath) {
    const stripped = cleaned.replace(`/${localeInPath}`, "") || "/"
    const url = request.nextUrl.clone()
    url.pathname = stripped
    return NextResponse.redirect(url)
  }

  // No rewrite: routes are at /dashboard, /sign-in, etc. directly.
  const locale = getLocaleFromRequest(request)
  const res = NextResponse.next()
  res.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
  return res
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
