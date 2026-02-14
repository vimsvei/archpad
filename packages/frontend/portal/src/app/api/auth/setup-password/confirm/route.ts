import { NextResponse } from "next/server"

import { authServiceSetupPasswordConfirm } from "@/lib/auth/auth-service"

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

  const token = String(obj.token ?? "").trim()
  const password = String(obj.password ?? "")
  if (!token || !password) {
    return NextResponse.json({ error: "Missing token/password" }, { status: 400 })
  }

  try {
    await authServiceSetupPasswordConfirm({ token, password })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Invalid or expired token"
    return NextResponse.json({ error: message }, { status: 401 })
  }
}
