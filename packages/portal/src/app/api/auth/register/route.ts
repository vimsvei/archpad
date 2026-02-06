import { NextResponse } from "next/server"

import { authServiceRegister } from "@/lib/auth/auth-service"
import { createContextLogger } from "@/lib/logger"

const log = createContextLogger("api.auth.register")

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

  const email = String(obj.email ?? "").trim().toLowerCase()
  const password = String(obj.password ?? "")
  const firstName = String(obj.firstName ?? "").trim()
  const lastName = String(obj.lastName ?? "").trim()
  const phone = String(obj.phone ?? "").trim()

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email/password" }, { status: 400 })
  }

  try {
    await authServiceRegister({ email, password, firstName: firstName || undefined, lastName: lastName || undefined, phone: phone || undefined })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e)
    const status = message === "user_already_exists" ? 409 : 500
    log.error(`authServiceRegister failed: ${message}`, undefined, e instanceof Error ? e.stack : undefined)
    return NextResponse.json({ error: "register_failed", message }, { status })
  }
}

