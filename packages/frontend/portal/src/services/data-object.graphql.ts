import type { DataObject, Paginated } from "@/@types/data-object"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import { mergeTenantWhere } from "@/lib/tenant-context"
import type {
  GetDataObjectByPkQuery,
  GetDataObjectsQuery,
  GetDataObjectsQueryVariables,
} from "@/generated/operations"

type HasuraDataObjectRow =
  | GetDataObjectsQuery["DataObject"][number]
  | GetDataObjectByPkQuery["DataObject"][number]

export type GetDataObjectsParams = {
  search?: string
  page?: number
  pageSize?: number
}

function mapRow(row: HasuraDataObjectRow): DataObject {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description ?? null,
    createdAt: row.createdAt ?? null,
    createdBy: row.createdBy ?? null,
    updatedAt: row.updatedAt ?? null,
    updatedBy: row.updatedBy ?? null,
  }
}

export async function getDataObjectsGraphql(
  params: GetDataObjectsParams
): Promise<Paginated<DataObject>> {
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const offset = (page - 1) * pageSize

  const search = (params.search ?? "").trim()
  const baseWhere: GetDataObjectsQueryVariables["where"] = search ? { name: { _ilike: `%${search}%` } } : {}
  const where = mergeTenantWhere(baseWhere)

  const query = await loadGql("data-objects/get-data-objects.gql")
  const data = await graphqlRequest<GetDataObjectsQuery, GetDataObjectsQueryVariables>(query, {
    where,
    limit: pageSize,
    offset,
  })

  const rows = data.DataObject
  const total = data.DataObjectAggregate?.aggregate?.count ?? 0
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

export async function getDataObjectGraphql(id: string): Promise<DataObject> {
  const query = await loadGql("data-objects/get-data-object-by-pk.gql")
  const where = mergeTenantWhere({ id: { _eq: id } })
  const data = await graphqlRequest<{ DataObject: HasuraDataObjectRow[] }, { where: unknown }>(query, { where })
  const row = Array.isArray(data.DataObject) ? data.DataObject[0] : null
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}

/**
 * Full Data Object with related usage data (read model from GraphQL).
 * Kept untyped (any) until codegen is updated, similar to ApplicationComponentFull.
 */
export type DataObjectFull = DataObject & {
  components: Array<{ id: string; code: string; name: string; description?: string | null }>
  functionUsages: Array<{
    id: string
    functionId: string
    function: { id: string; code: string; name: string; description?: string | null } | null
    component: { id: string; code: string; name: string; description?: string | null } | null
    accessKind: string
  }>
}

export async function getDataObjectFullGraphql(id: string): Promise<DataObjectFull> {
  const query = await loadGql("data-objects/get-data-object-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id } })
  const data = await graphqlRequest<any, { where: unknown; dataObjectId: string }>(query, { where, dataObjectId: id })
  const rows = data.dataObject
  const row = Array.isArray(rows) ? rows[0] : rows
  if (!row) throw new Error("Item not found")

  const base = mapRow(row)

  const components = (data.componentMaps || [])
    .map((x: any) => x.component)
    .filter(Boolean)
    .map((c: any) => ({
      id: c.id,
      code: c.code,
      name: c.name,
      description: c.description ?? null,
    }))

  const functionMaps = (data.functionMaps || []).filter(Boolean)
  const functionIds: string[] = Array.from(
    new Set(functionMaps.map((m: any) => m.functionId).filter(Boolean))
  )

  let functionsById = new Map<string, { id: string; code: string; name: string; description?: string | null }>()
  if (functionIds.length > 0) {
    const functionsQuery = await loadGql("application-functions/get-functions-by-ids.gql")
    const where = mergeTenantWhere({ id: { _in: functionIds } })
    const functionsData = await graphqlRequest<any, { where: unknown }>(functionsQuery, { where })
    const functions = Array.isArray(functionsData.FunctionGeneric) ? functionsData.FunctionGeneric : []
    functionsById = new Map(
      functions.map((f: any) => [
        f.id,
        { id: f.id, code: f.code, name: f.name, description: f.description ?? null },
      ])
    )
  }

  const functionUsages = functionMaps
    .map((m: any) => {
      const functionId = m.functionId as string | undefined
      if (!functionId) return null
      const component = m.component
        ? {
            id: m.component.id,
            code: m.component.code,
            name: m.component.name,
            description: m.component.description ?? null,
          }
        : null

      const fn = functionsById.get(functionId) ?? null

      return {
        id: `${m.componentId ?? ""}:${functionId}:${m.accessKind ?? ""}`,
        functionId,
        function: fn,
        component,
        accessKind: String(m.accessKind ?? ""),
      }
    })
    .filter(Boolean) as DataObjectFull["functionUsages"]

  return {
    ...base,
    components,
    functionUsages,
  }
}
