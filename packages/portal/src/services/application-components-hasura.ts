import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"

type HasuraComponentRow = {
  id: string
  code: string
  name: string
  description: string | null
}

export type GetApplicationComponentsParams = {
  search?: string
  page?: number
  pageSize?: number
}

type IntrospectionTypeRef = {
  kind: string
  name: string | null
  ofType?: IntrospectionTypeRef | null
}

type IntrospectionArg = {
  name: string
  type: IntrospectionTypeRef
}

type IntrospectionField = {
  name: string
  args: IntrospectionArg[]
}

type IntrospectQueryRootData = {
  __schema: {
    queryType: {
      fields: IntrospectionField[]
    }
  }
}

type ResolvedHasuraComponentFields = {
  listField: string
  aggregateField: string
  byPkField: string
  whereTypeName: string
  pkArgName: string
  pkArgTypeName: string
}

let resolvedPromise: Promise<ResolvedHasuraComponentFields> | null = null

function unwrapNamedType(t: IntrospectionTypeRef): string | null {
  if (t.name) return t.name
  if (t.ofType) return unwrapNamedType(t.ofType)
  return null
}

async function resolveHasuraFields(): Promise<ResolvedHasuraComponentFields> {
  const query = await loadGql("_meta/introspect-query-root.gql")
  const data = await graphqlRequest<IntrospectQueryRootData>(query)
  const fields = data.__schema.queryType.fields

  // Heuristic: find the "list" field which supports pagination args.
  const listCandidates = fields.filter((f) => {
    const argNames = new Set(f.args.map((a) => a.name))
    return argNames.has("limit") && argNames.has("offset") && argNames.has("where")
  })

  // Prefer a field name that contains "component".
  const listField = listCandidates.find((f) =>
    f.name.toLowerCase().includes("component")
  )?.name

  if (!listField) {
    const candidates = listCandidates.map((f) => f.name).slice(0, 50).join(", ")
    throw new Error(
      `Hasura schema: no paginated list field containing "component" (args: where/limit/offset). Candidates: ${candidates}`
    )
  }

  const list = fields.find((f) => f.name === listField)!
  const whereArg = list.args.find((a) => a.name === "where")
  const whereTypeName = whereArg ? unwrapNamedType(whereArg.type) : null
  if (!whereTypeName) {
    throw new Error(`Hasura schema: cannot resolve 'where' type for query_root.${listField}`)
  }

  // Aggregate and by_pk usually follow the same base.
  const aggregateField =
    fields.find((f) => f.name === `${listField}_aggregate`)?.name ??
    fields.find((f) => f.name.toLowerCase().includes("aggregate") && f.name.toLowerCase().includes("component"))
      ?.name

  const byPkField =
    fields.find((f) => f.name === `${listField}_by_pk`)?.name ??
    fields.find((f) => f.name.toLowerCase().includes("by_pk") && f.name.toLowerCase().includes("component"))
      ?.name

  if (!aggregateField || !byPkField) {
    throw new Error(
      `Hasura schema: expected ${listField}_aggregate and ${listField}_by_pk fields, but got aggregate=${String(
        aggregateField
      )}, byPk=${String(byPkField)}`
    )
  }

  const byPk = fields.find((f) => f.name === byPkField)!
  const pkArg = byPk.args[0]
  if (!pkArg) throw new Error(`Hasura schema: ${byPkField} has no args (expected pk arg)`)

  const pkArgTypeName = unwrapNamedType(pkArg.type)
  if (!pkArgTypeName) {
    throw new Error(`Hasura schema: cannot resolve pk arg type for query_root.${byPkField}`)
  }

  return {
    listField,
    aggregateField,
    byPkField,
    whereTypeName,
    pkArgName: pkArg.name,
    pkArgTypeName,
  }
}

async function getResolved(): Promise<ResolvedHasuraComponentFields> {
  if (!resolvedPromise) resolvedPromise = resolveHasuraFields()
  return resolvedPromise
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
  const resolved = await getResolved()
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const offset = (page - 1) * pageSize

  const search = (params.search ?? "").trim()
  const where = search ? { name: { _ilike: `%${search}%` } } : {}

  const query = /* GraphQL */ `
    query ListComponents($where: ${resolved.whereTypeName}!, $limit: Int!, $offset: Int!) {
      ${resolved.listField}(where: $where, order_by: { name: asc }, limit: $limit, offset: $offset) {
        id
        code
        name
        description
      }
      ${resolved.aggregateField}(where: $where) {
        aggregate {
          count
        }
      }
    }
  `
  const data = await graphqlRequest<
    Record<string, any>,
    { where: Record<string, unknown>; limit: number; offset: number }
  >(query, { where, limit: pageSize, offset })

  const rows = (data as any)?.[resolved.listField] as HasuraComponentRow[] | undefined
  const total =
    (data as any)?.[resolved.aggregateField]?.aggregate?.count ??
    (data as any)?.[resolved.aggregateField]?.aggregate?.count?.value ??
    0
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

export async function getApplicationComponentHasura(id: string): Promise<ApplicationComponent> {
  const resolved = await getResolved()

  const query = /* GraphQL */ `
    query GetComponent($id: ${resolved.pkArgTypeName}!) {
      ${resolved.byPkField}(${resolved.pkArgName}: $id) {
        id
        code
        name
        description
      }
    }
  `

  const data = await graphqlRequest<Record<string, any>, { id: string }>(query, { id })
  const row = (data as any)?.[resolved.byPkField] as HasuraComponentRow | null | undefined
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}


