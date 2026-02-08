import { NextResponse } from "next/server"

import { setSessionCookie } from "@/lib/auth/oauth"
import { authServiceLogin } from "@/lib/auth/auth-service"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }
  const obj = payload as Record<string, unknown>

  const username = String(obj.email ?? obj.username ?? "").trim()
  const password = String(obj.password ?? "")
  if (!username || !password) {
    return NextResponse.json({ error: "Missing email/password" }, { status: 400 })
  }

  try {
    const res = await authServiceLogin({ username, password })
    await setSessionCookie({ sessionId: res.sessionId })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: "login_failed", message }, { status: 401 })
  }
}

