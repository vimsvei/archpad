/**
 * Tenant-service REST API (internal user profiles).
 * Uses /api/rest proxy with JWT via cookies.
 */

import { restRequest } from "@/services/http/rest-service"

const TENANT_SERVICE = "tenant-service"

export type UserProfileByKeycloakId = {
  id: string
  code?: string
  keycloakId?: string
  displayName?: string
}

export async function getUserProfileByKeycloakId(
  keycloakId: string
): Promise<UserProfileByKeycloakId | null> {
  const trimmed = String(keycloakId ?? "").trim()
  if (!trimmed) return null
  try {
    const data = await restRequest<UserProfileByKeycloakId>([
      TENANT_SERVICE,
      "internal",
      "user-profiles",
      "by-keycloak-id",
      trimmed,
    ])
    return data
  } catch {
    return null
  }
}
