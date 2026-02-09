import { NextResponse } from "next/server"

import { clearSessionCookie, getSessionIdFromCookies } from "@/lib/auth/oauth"
import { authServiceMe } from "@/lib/auth/auth-service"

export const runtime = "nodejs"

const TENANT_COOKIE_NAME = "archpad_tenant_id"
const TENANT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const TENANT_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: TENANT_COOKIE_MAX_AGE,
}

export async function GET() {
  const sessionId = await getSessionIdFromCookies()
  if (!sessionId) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  try {
    const me = await authServiceMe({ sessionId })
    const response = NextResponse.json(me)
    const tenantId = typeof me?.tenantId === "string" && me.tenantId ? me.tenantId : null
    if (tenantId) {
      response.cookies.set(TENANT_COOKIE_NAME, tenantId, TENANT_COOKIE_OPTIONS)
    } else {
      response.cookies.delete(TENANT_COOKIE_NAME)
    }
    return response
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    await clearSessionCookie()
    const response = NextResponse.json({ error: "unauthorized", message }, { status: 401 })
    response.cookies.delete(TENANT_COOKIE_NAME)
    return response
  }
}

