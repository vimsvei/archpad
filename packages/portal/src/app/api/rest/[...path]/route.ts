import { NextResponse } from "next/server"

import {
  getAccessTokenFromCookies,
  getRefreshTokenFromCookies,
  setTokensOnResponse,
} from "@/lib/auth/oauth"
import { exchangeRefreshToken } from "@/lib/auth/hydra"

function getApiGatewayBaseUrl(): string {
  // Use public endpoint if available (for direct client access), 
  // otherwise use internal Docker network URL
  return process.env.NEXT_PUBLIC_API_REST_ENDPOINT 
    ?? process.env.API_GATEWAY_INTERNAL_URL 
    ?? "http://oathkeeper:4455"
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

  const token = await getAccessTokenFromCookies()
  const refreshTokenFromCookie = await getRefreshTokenFromCookies()
  const incomingAuth = request.headers.get("authorization")
  // We intentionally do NOT accept cookies from the browser as "credentials" for Oathkeeper.
  // Only an access token (Bearer) should be sent. If it's missing, we refresh using refresh_token cookie.
  let auth = token ? `Bearer ${token}` : incomingAuth

  // Forward selected headers.
  const headers = new Headers()
  const contentType = request.headers.get("content-type")
  if (contentType) headers.set("content-type", contentType)
  const accept = request.headers.get("accept")
  if (accept) headers.set("accept", accept)
  if (auth) headers.set("authorization", auth)

  const method = request.method.toUpperCase()
  const body =
    method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer().catch(() => undefined)

  const startTime = Date.now()
  // Development logging (readable + structured, no emojis / no extra blank lines)
  if (isDev) {
    const headersObj = headersToObject(headers, { redactAuthorization: true })
    const cookiePresent = Boolean(request.headers.get("cookie"))
    const authPresent = Boolean(auth)
    const authSource = token ? "cookie" : incomingAuth ? "header" : "missing"
    const bodyLen = body?.byteLength ?? 0

    console.info(
      `[rest.proxy] req id=${requestId} method=${method} path=${inUrl.pathname}${
        inUrl.search || ""
      } target=${target.toString()} auth=${authPresent ? "present" : "missing"} cookie=${
        cookiePresent ? "present" : "missing"
      } authSource=${authSource} bodyBytes=${bodyLen}`
    )
    if (!authPresent) {
      const cookieNames = cookieNamesFromHeader(request.headers.get("cookie"))
      if (cookieNames?.length) {
        console.info(`[rest.proxy] req.cookies id=${requestId} ${cookieNames.join(",")}`)
      }
    }
    console.info(`[rest.proxy] req.headers id=${requestId} ${JSON.stringify(headersObj)}`)

    if (body && bodyLen > 0) {
      const bodyText = new TextDecoder().decode(body)
      const bodyPreview = truncateString(
        typeof safeJsonParse(bodyText) === "string" ? (safeJsonParse(bodyText) as string) : JSON.stringify(safeJsonParse(bodyText)),
        2_000
      )
      console.info(`[rest.proxy] req.body id=${requestId} ${bodyPreview}`)
    }
  }

  let refreshedTokens: { accessToken: string; refreshToken?: string } | null = null

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

  // If we have no access token but do have a refresh token, refresh first so the initial request is authorized.
  if (!auth && refreshTokenFromCookie) {
    try {
      if (isDev) console.info(`[rest.proxy] refresh id=${requestId} start (pre)`)
      refreshedTokens = await exchangeRefreshToken({ refreshToken: refreshTokenFromCookie })
      auth = `Bearer ${refreshedTokens.accessToken}`
      if (isDev) {
        const redacted = `${auth.slice(0, 20)}…`
        console.info(`[rest.proxy] refresh id=${requestId} ok (pre) auth=${redacted}`)
      }
    } catch (e: any) {
      if (isDev)
        console.info(
          `[rest.proxy] refresh id=${requestId} failed (pre) error=${e?.message ?? "unknown"}`
        )
    }
  }

  let res = await doFetch(auth)
  const duration = Date.now() - startTime

  // If access token is expired, try refresh once and retry the request.
  if (res.status === 401 && !refreshedTokens) {
    if (refreshTokenFromCookie) {
      try {
        if (isDev) console.info(`[rest.proxy] refresh id=${requestId} start`)
        refreshedTokens = await exchangeRefreshToken({ refreshToken: refreshTokenFromCookie })
        const retryAuth = `Bearer ${refreshedTokens.accessToken}`
        res = await doFetch(retryAuth)
        if (isDev) console.info(`[rest.proxy] refresh id=${requestId} ok retryStatus=${res.status}`)
      } catch (e: any) {
        if (isDev) console.info(`[rest.proxy] refresh id=${requestId} failed error=${e?.message ?? "unknown"}`)
      }
    }
  }

  const outHeaders = new Headers()
  const outCt = res.headers.get("content-type")
  if (outCt) outHeaders.set("content-type", outCt)

  const buf = await res.arrayBuffer()

  // Development logging (readable + structured)
  if (isDev) {
    const shouldLogBody = !res.ok && buf.byteLength > 0
    const responseText = shouldLogBody ? new TextDecoder().decode(buf) : null
    const responseBodyPreview =
      responseText != null
        ? truncateString(
            typeof safeJsonParse(responseText) === "string"
              ? (safeJsonParse(responseText) as string)
              : JSON.stringify(safeJsonParse(responseText)),
            2_000
          )
        : undefined

    console.info(
      `[rest.proxy] res id=${requestId} status=${res.status} ms=${duration} ct=${outCt ?? "-"}`
    )
    if (responseBodyPreview) {
      console.info(`[rest.proxy] res.body id=${requestId} ${responseBodyPreview}`)
    }
  }

  const response = new NextResponse(buf, { status: res.status, headers: outHeaders })
  if (refreshedTokens) {
    setTokensOnResponse(response, refreshedTokens)
    if (isDev) {
      const tokenPreview = `${refreshedTokens.accessToken.slice(0, 12)}…${refreshedTokens.accessToken.slice(-8)}`
      console.info(`[rest.proxy] set_tokens id=${requestId} access_token=${tokenPreview}`)
    }
  }
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


