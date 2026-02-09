import type { Solution, Paginated } from "@/@types/solution"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import { mergeTenantWhere } from "@/lib/tenant-context"
import type {
  GetSolutionsQuery,
  GetSolutionsQueryVariables,
  GetSolutionFullQuery,
  GetSolutionFullQueryVariables,
} from "@/generated/operations"
// GetSolutionFullByCodeQuery and GetSolutionFullByCodeQueryVariables will be generated after codegen
type GetSolutionFullByCodeQuery = any
type GetSolutionFullByCodeQueryVariables = { code: string }

type HasuraSolutionRow = GetSolutionsQuery["Solution"][number]

export type GetSolutionsParams = {
  search?: string
  page?: number
  pageSize?: number
}

function mapRow(row: HasuraSolutionRow): Solution {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description ?? null,
    context: row.context ?? null,
    decision: row.decision ?? null,
    consequences: row.consequences ?? null,
    alternatives: row.alternatives ?? null,
    decisionStatus: row.decisionStatus ?? null,
    implementationStatus: row.implementationStatus ?? null,
    createdAt: row.createdAt ?? null,
    createdBy: row.createdBy ?? null,
    updatedAt: row.updatedAt ?? null,
    updatedBy: row.updatedBy ?? null,
  }
}

export async function getSolutionsGraphql(
  params: GetSolutionsParams
): Promise<Paginated<Solution>> {
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const offset = (page - 1) * pageSize

  const search = (params.search ?? "").trim()
  const baseWhere: GetSolutionsQueryVariables["where"] = search ? { name: { _ilike: `%${search}%` } } : {}
  const where = mergeTenantWhere(baseWhere)

  const query = await loadGql("solutions/get-solutions.gql")
  const data = await graphqlRequest<GetSolutionsQuery, GetSolutionsQueryVariables>(query, {
    where,
    limit: pageSize,
    offset,
  })

  const rows = data.Solution
  const total = data.SolutionAggregate?.aggregate?.count ?? 0
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

export type SolutionFullGraphQL = {
  id: string
  code: string
  name: string
  description: string | null
  context: string | null
  decision: string | null
  consequences: string | null
  alternatives: string | null
  decisionStatus?: string | null
  implementationStatus?: string | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  components: Array<{ id: string; code: string; name: string; description?: string | null }>
  functions: Array<{ id: string; code: string; name: string; description?: string | null }>
  dataObjects: Array<{ id: string; code: string; name: string; description?: string | null }>
  flows: Array<{
    id: string
    code: string
    name: string
    description?: string | null
    sourceComponent?: { id: string; code: string; name: string } | null
    targetComponent?: { id: string; code: string; name: string } | null
  }>
  motivations: Array<{ id: string; code: string; name: string; description?: string | null }>
  stakeholders: Array<{
    stakeholderId: string
    stakeholderName: string
    roleId: string
    roleName: string
  }>
  technologyNodes: Array<{ id: string; code: string; name: string; description?: string | null }>
  technologyNetworks: Array<{ id: string; code: string; name: string; description?: string | null }>
}

// Alias for backward compatibility
export type SolutionFull = SolutionFullGraphQL

export async function getSolutionFullGraphql(idOrCode: string): Promise<SolutionFullGraphQL> {
  // Check if idOrCode is a UUID (id) or a string (code)
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idOrCode)
  
  let data: GetSolutionFullQuery | GetSolutionFullByCodeQuery
  let solution: any
  
  if (isUuid) {
    // Use query by id
    const query = await loadGql("solutions/get-solution-full.gql")
    const where = mergeTenantWhere({ id: { _eq: idOrCode } })
    const variables = { where, solutionId: idOrCode }
    data = await graphqlRequest<GetSolutionFullQuery, { where: unknown; solutionId: string }>(query, variables)
    solution = Array.isArray((data as any).solution) ? (data as any).solution[0] : (data as any).solution
  } else {
    // Use query by code
    const query = await loadGql("solutions/get-solution-full-by-code.gql")
    const baseWhere = { code: { _eq: idOrCode } }
    const where = mergeTenantWhere(baseWhere)
    const variables = { where }
    data = await graphqlRequest<GetSolutionFullByCodeQuery, { where: unknown }>(query, variables)
    solution = Array.isArray((data as any).solution) ? (data as any).solution[0] : (data as any).solution
  }
  
  if (!solution) throw new Error("Item not found")

  // Collect function and dataObject IDs from solution mappings
  const functionPairs = (solution.functions || []).map((f: any) => ({
    componentId: f.componentId,
    functionId: f.functionId,
  }))
  // solutionDataObjects is at root level (Solution no longer has dataObjects relation)
  const solutionDataObjects = (data as any).solutionDataObjects || []
  const dataObjectPairs = solutionDataObjects.map((d: any) => ({
    componentId: d.componentId,
    dataObjectId: d.dataObjectId,
  }))

  // Fetch DataObject details for solution data objects
  let dataObjects: Array<{ id: string; code: string; name: string; description?: string | null }> = []
  const dataObjectIds = [...new Set(dataObjectPairs.map((p: { dataObjectId: string }) => p.dataObjectId).filter(Boolean))] as string[]
  if (dataObjectIds.length > 0) {
    const dataObjectsQuery = await loadGql("data-objects/get-data-objects-by-ids.gql")
    const where = mergeTenantWhere({ id: { _in: dataObjectIds } })
    const dataObjectsData = await graphqlRequest<{ DataObject: Array<{ id: string; code: string; name: string; description?: string | null }> }, { where: unknown }>(
      dataObjectsQuery,
      { where }
    )
    const byId = new Map(dataObjectsData.DataObject?.map((d) => [d.id, d]) ?? [])
    // Preserve order from solutionDataObjects
    dataObjects = solutionDataObjects
      .map((s: { dataObjectId: string }) => byId.get(s.dataObjectId))
      .filter(Boolean) as Array<{ id: string; code: string; name: string; description?: string | null }>
  }

  return {
    id: solution.id,
    code: solution.code,
    name: solution.name,
    description: solution.description ?? null,
    context: solution.context ?? null,
    decision: solution.decision ?? null,
    consequences: solution.consequences ?? null,
    alternatives: solution.alternatives ?? null,
    decisionStatus: solution.decisionStatus ?? null,
    implementationStatus: solution.implementationStatus ?? null,
    createdAt: solution.createdAt ?? null,
    createdBy: solution.createdBy ?? null,
    updatedAt: solution.updatedAt ?? null,
    updatedBy: solution.updatedBy ?? null,
    components: (solution.components || []).map((x: any) => x.component).filter(Boolean),
    functions: [], // TODO: Populate from ApplicationComponentFunctionMap using functionPairs
    dataObjects,
    flows: (solution.flows || []).map((flow: any) => ({
      id: flow.flow?.id,
      code: flow.flow?.code,
      name: flow.flow?.name,
      description: flow.flow?.description ?? null,
      sourceComponent: flow.flow?.sourceComponent ? {
        id: flow.flow.sourceComponent.id,
        code: flow.flow.sourceComponent.code,
        name: flow.flow.sourceComponent.name,
      } : null,
      targetComponent: flow.flow?.targetComponent ? {
        id: flow.flow.targetComponent.id,
        code: flow.flow.targetComponent.code,
        name: flow.flow.targetComponent.name,
      } : null,
    })).filter((x: any) => x.id),
    motivations: (solution.motivations || []).map((x: any) => x.motivation).filter(Boolean),
    stakeholders: (solution.stakeholders || []).map((x: any) => ({
      stakeholderId: x.stakeholder?.id ?? "",
      stakeholderName: x.stakeholder?.name ?? "",
      roleId: x.role ?? "",
      roleName: x.role ?? "",
    })).filter((x: any) => x.stakeholderId),
    technologyNodes: (data.technologyNodes || []).map((x: any) => x.node).filter(Boolean),
    technologyNetworks: [], // TODO: Implement when SolutionTechnologyNetworkMap is available
  }
}