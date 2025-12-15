import { NextResponse } from "next/server"

import { getAccessTokenFromCookies } from "@/lib/auth/oauth"

function getApiGatewayBaseUrl(): string {
  // Prefer internal Docker network URL if present; fallback to localhost-style.
  return process.env.API_GATEWAY_INTERNAL_URL ?? "http://oathkeeper:4455"
}

async function proxy(request: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await ctx.params

  const base = getApiGatewayBaseUrl()
  const inUrl = new URL(request.url)
  const target = new URL(base)
  target.pathname = `/rest/${path.join("/")}`
  target.search = inUrl.search

  const token = await getAccessTokenFromCookies()

  // Forward selected headers.
  const headers = new Headers()
  const contentType = request.headers.get("content-type")
  if (contentType) headers.set("content-type", contentType)
  const accept = request.headers.get("accept")
  if (accept) headers.set("accept", accept)
  if (token) headers.set("authorization", `Bearer ${token}`)

  const method = request.method.toUpperCase()
  const body =
    method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer().catch(() => undefined)

  const res = await fetch(target, {
    method,
    headers,
    body,
    cache: "no-store",
  })

  const outHeaders = new Headers()
  const outCt = res.headers.get("content-type")
  if (outCt) outHeaders.set("content-type", outCt)

  const buf = await res.arrayBuffer()
  return new NextResponse(buf, { status: res.status, headers: outHeaders })
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


