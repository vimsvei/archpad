type TokenResponse = {
  access_token: string
  expires_in?: number
  token_type: string
}

function getKeycloakBaseUrl(): string {
  const internal = process.env.KEYCLOAK_INTERNAL_URL?.trim()
  const external = process.env.NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL?.trim()
  const defaultInternal = "http://keycloak.secure.svc:8080"
  const url =
    process.env.NODE_ENV === "production"
      ? internal || defaultInternal || external
      : external || internal
  if (!url) throw new Error("KEYCLOAK_INTERNAL_URL or NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL must be set")
  return url
}

function getRealm(): string {
  return process.env.KEYCLOAK_REALM?.trim() || "archpad"
}

function getServiceClientId(): string {
  return process.env.KEYCLOAK_SERVICE_CLIENT_ID?.trim() || "portal-admin"
}

function getServiceClientSecret(): string {
  const s = process.env.KEYCLOAK_SERVICE_CLIENT_SECRET?.trim()
  if (!s) {
    throw new Error("KEYCLOAK_SERVICE_CLIENT_SECRET must be set (service account client secret)")
  }
  return s
}

async function getServiceAccessToken(): Promise<string> {
  const base = getKeycloakBaseUrl()
  const realm = getRealm()
  const tokenUrl = new URL(`/realms/${realm}/protocol/openid-connect/token`, base)
  const clientId = getServiceClientId()
  const clientSecret = getServiceClientSecret()

  const body = new URLSearchParams()
  body.set("grant_type", "client_credentials")

  const res = await fetch(tokenUrl.toString(), {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: body.toString(),
    cache: "no-store",
  })

  const json = (await res.json()) as Partial<TokenResponse> & {
    error?: string
    error_description?: string
  }
  if (!res.ok || !json.access_token) {
    throw new Error(json.error_description ?? json.error ?? `client_credentials_failed (${res.status})`)
  }
  return json.access_token
}

export async function createUser(input: {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
}): Promise<void> {
  const token = await getServiceAccessToken()
  const base = getKeycloakBaseUrl()
  const realm = getRealm()
  const url = new URL(`/admin/realms/${realm}/users`, base)

  const body: Record<string, unknown> = {
    username: input.email,
    email: input.email,
    firstName: input.firstName || undefined,
    lastName: input.lastName || undefined,
    enabled: true,
    emailVerified: false,
    attributes: input.phone ? { phone: [input.phone] } : {},
    credentials: [{ type: "password", value: input.password, temporary: false }],
  }

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  })

  // 201 Created, or 409 if user exists
  if (res.status === 409) {
    throw new Error("user_already_exists")
  }
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`create_user_failed (${res.status}) ${text.slice(0, 300)}`)
  }
}

async function findUserIdByEmail(email: string): Promise<string | null> {
  const token = await getServiceAccessToken()
  const base = getKeycloakBaseUrl()
  const realm = getRealm()
  const url = new URL(`/admin/realms/${realm}/users`, base)
  url.searchParams.set("email", email)
  url.searchParams.set("exact", "true")

  const res = await fetch(url.toString(), {
    headers: { authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (!res.ok) return null
  const json = (await res.json()) as Array<{ id?: string; email?: string }> | unknown
  if (!Array.isArray(json)) return null
  const u = json.find((x) => x && typeof x === "object" && (x as any).email === email)
  return u && typeof (u as any).id === "string" ? (u as any).id : null
}

export async function sendExecuteActionsEmail(input: {
  email: string
  actions: Array<"UPDATE_PASSWORD" | "VERIFY_EMAIL">
}): Promise<void> {
  // Always behave as if it succeeded (avoid user enumeration).
  const userId = await findUserIdByEmail(input.email)
  if (!userId) return

  const token = await getServiceAccessToken()
  const base = getKeycloakBaseUrl()
  const realm = getRealm()
  const url = new URL(`/admin/realms/${realm}/users/${userId}/execute-actions-email`, base)

  const redirectUri = process.env.NEXT_PUBLIC_URL?.trim()
  if (redirectUri) url.searchParams.set("redirect_uri", redirectUri)
  url.searchParams.set("client_id", process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID?.trim() || "portal")

  const res = await fetch(url.toString(), {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input.actions),
    cache: "no-store",
  })

  // 204 No Content is typical
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`execute_actions_failed (${res.status}) ${text.slice(0, 300)}`)
  }
}

