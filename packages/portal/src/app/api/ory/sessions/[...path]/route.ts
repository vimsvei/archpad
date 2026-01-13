import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function getOryBaseUrl(): URL | null {
  // Для серверных компонентов приоритет у внутренних адресов
  const raw = process.env.ORY_KRATOS_INTERNAL_URL ?? process.env.NEXT_PUBLIC_ORY_SDK_URL
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
  const proto = request.headers.get('x-forwarded-proto') ?? 'https'
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

function copyResponseHeaders(from: Response, to: NextResponse) {
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
    for (const c of setCookies) to.headers.append('set-cookie', c)
    return
  }

  const single = from.headers.get('set-cookie')
  if (single) to.headers.set('set-cookie', single)
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

  const res = await fetch(target, init)

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
  copyResponseHeaders(res, nextRes)

  if (process.env.NODE_ENV !== 'production' && res.status === 404) {
    nextRes.headers.set(
      'x-archpad-ory-proxy-hint',
      'Upstream returned 404. Check NEXT_PUBLIC_ORY_SDK_URL: it must point to Kratos PUBLIC endpoint (e.g. https://kratos.<ip>.sslip.io or whatever KRATOS_HOST is).'
    )
  }
  return nextRes
}

