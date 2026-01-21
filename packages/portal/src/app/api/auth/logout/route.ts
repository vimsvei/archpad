import { NextResponse } from "next/server"

import { clearTokensCookies, getRefreshTokenFromCookies } from "@/lib/auth/oauth"
import { logoutRefreshToken } from "@/lib/auth/keycloak"

export const runtime = "nodejs"

export async function POST() {
  const refresh = await getRefreshTokenFromCookies()
  try {
    if (refresh) await logoutRefreshToken({ refreshToken: refresh })
  } catch {
    // ignore upstream logout failures; we still clear local cookies
  }
  await clearTokensCookies()
  return NextResponse.json({ ok: true })
}

