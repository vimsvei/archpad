import { cookies } from "next/headers"
import type { NextResponse } from "next/server"

const ACCESS_TOKEN_COOKIE = "archpad_access_token"
const REFRESH_TOKEN_COOKIE = "archpad_refresh_token"
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

export async function getAccessTokenFromCookies() {
  const c = await cookies()
  return c.get(ACCESS_TOKEN_COOKIE)?.value ?? null
}

export async function getRefreshTokenFromCookies() {
  const c = await cookies()
  return c.get(REFRESH_TOKEN_COOKIE)?.value ?? null
}

export function setTokensOnResponse(
  response: NextResponse,
  input: { accessToken: string; refreshToken?: string }
) {
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  response.cookies.set(ACCESS_TOKEN_COOKIE, input.accessToken, { ...opts, maxAge: 15 * 60 })
  if (input.refreshToken) {
    response.cookies.set(REFRESH_TOKEN_COOKIE, input.refreshToken, {
      ...opts,
      maxAge: 60 * 60 * 24 * 30,
    })
  }
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

export async function setTokensCookies(input: { accessToken: string; refreshToken?: string }) {
  const c = await cookies()
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  c.set(ACCESS_TOKEN_COOKIE, input.accessToken, { ...opts, maxAge: 15 * 60 })
  if (input.refreshToken) {
    c.set(REFRESH_TOKEN_COOKIE, input.refreshToken, { ...opts, maxAge: 60 * 60 * 24 * 30 })
  }
}

export async function clearTokensCookies() {
  const c = await cookies()
  const opts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  }
  c.set(ACCESS_TOKEN_COOKIE, "", { ...opts, maxAge: 0 })
  c.set(REFRESH_TOKEN_COOKIE, "", { ...opts, maxAge: 0 })
}

