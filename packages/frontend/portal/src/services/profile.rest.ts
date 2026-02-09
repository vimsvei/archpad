/**
 * Profile REST API.
 * - Full profile: from /api/auth/me (auth-service assembles Keycloak + tenant)
 * - Update: tenant-service PATCH /internal/user-profiles/me
 */

import { restRequest } from "@/services/http/rest-service"

const TENANT_SERVICE = "tenant-service"

export type ProfileUpdateInput = {
  middleName?: string
  position?: string
  department?: string
}

export type ProfileUpdateResult = {
  id: string
  code?: string
  keycloakId?: string
  displayName?: string
  middleName?: string
  position?: string
  department?: string
}

export async function updateProfileRest(
  input: ProfileUpdateInput
): Promise<ProfileUpdateResult> {
  return restRequest<ProfileUpdateResult>(
    [TENANT_SERVICE, "internal", "user-profiles", "me"],
    {
      method: "PATCH",
      body: input,
    }
  )
}
