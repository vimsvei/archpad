type TokenResponse = {
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in?: number
  scope?: string
}

export async function exchangeRefreshToken(input: {
  refreshToken: string
}): Promise<{ accessToken: string; refreshToken?: string }> {
  const hydraPublicUrl = process.env.NEXT_PUBLIC_HYDRA_PUBLIC_URL
  const clientId = process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID
  const clientSecret = process.env.OAUTH_CLIENT_SECRET

  if (!hydraPublicUrl || !clientId) {
    throw new Error(
      "OAuth2 env is missing (NEXT_PUBLIC_HYDRA_PUBLIC_URL, NEXT_PUBLIC_OAUTH_CLIENT_ID)"
    )
  }

  const tokenUrl = new URL("/oauth2/token", hydraPublicUrl)
  const body = new URLSearchParams()
  body.set("grant_type", "refresh_token")
  body.set("refresh_token", input.refreshToken)
  body.set("client_id", clientId)

  const res = await fetch(tokenUrl.toString(), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      ...(clientSecret
        ? {
            authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
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
    throw new Error(
      json.error_description ??
        json.error ??
        `refresh_token_exchange_failed (${res.status})`
    )
  }

  return {
    accessToken: json.access_token,
    refreshToken: json.refresh_token,
  }
}


