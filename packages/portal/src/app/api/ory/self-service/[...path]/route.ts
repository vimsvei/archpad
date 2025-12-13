import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function getOryBaseUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_ORY_SDK_URL
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

function rewriteSelfServiceLocation(rawLocation: string): string {
  const href = normalizeHref(rawLocation)
  if (!href.startsWith('/self-service/')) return href

  let pathname = href
  let search = ''
  let hash = ''
  try {
    const u = new URL(href, 'https://local.invalid')
    pathname = u.pathname
    search = u.search
    hash = u.hash
  } catch {
    const qIdx = href.indexOf('?')
    const hIdx = href.indexOf('#')
    const endPath = qIdx === -1 ? (hIdx === -1 ? href.length : hIdx) : qIdx
    pathname = href.slice(0, endPath)
    search = qIdx === -1 ? '' : href.slice(qIdx, hIdx === -1 ? href.length : hIdx)
    hash = hIdx === -1 ? '' : href.slice(hIdx)
  }

  const params = new URLSearchParams(search)
  const flow = params.get('flow')

  const map: Array<[string, string]> = [
    ['/self-service/login', '/sign-in'],
    ['/self-service/registration', '/sign-up'],
    ['/self-service/recovery', '/recovery'],
    ['/self-service/verification', '/verify'],
  ]

  for (const [prefix, ui] of map) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      const out = new URL(ui, 'https://local.invalid')
      if (flow) out.searchParams.set('flow', flow)
      return `${out.pathname}${out.search}${hash}`
    }
  }

  return href
}

function setDeep(obj: any, path: string[], value: any) {
  let cur = obj
  for (let i = 0; i < path.length; i++) {
    const key = path[i]!
    const isLast = i === path.length - 1
    if (isLast) {
      cur[key] = value
      return
    }
    cur[key] ??= {}
    cur = cur[key]
  }
}

function buildJsonBodyFromFormData(form: FormData) {
  const out: any = {}

  for (const [rawKey, rawVal] of form.entries()) {
    if (rawVal instanceof File) continue
    const key = String(rawKey)
    const val = String(rawVal)

    if (key === 'traits.accepted_tos') {
      out.traits ??= {}
      out.traits.accepted_tos = val === 'on' ? true : val === 'true' ? true : false
      continue
    }

    if (key.startsWith('traits.')) {
      const segments = key.split('.').slice(1)
      out.traits ??= {}
      setDeep(out.traits, segments, val)
      continue
    }

    out[key] = val
  }

  if (out?.traits?.accepted_tos === false) {
    delete out.traits.accepted_tos
  }

  return out
}

function copyResponseHeaders(from: Response, to: NextResponse) {
  from.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') return
    if (key.toLowerCase() === 'location') {
      to.headers.set(key, rewriteSelfServiceLocation(value))
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
      { error: 'NEXT_PUBLIC_ORY_SDK_URL is not configured' },
      { status: 500 }
    )
  }

  const { path } = await ctx.params
  const target = new URL(base.toString())
  target.pathname = `/self-service/${(path ?? []).join('/')}`
  target.search = request.nextUrl.search

  const method = request.method.toUpperCase()
  const hasBody = !(method === 'GET' || method === 'HEAD')
  const headers = forwardedHeaders(request)

  const contentType = request.headers.get('content-type') ?? ''
  let body: any = undefined

  if (hasBody && contentType.includes('application/x-www-form-urlencoded')) {
    const raw = await request.text()
    const params = new URLSearchParams(raw)

    // HTML checkbox default value is "on". Kratos expects boolean for accepted_tos.
    if (params.get('traits.accepted_tos') === 'on') {
      params.set('traits.accepted_tos', 'true')
    }

    body = params.toString()
    headers.set('content-type', 'application/x-www-form-urlencoded')
    headers.delete('content-length')
  } else {
    body = hasBody ? await request.arrayBuffer() : undefined
  }

  const init: any = {
    method,
    headers,
    redirect: 'manual',
  }
  if (hasBody) {
    init.body = body
    init.duplex = 'half'
  }

  const res = await fetch(target, init)

  if (process.env.NODE_ENV !== 'production' && res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location')
    if (loc) {
      console.warn('Ory proxy redirect:', {
        url: target.toString(),
        status: res.status,
        location: loc,
        rewritten: rewriteSelfServiceLocation(loc),
      })
    }
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
  copyResponseHeaders(res, nextRes)
  return nextRes
}

