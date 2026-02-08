import { NextResponse } from "next/server"

import { clearSessionCookie, getSessionIdFromCookies } from "@/lib/auth/oauth"
import { authServiceMe } from "@/lib/auth/auth-service"

export const runtime = "nodejs"

export async function GET() {
  const sessionId = await getSessionIdFromCookies()
  if (!sessionId) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  try {
    const me = await authServiceMe({ sessionId })
    return NextResponse.json(me)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    await clearSessionCookie()
    return NextResponse.json({ error: "unauthorized", message }, { status: 401 })
  }
}

