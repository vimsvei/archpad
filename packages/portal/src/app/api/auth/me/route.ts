import { NextResponse } from "next/server"

import { getAccessTokenFromCookies } from "@/lib/auth/oauth"

export const runtime = "nodejs"

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split(".")
  if (parts.length < 2) return null
  const payload = parts[1]
  try {
    const json = Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8")
    return JSON.parse(json) as Record<string, unknown>
  } catch {
    return null
  }
}

export async function GET() {
  const token = await getAccessTokenFromCookies()
  if (!token) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  const claims = decodeJwtPayload(token)
  if (!claims) return NextResponse.json({ error: "invalid_token" }, { status: 401 })

  const email =
    typeof claims.email === "string"
      ? claims.email
      : typeof claims.preferred_username === "string"
        ? claims.preferred_username
        : null

  return NextResponse.json({
    ok: true,
    email,
    name: typeof claims.name === "string" ? claims.name : null,
    given_name: typeof claims.given_name === "string" ? claims.given_name : null,
    family_name: typeof claims.family_name === "string" ? claims.family_name : null,
    preferred_username: typeof claims.preferred_username === "string" ? claims.preferred_username : null,
    roles:
      claims.realm_access && typeof claims.realm_access === "object"
        ? (() => {
            const ra = claims.realm_access as Record<string, unknown>
            const roles = ra.roles
            return Array.isArray(roles) ? roles : null
          })()
        : null,
  })
}

