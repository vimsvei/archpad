type LoginResponse = { sessionId: string }
type AccessResponse = { accessToken: string }
type MeResponse = {
  ok: true
  email: string | null
  name: string | null
  given_name: string | null
  family_name: string | null
  preferred_username: string | null
  roles: string[] | null
}

function getAuthServiceBaseUrl(): string {
  // In-cluster: use service DNS name. In dev: allow override.
  const internal = process.env.AUTH_SERVICE_INTERNAL_URL?.trim()
  const external = process.env.AUTH_SERVICE_PUBLIC_URL?.trim()
  const defaultInternal = "http://auth-service.platform.svc:3000"
  const url =
    process.env.NODE_ENV === "production" ? internal || defaultInternal : internal || external || defaultInternal
  if (!url) throw new Error("AUTH_SERVICE_INTERNAL_URL must be set")
  return url
}

async function postJson<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const base = getAuthServiceBaseUrl()
  const url = new URL(path, base)
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: { "content-type": "application/json" },
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
  return postJson<AccessResponse>("/auth/session/access", input)
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

