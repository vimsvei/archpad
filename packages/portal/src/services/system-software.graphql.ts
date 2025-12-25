import type { SystemSoftware, Paginated } from "@/@types/system-software"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"

type HasuraSystemSoftwareRow = {
  id: string
  code: string
  name: string
  description: string | null
  version: string | null
  kind: string | null
  type?: { id: string; name: string } | null
  licenseType?: { id: string; name: string } | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
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
    kind: row.kind,
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
  const where = search ? { name: { _ilike: `%${search}%` } } : {}

  const query = await loadGql("system-software/get-software.gql")
  const data = await graphqlRequest<
    {
      system_software: HasuraSystemSoftwareRow[]
      system_software_aggregate: { aggregate: { count: number } }
    },
    { where: Record<string, unknown>; limit: number; offset: number }
  >(query, { where, limit: pageSize, offset })

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
  const data = await graphqlRequest<{ system_software_by_pk: HasuraSystemSoftwareRow | null }, { id: string }>(
    query,
    { id }
  )
  const row = data.system_software_by_pk
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}


