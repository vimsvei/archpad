import { NextResponse } from "next/server"

import { generateRandomString, setOAuthTempCookies, sha256Base64Url } from "@/lib/auth/oauth"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const returnTo = url.searchParams.get("return_to") ?? "/dashboard"

  const hydraPublicUrl = process.env.NEXT_PUBLIC_HYDRA_PUBLIC_URL
  const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
  const redirectUri = process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI
  const scope = process.env.NEXT_PUBLIC_OAUTH_SCOPE ?? "openid offline_access"

  if (!hydraPublicUrl || !clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "OAuth2 env is missing (NEXT_PUBLIC_HYDRA_PUBLIC_URL, NEXT_PUBLIC_OAUTH_CLIENT_ID, NEXT_PUBLIC_OAUTH_REDIRECT_URI)",
      },
      { status: 500 }
    )
  }

  const state = generateRandomString(32)
  const verifier = generateRandomString(32)
  const challenge = await sha256Base64Url(verifier)
  setOAuthTempCookies({ state, verifier, returnTo })

  const authorize = new URL("/oauth2/auth", hydraPublicUrl)
  authorize.searchParams.set("client_id", clientId)
  authorize.searchParams.set("response_type", "code")
  authorize.searchParams.set("scope", scope)
  authorize.searchParams.set("redirect_uri", redirectUri)
  authorize.searchParams.set("state", state)
  authorize.searchParams.set("code_challenge", challenge)
  authorize.searchParams.set("code_challenge_method", "S256")

  return NextResponse.redirect(authorize.toString())
}
