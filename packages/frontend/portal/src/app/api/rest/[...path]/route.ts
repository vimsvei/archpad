import { NextResponse } from "next/server"

import { getSessionIdFromCookies } from "@/lib/auth/oauth"
import { authServiceSessionAccess } from "@/lib/auth/auth-service"
import { createServerLogger } from "@archpad/logger"

const log = createServerLogger("api.rest")

function getApiGatewayBaseUrl(): string {
  // Для серверных компонентов приоритет у внутренних адресов (в кластере).
  const internal = process.env.API_GATEWAY_INTERNAL_URL?.trim()
  const external = process.env.NEXT_PUBLIC_API_REST_URI?.trim()
  const defaultInternal = "http://oathkeeper.secure.svc:4455"
  const url =
    process.env.NODE_ENV === "production"
      ? internal || defaultInternal || external
      : external || internal
  if (!url) {
    throw new Error('API_GATEWAY_INTERNAL_URL or NEXT_PUBLIC_API_REST_URI must be set')
  }
  return url
}

function safeJsonParse(input: string): unknown {
  try {
    return JSON.parse(input)
  } catch {
    return input
  }
}

function truncateString(input: string, maxLen: number): string {
  if (input.length <= maxLen) return input
  return `${input.slice(0, maxLen)}…`
}

function headersToObject(headers: Headers, options?: { redactAuthorization?: boolean }): Record<string, string> {
  const out: Record<string, string> = {}
  headers.forEach((value, key) => {
    const k = key.toLowerCase()
    if (options?.redactAuthorization && k === "authorization") {
      out[k] = value ? `${value.slice(0, 20)}…` : value
      return
    }
    out[k] = value
  })
  return out
}

function cookieNamesFromHeader(cookieHeader: string | null): string[] | undefined {
  if (!cookieHeader) return undefined
  const names = cookieHeader
    .split(";")
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => p.split("=")[0]?.trim())
    .filter((n): n is string => Boolean(n))
  // keep stable + small
  return Array.from(new Set(names)).sort()
}

async function proxy(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await ctx.params
  const isDev = process.env.NODE_ENV === "development"
  const requestId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`

  const base = getApiGatewayBaseUrl()
  const inUrl = new URL(request.url)
  const target = new URL(base)
  target.pathname = `/rest/${path.join("/")}`
  target.search = inUrl.search

  const incomingAuth = request.headers.get("authorization")
  const sessionId = await getSessionIdFromCookies()
  const hadSession = Boolean(sessionId)
  // Browser holds only opaque session id. JWT is requested from auth-service server-side.
  let auth: string | null = incomingAuth
  if (sessionId) {
    try {
      auth = `Bearer ${(await authServiceSessionAccess({ sessionId })).accessToken}`
    } catch {
      auth = incomingAuth
    }
  }

  // Forward selected headers.
  const headers = new Headers()
  const contentType = request.headers.get("content-type")
  if (contentType) headers.set("content-type", contentType)
  const accept = request.headers.get("accept")
  if (accept) headers.set("accept", accept)
  if (auth) headers.set("authorization", auth)
  // Tenant-service internal endpoints require x-internal-token (server-to-server).
  const pathStr = path.join("/")
  if (pathStr.startsWith("tenant-service/internal/")) {
    const internalToken = process.env.INTERNAL_SERVICE_TOKEN?.trim()
    if (internalToken) headers.set("x-internal-token", internalToken)
  }

  const method = request.method.toUpperCase()
  const body =
    method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer().catch(() => undefined)

  const startTime = Date.now()
  // Development logging (readable + structured, no emojis / no extra blank lines)
  if (isDev) {
    const headersObj = headersToObject(headers, { redactAuthorization: true })
    const cookiePresent = Boolean(request.headers.get("cookie"))
    const authPresent = Boolean(auth)
    const authSource = sessionId ? "session" : incomingAuth ? "header" : "missing"
    const bodyLen = body?.byteLength ?? 0

    log.info(
      `req id=${requestId} method=${method} path=${inUrl.pathname}${inUrl.search || ""} target=${target.toString()} auth=${authPresent ? "present" : "missing"} cookie=${cookiePresent ? "present" : "missing"} authSource=${authSource} bodyBytes=${bodyLen}`
    )
    if (!authPresent) {
      const cookieNames = cookieNamesFromHeader(request.headers.get("cookie"))
      if (cookieNames?.length) {
        log.info(`req.cookies id=${requestId} ${cookieNames.join(",")}`)
      }
    }
    log.info(`req.headers id=${requestId} ${JSON.stringify(headersObj)}`)

    if (body && bodyLen > 0) {
      const bodyText = new TextDecoder().decode(body)
      const bodyPreview = truncateString(
        typeof safeJsonParse(bodyText) === "string" ? (safeJsonParse(bodyText) as string) : JSON.stringify(safeJsonParse(bodyText)),
        2_000
      )
      log.info(`req.body id=${requestId} ${bodyPreview}`)
    }
  }

  async function doFetch(currentAuth: string | null) {
    const h = new Headers(headers)
    if (currentAuth) h.set("authorization", currentAuth)
    return fetch(target, {
      method,
      headers: h,
      body,
      cache: "no-store",
    })
  }

  const res = await doFetch(auth)
  const duration = Date.now() - startTime

  const outHeaders = new Headers()
  const outCt = res.headers.get("content-type")
  if (outCt) outHeaders.set("content-type", outCt)

  const buf = await res.arrayBuffer()

  // Log response; on error, log reason why api-rest request may have failed
  if (!res.ok) {
    const responseText = buf.byteLength > 0 ? new TextDecoder().decode(buf) : null
    const responseBodyPreview =
      responseText != null
        ? truncateString(
            typeof safeJsonParse(responseText) === "string"
              ? (safeJsonParse(responseText) as string)
              : JSON.stringify(safeJsonParse(responseText)),
            2_000
          )
        : undefined
    const reason =
      res.status === 401
        ? "Upstream returned 401 Unauthorized. Possible causes: JWT invalid/expired, auth-service /session/access failed (403), misconfiguration."
        : res.status === 403
          ? "Upstream returned 403 Forbidden."
          : `Upstream returned ${res.status}.`
    log.error({
      message: `api-rest request failed: ${reason}`,
      requestId,
      status: res.status,
      path: inUrl.pathname,
      target: target.toString(),
      hadSession,
      bodyPreview: responseBodyPreview,
    })
  } else if (isDev) {
    log.info(`res id=${requestId} status=${res.status} ms=${duration} ct=${outCt ?? "-"}`)
  }

  const response = new NextResponse(buf, { status: res.status, headers: outHeaders })
  // Do NOT clear session on data fetch 401: upstream 401 can be due to misconfiguration
  // or transient issues, not necessarily invalid session.
  return response
}

export async function GET(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, ctx)
}
export async function POST(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, ctx)
}
export async function PUT(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, ctx)
}
export async function PATCH(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, ctx)
}
export async function DELETE(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  return proxy(request, ctx)
}


