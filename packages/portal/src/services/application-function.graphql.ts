import type { ApplicationFunction, Paginated } from "@/@types/application-function"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import type {
  GetApplicationFunctionByPkQuery,
  GetApplicationFunctionByPkQueryVariables,
  GetApplicationFunctionsQuery,
  GetApplicationFunctionsQueryVariables,
} from "@/generated/operations"

type HasuraApplicationFunctionRow =
  | GetApplicationFunctionsQuery["FunctionEntity"][number]
  | NonNullable<GetApplicationFunctionByPkQuery["FunctionGenericByPk"]>

export type GetApplicationFunctionsParams = {
  search?: string
  page?: number
  pageSize?: number
}

function mapRow(row: HasuraApplicationFunctionRow): ApplicationFunction {
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

export async function getApplicationFunctionsGraphql(
  params: GetApplicationFunctionsParams
): Promise<Paginated<ApplicationFunction>> {
  const page = Math.max(1, Number(params.page ?? 1) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(params.pageSize ?? 25) || 25))
  const offset = (page - 1) * pageSize

  const search = (params.search ?? "").trim()
  const where: GetApplicationFunctionsQueryVariables["where"] = search ? { name: { _ilike: `%${search}%` } } : {}

  const query = await loadGql("application-functions/get-application-functions.gql")
  const data = await graphqlRequest<GetApplicationFunctionsQuery, GetApplicationFunctionsQueryVariables>(query, {
    where,
    limit: pageSize,
    offset,
  })

  const rows = data.FunctionGeneric
  const total = data.FunctionGenericAggregate?.aggregate?.count ?? 0
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

export async function getApplicationFunctionGraphql(id: string): Promise<ApplicationFunction> {
  const query = await loadGql("application-functions/get-application-function-by-pk.gql")
  const data = await graphqlRequest<GetApplicationFunctionByPkQuery, GetApplicationFunctionByPkQueryVariables>(query, {
    id,
  })
  const row = data.FunctionGenericByPk
  if (!row) throw new Error("Item not found")
  return mapRow(row)
}

