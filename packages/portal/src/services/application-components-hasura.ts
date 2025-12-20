import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"

type HasuraComponentRow = {
  id: string
  code: string
  name: string
  description: string | null
  state?: { name: string; color?: string | null } | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}

export type GetApplicationComponentsParams = {
  search?: string
  page?: number
  pageSize?: number
}

function mapRow(row: HasuraComponentRow): ApplicationComponent {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description,
    state: row.state,
    createdAt: row.createdAt ?? null,
    createdBy: row.createdBy ?? null,
    updatedAt: row.updatedAt ?? null,
    updatedBy: row.updatedBy ?? null,
  }
}

export async function getApplicationComponentsHasura(
  params: GetApplicationComponentsParams
): Promise<Paginated<ApplicationComponent>> {
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const offset = (page - 1) * pageSize

  const search = (params.search ?? "").trim()
  const where = search ? { name: { _ilike: `%${search}%` } } : {}

  const query = await loadGql("application-components/get-components.gql")
  const data = await graphqlRequest<
    {
      components: HasuraComponentRow[]
      components_aggregate: { aggregate: { count: number } }
    },
    { where: Record<string, unknown>; limit: number; offset: number }
  >(query, { where, limit: pageSize, offset })

  const rows = data.components
  const total = data.components_aggregate?.aggregate?.count ?? 0
  const safeRows = Array.isArray(rows) ? rows : []
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  return {
    items: safeRows.map(mapRow),
    total,
    page,
    pageSize,
    pageCount,
  }
}

export async function getApplicationComponentHasura(id: string): Promise<ApplicationComponent> {
  const query = await loadGql("application-components/get-component-by-pk.gql")
  const data = await graphqlRequest<{ components_by_pk: HasuraComponentRow | null }, { id: string }>(
    query,
    { id }
  )
  const row = data.components_by_pk
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}


