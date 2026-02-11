import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import { mergeTenantWhere } from "@/lib/tenant-context"
import type {
  GetComponentsQuery,
  GetComponentsQueryVariables,
} from "@/generated/operations"

type HasuraComponentRow = GetComponentsQuery["ApplicationComponent"][number]

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
  const baseWhere: GetComponentsQueryVariables["where"] = search ? { name: { _ilike: `%${search}%` } } : {}
  const where = mergeTenantWhere(baseWhere)

  const query = await loadGql("application-components/get-components.gql")
  const data = await graphqlRequest<GetComponentsQuery, GetComponentsQueryVariables>(query, {
    where,
    limit: pageSize,
    offset,
  })

  const rows = data.ApplicationComponent
  const total = data.ApplicationComponentAggregate?.aggregate?.count ?? 0
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


/**
 * Full component with all related data (read model from GraphQL).
 * This is a response type, not a DTO.
 * DTOs in @archpad/contract contain IDs (e.g., functionIds: string[]),
 * while this type contains full objects (e.g., functions: Array<{id, code, name, description}>).
 * 
 * If needed, this could be moved to @archpad/contract as a response type,
 * but it's kept here as it's specific to the GraphQL query structure.
 */
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
  businessActors: Array<{ id: string; code: string; name: string }>
  businessRoles: Array<{ id: string; code: string; name: string }>
  businessProcesses: Array<{ id: string; code: string; name: string }>
  stakeholders: Array<{
    stakeholderId: string
    stakeholderName: string
    roleId: string
    roleName: string
  }>
  incomingFlows: Array<{
    id: string
    code: string
    name: string
    description?: string | null
    sourceComponent?: { id: string; code: string; name: string } | null
    targetComponent?: { id: string; code: string; name: string } | null
  }>
  outgoingFlows: Array<{
    id: string
    code: string
    name: string
    description?: string | null
    sourceComponent?: { id: string; code: string; name: string } | null
    targetComponent?: { id: string; code: string; name: string } | null
  }>
}

export async function getApplicationComponentFullGraphql(id: string): Promise<ApplicationComponentFull> {
  const query = await loadGql("application-components/get-component-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id } })
  const data = await graphqlRequest<any, { where: unknown; componentId: string }>(query, { where, componentId: id })
  const componentRows = data.component
  const component = Array.isArray(componentRows) ? componentRows[0] : componentRows
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
    parents: (data.parentComponents || []).map((x: any) => x.parent).filter(Boolean),
    children: (data.childComponents || []).map((x: any) => x.child).filter(Boolean),
    businessActors: (() => {
      const seen = new Set<string>()
      const arr: Array<{ id: string; code: string; name: string }> = []
      for (const x of data.businessActorRoles || []) {
        const a = x.actor
        if (a && !seen.has(a.id)) {
          seen.add(a.id)
          arr.push({ id: a.id, code: a.code ?? "", name: a.name ?? "" })
        }
      }
      return arr
    })(),
    businessRoles: (() => {
      const seen = new Set<string>()
      const arr: Array<{ id: string; code: string; name: string }> = []
      for (const x of data.businessActorRoles || []) {
        const r = x.role
        if (r && !seen.has(r.id)) {
          seen.add(r.id)
          arr.push({ id: r.id, code: r.code ?? "", name: r.name ?? "" })
        }
      }
      return arr
    })(),
    businessProcesses: [], // TODO: add when ApplicationComponent->BusinessProcess link exists
    stakeholders: (data.stakeholders || []).map((x: any) => ({
      stakeholderId: x.stakeholder?.id ?? "",
      stakeholderName: x.stakeholder?.name ?? "",
      roleId: x.role?.id ?? "",
      roleName: x.role?.name ?? "",
    })).filter((x: any) => x.stakeholderId && x.roleId),
    incomingFlows: (data.incomingFlows || []).map((flow: any) => ({
      id: flow.id,
      code: flow.code,
      name: flow.name,
      description: flow.description ?? null,
      sourceComponent: flow.sourceComponent ? {
        id: flow.sourceComponent.id,
        code: flow.sourceComponent.code,
        name: flow.sourceComponent.name,
      } : null,
      targetComponent: flow.targetComponent ? {
        id: flow.targetComponent.id,
        code: flow.targetComponent.code,
        name: flow.targetComponent.name,
      } : null,
    })),
    outgoingFlows: (data.outgoingFlows || []).map((flow: any) => ({
      id: flow.id,
      code: flow.code,
      name: flow.name,
      description: flow.description ?? null,
      sourceComponent: flow.sourceComponent ? {
        id: flow.sourceComponent.id,
        code: flow.sourceComponent.code,
        name: flow.sourceComponent.name,
      } : null,
      targetComponent: flow.targetComponent ? {
        id: flow.targetComponent.id,
        code: flow.targetComponent.code,
        name: flow.targetComponent.name,
      } : null,
    })),
  }
}



