import type { DataObject, Paginated } from "@/@types/data-object"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import type {
  GetDataObjectByPkQuery,
  GetDataObjectByPkQueryVariables,
  GetDataObjectsQuery,
  GetDataObjectsQueryVariables,
} from "@/generated/operations"

type HasuraDataObjectRow =
  | GetDataObjectsQuery["data_objects"][number]
  | NonNullable<GetDataObjectByPkQuery["data_objects_by_pk"]>

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
  const where: GetDataObjectsQueryVariables["where"] = search ? { name: { _ilike: `%${search}%` } } : {}

  const query = await loadGql("data-objects/get-data-objects.gql")
  const data = await graphqlRequest<GetDataObjectsQuery, GetDataObjectsQueryVariables>(query, {
    where,
    limit: pageSize,
    offset,
  })

  const rows = data.data_objects
  const total = data.data_objects_aggregate?.aggregate?.count ?? 0
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
  const data = await graphqlRequest<GetDataObjectByPkQuery, GetDataObjectByPkQueryVariables>(query, { id })
  const row = data.data_objects_by_pk
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}

