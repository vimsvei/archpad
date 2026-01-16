import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function getRequestProto(request: NextRequest): 'http' | 'https' {
  const protoHeader = request.headers.get('x-forwarded-proto')
  if (protoHeader === 'http' || protoHeader === 'https') return protoHeader
  // In production behind an ingress/controller, requests may reach Next.js as plain HTTP.
  // If the ingress didn't forward the proto, default to HTTPS to keep Ory base_url generation correct.
  if (process.env.NODE_ENV === 'production') return 'https'
  const protoFromUrl = request.nextUrl.protocol.replace(':', '')
  return protoFromUrl === 'https' ? 'https' : 'http'
}

function getOryBaseUrl(): URL | null {
  // In production (in-cluster) prefer internal URL; in local dev prefer public URL.
  const internal = process.env.ORY_KRATOS_INTERNAL_URL?.trim()
  const external = process.env.NEXT_PUBLIC_ORY_SDK_URL?.trim()
  const raw =
    process.env.NODE_ENV === 'production'
      ? internal || external
      : external || internal
  if (!raw) return null
  try {
    return new URL(raw)
  } catch {
    return null
  }
}

function forwardedHeaders(request: NextRequest): Headers {
  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('content-length')
  headers.delete('connection')

  const host = request.headers.get('host')
  const proto = getRequestProto(request)
  if (host) headers.set('x-forwarded-host', host)
  headers.set('x-forwarded-proto', proto)
  return headers
}

function normalizeHref(rawHref: string): string {
  if (!rawHref) return rawHref
  try {
    if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
      const u = new URL(rawHref)
      return `${u.pathname}${u.search}${u.hash}`
    }
  } catch {
    // keep as-is
  }
  return rawHref
}

function rewriteSetCookieForLocalDev(cookie: string, proto: string): string {
  if (process.env.NODE_ENV === 'production') return cookie
  const parts = cookie.split(';').map((p) => p.trim()).filter(Boolean)
  if (parts.length === 0) return cookie

  const [nameValue, ...attrs] = parts
  const withoutDomain = attrs.filter((a) => !/^domain=/i.test(a))
  const withoutSecure =
    proto === 'http' ? withoutDomain.filter((a) => a.toLowerCase() !== 'secure') : withoutDomain
  return [nameValue, ...withoutSecure].join('; ')
}

function copyResponseHeaders(from: Response, to: NextResponse, proto: 'http' | 'https') {
  from.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') return
    if (key.toLowerCase() === 'location') {
      to.headers.set(key, normalizeHref(value))
      return
    }
    to.headers.set(key, value)
  })

  const anyHeaders = from.headers as any
  const setCookies: string[] | undefined = anyHeaders?.getSetCookie?.()
  if (Array.isArray(setCookies) && setCookies.length > 0) {
    for (const c of setCookies) to.headers.append('set-cookie', rewriteSetCookieForLocalDev(c, proto))
    return
  }

  const single = from.headers.get('set-cookie')
  if (single) {
    to.headers.set('set-cookie', rewriteSetCookieForLocalDev(single, proto))
  }
}

export async function GET(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(request, ctx)
}
export async function POST(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(request, ctx)
}
export async function PUT(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(request, ctx)
}
export async function PATCH(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(request, ctx)
}
export async function DELETE(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  return proxy(request, ctx)
}
export async function OPTIONS(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> }
) {
  return proxy(request, ctx)
}

async function proxy(request: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const base = getOryBaseUrl()
  if (!base) {
    return NextResponse.json(
      { error: 'ORY_KRATOS_INTERNAL_URL (or NEXT_PUBLIC_ORY_SDK_URL) is not configured' },
      { status: 500 }
    )
  }

  const { path } = await ctx.params
  const target = new URL(base.toString())
  target.pathname = `/sessions/${(path ?? []).join('/')}`
  target.search = request.nextUrl.search

  const method = request.method.toUpperCase()
  const hasBody = !(method === 'GET' || method === 'HEAD')
  const body = hasBody ? await request.arrayBuffer() : undefined

  const init: any = {
    method,
    headers: forwardedHeaders(request),
    redirect: 'manual',
  }
  if (hasBody) {
    init.body = body
    init.duplex = 'half'
  }

  let res: Response
  try {
    res = await fetch(target, init)
  } catch (e: any) {
    const message = e instanceof Error ? e.message : String(e)
    const cause = e?.cause instanceof Error ? e.cause.message : e?.cause ? String(e.cause) : undefined
    console.error('Ory proxy fetch failed:', { url: target.toString(), message, cause })
    return NextResponse.json(
      {
        error: 'Ory proxy fetch failed',
        message,
        ...(cause ? { cause } : {}),
        url: target.toString(),
      },
      { status: 500 }
    )
  }

  if (process.env.NODE_ENV !== 'production' && res.status >= 400) {
    try {
      const ct = res.headers.get('content-type') ?? ''
      const preview = await res.clone().text()
      console.error('Ory proxy error:', {
        url: target.toString(),
        status: res.status,
        contentType: ct,
        body: preview.slice(0, 4000),
      })
    } catch {
      // ignore
    }
  }

  const nextRes = new NextResponse(res.body, { status: res.status })
  copyResponseHeaders(res, nextRes, getRequestProto(request))

  if (process.env.NODE_ENV !== 'production' && res.status === 404) {
    nextRes.headers.set(
      'x-archpad-ory-proxy-hint',
      'Upstream returned 404. Check NEXT_PUBLIC_ORY_SDK_URL: it must point to Kratos PUBLIC endpoint (e.g. https://kratos.<ip>.sslip.io or whatever KRATOS_HOST is).'
    )
  }
  return nextRes
}

