type TokenResponse = {
  access_token: string
  refresh_token?: string
  token_type: string
  expires_in?: number
  refresh_expires_in?: number
  scope?: string
}

function getKeycloakBaseUrl(): string {
  // In production (in-cluster) prefer internal URL; in local dev prefer public URL.
  const internal = process.env.KEYCLOAK_INTERNAL_URL?.trim()
  const external = process.env.NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL?.trim()
  const defaultInternal = "http://keycloak.secure.svc:8080"
  const url =
    process.env.NODE_ENV === "production"
      ? internal || defaultInternal || external
      : external || internal
  if (!url) {
    throw new Error("KEYCLOAK_INTERNAL_URL or NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL must be set")
  }
  return url
}

function getRealm(): string {
  return process.env.KEYCLOAK_REALM?.trim() || "archpad"
}

function getClientId(): string {
  return process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID?.trim() || "portal"
}

function getClientSecret(): string | undefined {
  const s = process.env.KEYCLOAK_CLIENT_SECRET?.trim()
  return s ? s : undefined
}

async function tokenRequest(body: URLSearchParams): Promise<{ accessToken: string; refreshToken?: string }> {
  const base = getKeycloakBaseUrl()
  const realm = getRealm()
  const tokenUrl = new URL(`/realms/${realm}/protocol/openid-connect/token`, base)

  const clientId = getClientId()
  const clientSecret = getClientSecret()

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
    throw new Error(json.error_description ?? json.error ?? `token_request_failed (${res.status})`)
  }

  return { accessToken: json.access_token, refreshToken: json.refresh_token }
}

export async function passwordLogin(input: {
  username: string
  password: string
  scope?: string
}): Promise<{ accessToken: string; refreshToken?: string }> {
  const body = new URLSearchParams()
  body.set("grant_type", "password")
  body.set("username", input.username)
  body.set("password", input.password)
  body.set("scope", input.scope ?? "openid profile email offline_access")
  return tokenRequest(body)
}

export async function exchangeRefreshToken(input: {
  refreshToken: string
}): Promise<{ accessToken: string; refreshToken?: string }> {
  const body = new URLSearchParams()
  body.set("grant_type", "refresh_token")
  body.set("refresh_token", input.refreshToken)
  return tokenRequest(body)
}

export async function logoutRefreshToken(input: { refreshToken: string }): Promise<void> {
  const base = getKeycloakBaseUrl()
  const realm = getRealm()
  const clientId = getClientId()
  const clientSecret = getClientSecret()

  const url = new URL(`/realms/${realm}/protocol/openid-connect/logout`, base)
  const body = new URLSearchParams()
  body.set("client_id", clientId)
  body.set("refresh_token", input.refreshToken)

  const res = await fetch(url.toString(), {
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

  // Keycloak typically returns 204; 400 if token already invalidated.
  if (!res.ok && res.status !== 400) {
    const text = await res.text().catch(() => "")
    throw new Error(`logout_failed (${res.status}) ${text.slice(0, 200)}`)
  }
}

