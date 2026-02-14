import type { SystemSoftware, Paginated } from "@/@types/system-software"
import { SystemSoftwareKind, TechnologyRadarZone } from "@archpad/contract"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import { mergeTenantWhere } from "@/lib/tenant-context"
import type {
  GetSystemSoftwareByPkQuery,
  GetSystemSoftwareQuery,
  GetSystemSoftwareQueryVariables,
} from "@/generated/operations"

type HasuraSystemSoftwareRow =
  | GetSystemSoftwareQuery["SystemSoftware"][number]
  | GetSystemSoftwareByPkQuery["SystemSoftware"][number]

type RelatedItem = {
  id: string
  code: string
  name: string
  description?: string | null
}

function parseSystemSoftwareKind(input: string | null): SystemSoftwareKind | null {
  if (!input) return null
  const values = Object.values(SystemSoftwareKind) as unknown as string[]
  return values.includes(input) ? (input as SystemSoftwareKind) : null
}

function parseTechnologyRadarZone(input: string | null): TechnologyRadarZone | null {
  if (!input) return null
  const values = Object.values(TechnologyRadarZone) as unknown as string[]
  return values.includes(input) ? (input as TechnologyRadarZone) : null
}

export type GetSystemSoftwareParams = {
  search?: string
  page?: number
  pageSize?: number
}

function mapRow(row: HasuraSystemSoftwareRow): SystemSoftware {
  const radarArea = (row as { radarArea?: string | null }).radarArea ?? null
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description ?? null,
    version: row.version ?? null,
    kind: parseSystemSoftwareKind(row.kind as string | null),
    radarArea: parseTechnologyRadarZone(radarArea),
    type: row.type,
    license: row.licenseType,
    createdAt: row.createdAt ?? null,
    createdBy: row.createdBy ?? null,
    updatedAt: row.updatedAt ?? null,
    updatedBy: row.updatedBy ?? null,
  }
}

export type SystemSoftwareFull = SystemSoftware & {
  components: RelatedItem[]
  technologyNodes: RelatedItem[]
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

  const rows = data.SystemSoftware
  const total = data.SystemSoftwareAggregate?.aggregate?.count ?? 0
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
  const where = mergeTenantWhere({ id: { _eq: id } })
  const data = await graphqlRequest<{ SystemSoftware: HasuraSystemSoftwareRow[] }, { where: unknown }>(query, { where })
  const row = Array.isArray(data.SystemSoftware) ? data.SystemSoftware[0] : null
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}

export async function getSystemSoftwareFullGraphql(id: string): Promise<SystemSoftwareFull> {
  const query = await loadGql("system-software/get-software-full.gql")
  const where = mergeTenantWhere({ id: { _eq: id } })

  const data = await graphqlRequest<
    {
      software: Array<HasuraSystemSoftwareRow>
      componentMaps: Array<{ component?: RelatedItem | null }>
      nodeMaps: Array<{ node?: RelatedItem | null }>
    },
    { where: unknown; systemSoftwareId: string }
  >(query, { where, systemSoftwareId: id })

  const softwareRows = Array.isArray(data.software) ? data.software : []
  const software = softwareRows[0]
  if (!software) throw new Error("Item not found")

  const components = (data.componentMaps ?? [])
    .map((item) => item.component)
    .filter((component): component is RelatedItem => Boolean(component))
    .map((component) => ({
      id: String(component.id),
      code: String(component.code ?? ""),
      name: String(component.name ?? ""),
      description: component.description ?? null,
    }))

  const technologyNodes = (data.nodeMaps ?? [])
    .map((item) => item.node)
    .filter((node): node is RelatedItem => Boolean(node))
    .map((node) => ({
      id: String(node.id),
      code: String(node.code ?? ""),
      name: String(node.name ?? ""),
      description: node.description ?? null,
    }))

  return {
    ...mapRow(software),
    components,
    technologyNodes,
  }
}
