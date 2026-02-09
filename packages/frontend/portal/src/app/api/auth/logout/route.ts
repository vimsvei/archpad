import { NextResponse } from "next/server"

import { clearSessionCookie, getSessionIdFromCookies } from "@/lib/auth/oauth"
import { authServiceLogout } from "@/lib/auth/auth-service"

export const runtime = "nodejs"

const TENANT_COOKIE_NAME = "archpad_tenant_id"

export async function POST() {
  const sessionId = await getSessionIdFromCookies()
  try {
    if (sessionId) await authServiceLogout({ sessionId })
  } catch {
    // ignore upstream logout failures; we still clear local cookies
  }
  await clearSessionCookie()
  const response = NextResponse.json({ ok: true })
  response.cookies.delete(TENANT_COOKIE_NAME)
  return response
}

