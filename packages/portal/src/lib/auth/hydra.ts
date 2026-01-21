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
  // Legacy Hydra helper kept for compatibility; migrated to Keycloak.
  // NOTE: New code should import from "@/lib/auth/keycloak".
  const res = await import("./keycloak")
  return res.exchangeRefreshToken(input)
}


