import { NextResponse } from "next/server"

import { createUser, sendExecuteActionsEmail } from "@/lib/auth/keycloak-admin"

export const runtime = "nodejs"

export async function POST(request: Request) {
  let payload: any
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const email = String(payload?.email ?? "").trim().toLowerCase()
  const password = String(payload?.password ?? "")
  const firstName = String(payload?.firstName ?? "").trim()
  const lastName = String(payload?.lastName ?? "").trim()
  const phone = String(payload?.phone ?? "").trim()

  if (!email || !password) {
    return NextResponse.json({ error: "Missing email/password" }, { status: 400 })
  }

  try {
    await createUser({ email, password, firstName: firstName || undefined, lastName: lastName || undefined, phone: phone || undefined })
    // Optional: immediately send verify email if SMTP is configured.
    await sendExecuteActionsEmail({ email, actions: ["VERIFY_EMAIL"] }).catch(() => {})
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    const message = e instanceof Error ? e.message : String(e)
    const status = message === "user_already_exists" ? 409 : 500
    return NextResponse.json({ error: "register_failed", message }, { status })
  }
}

