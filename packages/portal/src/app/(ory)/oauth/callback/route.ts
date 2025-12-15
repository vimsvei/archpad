import { NextResponse } from "next/server"

import {
  clearOAuthTempCookies,
  readOAuthTempCookies,
  setTokensCookies,
} from "@/lib/auth/oauth"

type TokenResponse = {
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in?: number
  scope?: string
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const error = url.searchParams.get("error")

  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  if (!code || !state) {
    return NextResponse.json({ error: "Missing code/state" }, { status: 400 })
  }

  const hydraPublicUrl = process.env.NEXT_PUBLIC_HYDRA_PUBLIC_URL
  const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET
  const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI
  if (!hydraPublicUrl || !clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "OAuth2 env is missing (NEXT_PUBLIC_HYDRA_PUBLIC_URL, NEXT_PUBLIC_OAUTH_CLIENT_ID, NEXT_PUBLIC_OAUTH_REDIRECT_URI)",
      },
      { status: 500 }
    )
  }

  const tmp = await readOAuthTempCookies()
  if (!tmp.state || !tmp.verifier || tmp.state !== state) {
    await clearOAuthTempCookies()
    return NextResponse.json({ error: "Invalid state" }, { status: 400 })
  }

  const tokenUrl = new URL("/oauth2/token", hydraPublicUrl)
  const body = new URLSearchParams()
  body.set("grant_type", "authorization_code")
  body.set("code", code)
  body.set("redirect_uri", redirectUri)
  body.set("client_id", clientId)
  body.set("code_verifier", tmp.verifier)

  const res = await fetch(tokenUrl.toString(), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      ...(clientSecret
        ? {
            authorization: `Basic ${Buffer.from(
              `${clientId}:${clientSecret}`
            ).toString("base64")}`,
          }
        : {}),
    },
    body: body.toString(),
    cache: "no-store",
  })

  const json = (await res.json()) as Partial<TokenResponse> & {
    error?: string
    error_description?: string
  }
  if (!res.ok || !json.access_token) {
    await clearOAuthTempCookies()
    return NextResponse.json(
      {
        error: json.error ?? "token_exchange_failed",
        error_description: json.error_description,
        status: res.status,
      },
      { status: 400 }
    )
  }

  await setTokensCookies({ accessToken: json.access_token, refreshToken: json.refresh_token })
  await clearOAuthTempCookies()

  // Next expects an absolute URL for redirects from route handlers.
  // Also avoid open-redirect: allow only same-origin absolute URLs; otherwise treat as relative.
  const rawReturnTo = tmp.returnTo ?? "/dashboard"
  const forwardedProto = request.headers.get("x-forwarded-proto")
  const forwardedHost = request.headers.get("x-forwarded-host")
  const host = forwardedHost ?? request.headers.get("host")
  const origin = host ? `${forwardedProto ?? url.protocol.replace(":", "")}://${host}` : url.origin

  let target: URL
  try {
    target = new URL(rawReturnTo)
    if (target.origin !== origin) target = new URL("/dashboard", origin)
  } catch {
    target = new URL(rawReturnTo, origin)
  }
  return NextResponse.redirect(target)
}
