import { NextResponse } from "next/server"

import { clearTokensCookies, getRefreshTokenFromCookies } from "@/lib/auth/oauth"
import { authServiceLogout } from "@/lib/auth/auth-service"

export const runtime = "nodejs"

export async function POST() {
  const refresh = await getRefreshTokenFromCookies()
  try {
    if (refresh) await authServiceLogout({ refreshToken: refresh })
  } catch {
    // ignore upstream logout failures; we still clear local cookies
  }
  await clearTokensCookies()
  return NextResponse.json({ ok: true })
}

