import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"

type HasuraComponentRow = {
  id: string
  code: string
  name: string
  description: string | null
}

type ComponentsListData = {
  components: HasuraComponentRow[]
  components_aggregate: { aggregate: { count: number } | null }
}

type ComponentByPkData = {
  components_by_pk: HasuraComponentRow | null
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
    ComponentsListData,
    { where: Record<string, unknown>; limit: number; offset: number }
  >(query, { where, limit: pageSize, offset })

  const total = data.components_aggregate.aggregate?.count ?? 0
  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  return {
    items: data.components.map(mapRow),
    total,
    page,
    pageSize,
    pageCount,
  }
}

export async function getApplicationComponentHasura(id: string): Promise<ApplicationComponent> {
  const query = await loadGql("application-components/get-component-by-pk.gql")
  const data = await graphqlRequest<ComponentByPkData, { id: string }>(query, { id })
  if (!data.components_by_pk) throw new Error("Item not found")
  return mapRow(data.components_by_pk)
}


