import { httpRequestJson } from "./http-requester"

export type GraphQLResponse<TData> =
  | { data: TData; errors?: never }
  | { data?: TData; errors: Array<{ message: string }> }

/**
 * GraphQL proxy requester.
 * Always POSTs to `/api/graphql`.
 */
export async function graphqlRequest<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>,
>(query: string, variables?: TVariables): Promise<TData> {
  const json = await httpRequestJson<GraphQLResponse<TData>>("/api/graphql", {
    method: "POST",
    body: { query, variables },
  })

  if ("errors" in json && json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "))
  }
  return json.data as TData
}




