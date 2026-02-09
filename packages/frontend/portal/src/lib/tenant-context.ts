/**
 * Current tenant ID for the authenticated user.
 * Set by AuthProvider when user loads; read by GraphQL services to filter queries.
 */
let currentTenantId: string | null = null

export function getCurrentTenantId(): string | null {
  return currentTenantId
}

export function setCurrentTenantId(id: string | null): void {
  currentTenantId = id
}

/**
 * Merges tenantId into a Hasura where clause for tenant-scoped entities.
 * Returns the original where when no tenantId in context (backward compatibility).
 */
export function mergeTenantWhere<T extends Record<string, unknown>>(
  where: T
): T & { tenantId?: { _eq: string } } | T & { _and: [T, { tenantId: { _eq: string } }] } {
  const tenantId = getCurrentTenantId()
  if (!tenantId) return where
  const tenantClause = { tenantId: { _eq: tenantId } }
  const isEmpty = Object.keys(where).length === 0
  if (isEmpty) return tenantClause as T & { tenantId: { _eq: string } }
  return { _and: [where, tenantClause] } as T & { _and: [T, { tenantId: { _eq: string } }] }
}
