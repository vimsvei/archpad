import type { SystemSoftware, Paginated } from "@/@types/system-software"
import { SystemSoftwareKind } from "@archpad/contract"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import type {
  GetSystemSoftwareByPkQuery,
  GetSystemSoftwareByPkQueryVariables,
  GetSystemSoftwareQuery,
  GetSystemSoftwareQueryVariables,
} from "@/generated/operations"

type HasuraSystemSoftwareRow =
  | GetSystemSoftwareQuery["system_software"][number]
  | NonNullable<GetSystemSoftwareByPkQuery["system_software_by_pk"]>

function parseSystemSoftwareKind(input: string | null): SystemSoftwareKind | null {
  if (!input) return null
  const values = Object.values(SystemSoftwareKind) as unknown as string[]
  return values.includes(input) ? (input as SystemSoftwareKind) : null
}

export type GetSystemSoftwareParams = {
  search?: string
  page?: number
  pageSize?: number
}

function mapRow(row: HasuraSystemSoftwareRow): SystemSoftware {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description,
    version: row.version,
    kind: parseSystemSoftwareKind(row.kind as string | null),
    type: row.type,
    license: row.licenseType,
    createdAt: row.createdAt ?? null,
    createdBy: row.createdBy ?? null,
    updatedAt: row.updatedAt ?? null,
    updatedBy: row.updatedBy ?? null,
  }
}

export async function getSystemSoftwareGraphql(
  params: GetSystemSoftwareParams
): Promise<Paginated<SystemSoftware>> {
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const offset = (page - 1) * pageSize

  const search = (params.search ?? "").trim()
  const where: GetSystemSoftwareQueryVariables["where"] = search ? { name: { _ilike: `%${search}%` } } : {}

  const query = await loadGql("system-software/get-software.gql")
  const data = await graphqlRequest<GetSystemSoftwareQuery, GetSystemSoftwareQueryVariables>(query, {
    where,
    limit: pageSize,
    offset,
  })

  const rows = data.system_software
  const total = data.system_software_aggregate?.aggregate?.count ?? 0
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

export async function getSystemSoftwareByPkGraphql(id: string): Promise<SystemSoftware> {
  const query = await loadGql("system-software/get-software-by-pk.gql")
  const data = await graphqlRequest<GetSystemSoftwareByPkQuery, GetSystemSoftwareByPkQueryVariables>(query, { id })
  const row = data.system_software_by_pk
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}


