import { NextResponse } from "next/server"

import { setTokensCookies } from "@/lib/auth/oauth"
import { passwordLogin } from "@/lib/auth/keycloak"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: any
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const username = String(payload?.email ?? payload?.username ?? "").trim()
  const password = String(payload?.password ?? "")
  if (!username || !password) {
    return NextResponse.json({ error: "Missing email/password" }, { status: 400 })
  }

  try {
    const tokens = await passwordLogin({ username, password })
    await setTokensCookies({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken })
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    const message = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ error: "login_failed", message }, { status: 401 })
  }
}

