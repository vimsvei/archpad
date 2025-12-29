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

// Full component with all related data
export type ApplicationComponentFull = {
  id: string
  code: string
  name: string
  description: string | null
  state: { id: string; name: string; color?: string | null } | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  functions: Array<{ id: string; code: string; name: string; description?: string | null }>
  dataObjects: Array<{ id: string; code: string; name: string; description?: string | null }>
  interfaces: Array<{ id: string; code: string; name: string; description?: string | null }>
  events: Array<{ id: string; code: string; name: string; description?: string | null }>
  systemSoftware: Array<{ id: string; code: string; name: string; kind: string }>
  technologyNodes: Array<{ id: string; code: string; name: string }>
  technologyNetworks: Array<{ id: string; code: string; name: string }>
  parents: Array<{ id: string; code: string; name: string; description?: string | null }>
  children: Array<{ id: string; code: string; name: string; description?: string | null }>
}

export async function getApplicationComponentFullGraphql(id: string): Promise<ApplicationComponentFull> {
  const query = await loadGql("application-components/get-component-full.gql")
  // TODO: Generate types for GetComponentFullQuery when codegen is run
  // For now using any, will be replaced with proper types
  const data = await graphqlRequest<any, { id: string }>(query, { id })
  const component = data.component
  if (!component) throw new Error("Item not found")

  return {
    id: component.id,
    code: component.code,
    name: component.name,
    description: component.description ?? null,
    state: component.state ? { id: component.state.id, name: component.state.name, color: component.state.color } : null,
    createdAt: component.createdAt ?? null,
    createdBy: component.createdBy ?? null,
    updatedAt: component.updatedAt ?? null,
    updatedBy: component.updatedBy ?? null,
    functions: (data.functions || []).map((x: any) => x.function).filter(Boolean),
    dataObjects: (data.dataObjects || []).map((x: any) => x.dataObject).filter(Boolean),
    interfaces: (data.interfaces || []).map((x: any) => x.interface).filter(Boolean),
    events: (data.events || []).map((x: any) => x.event).filter(Boolean),
    systemSoftware: (data.systemSoftware || []).map((x: any) => ({
      id: x.systemSoftware?.id,
      code: x.systemSoftware?.code,
      name: x.systemSoftware?.name,
      kind: x.kind,
    })).filter((x: any) => x.id),
    technologyNodes: (data.technologyNodes || []).map((x: any) => x.node).filter(Boolean),
    technologyNetworks: (data.technologyNetworks || []).map((x: any) => x.logicalNetwork).filter(Boolean),
    parents: (data.parentComponents || []).map((x: any) => x.componentParent).filter(Boolean),
    children: (data.childComponents || []).map((x: any) => x.componentChild).filter(Boolean),
  }
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


