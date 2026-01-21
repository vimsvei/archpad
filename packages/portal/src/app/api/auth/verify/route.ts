import { NextResponse } from "next/server"

import { sendExecuteActionsEmail } from "@/lib/auth/keycloak-admin"

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
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 })

  await sendExecuteActionsEmail({ email, actions: ["VERIFY_EMAIL"] }).catch(() => {})
  return NextResponse.json({ ok: true })
}

