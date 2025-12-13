import { NextRequest, NextResponse } from 'next/server'

function getOryBaseUrl(): URL | null {
  const raw = process.env.NEXT_PUBLIC_ORY_SDK_URL
  if (!raw) return null
  try {
    return new URL(raw)
  } catch {
    return null
  }
}

function toRelativeHref(rawHref: string): string {
  // Convert absolute URLs from Kratos (e.g. https://kratos.../self-service/logout?token=...)
  // into same-origin relative paths so they always go through our portal proxy/middleware.
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

function forwardedHeaders(request: NextRequest): Headers {
  const headers = new Headers()

  const cookie = request.headers.get('cookie')
  if (cookie) headers.set('cookie', cookie)

  const ua = request.headers.get('user-agent')
  if (ua) headers.set('user-agent', ua)

  headers.set('accept', 'application/json')
  return headers
}

export async function GET(request: NextRequest) {
  const base = getOryBaseUrl()
  if (!base) {
    return NextResponse.json(
      { error: 'NEXT_PUBLIC_ORY_SDK_URL is not configured' },
      { status: 500 }
    )
  }

  const target = new URL(base.toString())
  target.pathname = '/self-service/logout/browser'

  // Optional return_to passthrough
  const returnTo = request.nextUrl.searchParams.get('return_to')
  if (returnTo) target.searchParams.set('return_to', returnTo)

  const res = await fetch(target, {
    method: 'GET',
    headers: forwardedHeaders(request),
    credentials: 'include',
    redirect: 'manual',
  })

  const ct = res.headers.get('content-type') ?? ''

  // Typical: 200 JSON { logout_url }
  if (ct.includes('application/json')) {
    try {
      const data: any = await res.json()
      if (data?.logout_url) {
        return NextResponse.json({ logout_url: toRelativeHref(String(data.logout_url)) })
      }
    } catch {
      // ignore
    }
  }

  // Some deployments respond with a redirect; surface it as logout_url.
  if (res.status >= 300 && res.status < 400) {
    const loc = res.headers.get('location')
    if (loc) return NextResponse.json({ logout_url: toRelativeHref(loc) })
  }

  const text = await res.text().catch(() => '')
  if (process.env.NODE_ENV !== 'production') {
    console.error('Ory logout proxy error:', {
      url: target.toString(),
      status: res.status,
      contentType: ct,
      body: text,
    })
  }

  return NextResponse.json(
    { error: 'Failed to initialize logout', status: res.status },
    { status: 500 }
  )
}

