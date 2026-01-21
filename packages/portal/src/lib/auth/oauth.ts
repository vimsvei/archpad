import { cookies } from "next/headers"
import type { NextResponse } from "next/server"

const SESSION_COOKIE = "archpad_session"
const OAUTH_STATE_COOKIE = "archpad_oauth_state"
const OAUTH_VERIFIER_COOKIE = "archpad_oauth_verifier"
const OAUTH_RETURN_TO_COOKIE = "archpad_oauth_return_to"

function base64UrlEncode(input: Uint8Array) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

export function generateRandomString(bytes = 32) {
  const buf = crypto.getRandomValues(new Uint8Array(bytes))
  return base64UrlEncode(buf)
}

export async function sha256Base64Url(input: string) {
  const data = new TextEncoder().encode(input)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return base64UrlEncode(new Uint8Array(hash))
}

export async function getSessionIdFromCookies() {
  const c = await cookies()
  return c.get(SESSION_COOKIE)?.value ?? null
}

export function setSessionOnResponse(response: NextResponse, input: { sessionId: string }) {
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  // 30 days
  response.cookies.set(SESSION_COOKIE, input.sessionId, { ...opts, maxAge: 60 * 60 * 24 * 30 })
}

export function clearSessionOnResponse(response: NextResponse) {
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  response.cookies.set(SESSION_COOKIE, "", { ...opts, maxAge: 0 })
}

export async function setOAuthTempCookies(input: {
  state: string
  verifier: string
  returnTo: string
}) {
  const c = await cookies()
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  c.set(OAUTH_STATE_COOKIE, input.state, { ...opts, maxAge: 10 * 60 })
  c.set(OAUTH_VERIFIER_COOKIE, input.verifier, { ...opts, maxAge: 10 * 60 })
  c.set(OAUTH_RETURN_TO_COOKIE, input.returnTo, { ...opts, maxAge: 10 * 60 })
}

export async function readOAuthTempCookies() {
  const c = await cookies()
  return {
    state: c.get(OAUTH_STATE_COOKIE)?.value ?? null,
    verifier: c.get(OAUTH_VERIFIER_COOKIE)?.value ?? null,
    returnTo: c.get(OAUTH_RETURN_TO_COOKIE)?.value ?? null,
  }
}

export async function clearOAuthTempCookies() {
  const c = await cookies()
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  c.set(OAUTH_STATE_COOKIE, "", { ...opts, maxAge: 0 })
  c.set(OAUTH_VERIFIER_COOKIE, "", { ...opts, maxAge: 0 })
  c.set(OAUTH_RETURN_TO_COOKIE, "", { ...opts, maxAge: 0 })
}

export async function setSessionCookie(input: { sessionId: string }) {
  const c = await cookies()
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  c.set(SESSION_COOKIE, input.sessionId, { ...opts, maxAge: 60 * 60 * 24 * 30 })
}

export async function clearSessionCookie() {
  const c = await cookies()
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  c.set(SESSION_COOKIE, "", { ...opts, maxAge: 0 })
}

