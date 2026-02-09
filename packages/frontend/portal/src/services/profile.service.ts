/**
 * Profile service - fetches full profile from /api/auth/me.
 * Auth-service assembles Keycloak claims + tenant profile.
 */

export type FullProfile = {
  keycloakId: string | null
  email: string | null
  name: string | null
  given_name: string | null
  family_name: string | null
  preferred_username: string | null
  roles: string[] | null
  groups: string[] | null
  profile: {
    id: string
    keycloakId?: string | null
    code?: string | null
    middleName?: string | null
    position?: string | null
    department?: string | null
  } | null
}

export async function getProfileFromMe(): Promise<FullProfile | null> {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    credentials: "include",
    headers: { accept: "application/json" },
  })
  if (res.status === 401 || res.status === 403) return null
  if (!res.ok) throw new Error(`profile_fetch_failed: ${res.status}`)
  const json = await res.json().catch(() => null)
  if (!json) return null
  return json as FullProfile
}
