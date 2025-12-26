import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import type {
  GetComponentByPkQuery,
  GetComponentByPkQueryVariables,
  GetComponentDataObjectsQuery,
  GetComponentDataObjectsQueryVariables,
  GetComponentEventsQuery,
  GetComponentEventsQueryVariables,
  GetComponentFunctionsQuery,
  GetComponentFunctionsQueryVariables,
  GetComponentInterfacesQuery,
  GetComponentInterfacesQueryVariables,
  GetComponentsQuery,
  GetComponentsQueryVariables,
} from "@/generated/operations"

type HasuraComponentRow =
  | GetComponentsQuery["components"][number]
  | NonNullable<GetComponentByPkQuery["components_by_pk"]>

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
    description: row.description ?? null,
    state: row.state,
    createdAt: row.createdAt ?? null,
    createdBy: row.createdBy ?? null,
    updatedAt: row.updatedAt ?? null,
    updatedBy: row.updatedBy ?? null,
  }
}

export async function getApplicationComponentsGraphql(
  params: GetApplicationComponentsParams
): Promise<Paginated<ApplicationComponent>> {
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const offset = (page - 1) * pageSize

  const search = (params.search ?? "").trim()
  const where: GetComponentsQueryVariables["where"] = search ? { name: { _ilike: `%${search}%` } } : {}

  const query = await loadGql("application-components/get-components.gql")
  const data = await graphqlRequest<GetComponentsQuery, GetComponentsQueryVariables>(query, {
    where,
    limit: pageSize,
    offset,
  })

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

export async function getApplicationComponentGraphql(id: string): Promise<ApplicationComponent> {
  const query = await loadGql("application-components/get-component-by-pk.gql")
  const data = await graphqlRequest<GetComponentByPkQuery, GetComponentByPkQueryVariables>(query, { id })
  const row = data.components_by_pk
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}

export async function getApplicationComponentDataObjectsGraphql(
  componentId: string
): Promise<Array<{ id: string; code: string; name: string; description?: string | null }>> {
  const query = await loadGql("application-components/get-component-data-objects.gql")
  const data = await graphqlRequest<GetComponentDataObjectsQuery, GetComponentDataObjectsQueryVariables>(query, {
    componentId,
  })
  return data.map_application_component_data_object.map((x) => x.dataObject)
}

export async function getApplicationComponentFunctionsGraphql(
  componentId: string
): Promise<Array<{ id: string; code: string; name: string; description?: string | null }>> {
  const query = await loadGql("application-components/get-component-functions.gql")
  const data = await graphqlRequest<GetComponentFunctionsQuery, GetComponentFunctionsQueryVariables>(query, {
    componentId,
  })
  return data.map_application_component_function.map((x) => x.function)
}

export async function getApplicationComponentEventsGraphql(
  componentId: string
): Promise<Array<{ id: string; code: string; name: string; description?: string | null }>> {
  const query = await loadGql("application-components/get-component-events.gql")
  const data = await graphqlRequest<GetComponentEventsQuery, GetComponentEventsQueryVariables>(query, { componentId })
  return data.map_application_component_event.map((x) => x.event)
}

export async function getApplicationComponentInterfacesGraphql(
  componentId: string
): Promise<Array<{ id: string; code: string; name: string; description?: string | null }>> {
  const query = await loadGql("application-components/get-component-interfaces.gql")
  const data = await graphqlRequest<GetComponentInterfacesQuery, GetComponentInterfacesQueryVariables>(query, {
    componentId,
  })
  return data.map_application_component_interface.map((x) => x.interface)
}


