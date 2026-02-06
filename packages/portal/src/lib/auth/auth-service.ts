import "server-only"

type LoginResponse = { sessionId: string }
type AccessResponse = { accessToken: string }
type MeResponse = {
  ok: true
  keycloakId?: string | null
  email: string | null
  name: string | null
  given_name: string | null
  family_name: string | null
  preferred_username: string | null
  roles: string[] | null
  groups: string[] | null
  profile?: unknown | null
}

function getAuthServiceBaseUrl(): string {
  // In-cluster: direct service URL. External: api.archpad.pro/rest/auth-service (Oathkeeper).
  const internal = process.env.AUTH_SERVICE_INTERNAL_URL?.trim()
  const external = process.env.AUTH_SERVICE_PUBLIC_URL?.trim()
  const defaultInternal = "http://auth-service.platform.svc:3000"
  const defaultExternal = "https://api.archpad.pro/rest/auth-service"
  const url =
    process.env.NODE_ENV === "production"
      ? internal || defaultInternal
      : internal || external || defaultExternal
  if (!url) throw new Error("AUTH_SERVICE_INTERNAL_URL or AUTH_SERVICE_PUBLIC_URL must be set")
  return url
}

function getInternalServiceToken(): string | null {
  const t = process.env.INTERNAL_SERVICE_TOKEN?.trim()
  return t ? t : null
}

async function postJson<T>(
  path: string,
  body: Record<string, unknown>,
  options?: { headers?: Record<string, string> }
): Promise<T> {
  const base = getAuthServiceBaseUrl()
  // path like /auth/register: with base .../rest/auth-service, new URL(path, base) treats
  // path as absolute and yields .../auth/register (wrong). Use relative path so it appends.
  const baseWithSlash = base.endsWith("/") ? base : `${base}/`
  const relativePath = path.startsWith("/") ? path.slice(1) : path
  const url = new URL(relativePath, baseWithSlash)
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "content-type": "application/json", ...(options?.headers ?? {}) },
    body: JSON.stringify(body),
    cache: "no-store",
  })
  const json = (await res.json().catch(() => ({}))) as any
  if (!res.ok) {
    const message = typeof json?.message === "string" ? json.message : `auth_service_failed (${res.status})`
    throw new Error(message)
  }
  return json as T
}

export async function authServiceLogin(input: { username: string; password: string }): Promise<LoginResponse> {
  return postJson<LoginResponse>("/auth/login", input)
}

export async function authServiceSessionAccess(input: { sessionId: string }): Promise<AccessResponse> {
  const token = getInternalServiceToken()
  if (!token) throw new Error("INTERNAL_SERVICE_TOKEN must be set")
  return postJson<AccessResponse>("/auth/session/access", input, {
    headers: { "x-internal-token": token },
  })
}

export async function authServiceMe(input: { sessionId: string }): Promise<MeResponse> {
  return postJson<MeResponse>("/auth/me", input)
}

export async function authServiceLogout(input: { sessionId: string }): Promise<void> {
  await postJson<{ ok: true }>("/auth/logout", input)
}

export async function authServiceRegister(input: {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
}): Promise<void> {
  await postJson<{ ok: true }>("/auth/register", input)
}

export async function authServiceRecovery(input: { email: string }): Promise<void> {
  await postJson<{ ok: true }>("/auth/recovery", input)
}

export async function authServiceVerify(input: { email: string }): Promise<void> {
  await postJson<{ ok: true }>("/auth/verify", input)
}

export async function authServiceVerifyEmailConfirm(input: {
  token: string
}): Promise<void> {
  await postJson<{ ok: true }>("/auth/verify-email/confirm", input)
}

