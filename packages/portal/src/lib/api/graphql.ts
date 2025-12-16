/**
 * GraphQL API client functions
 * All GraphQL requests go through /api/graphql proxy which handles authentication
 */

export type GraphQLResponse<TData> =
  | { data: TData; errors?: never }
  | { data?: TData; errors: Array<{ message: string }> }

/**
 * Makes a GraphQL API request through the /api/graphql proxy
 * The proxy handles authentication and forwards to Hasura
 */
export async function graphqlRequest<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>(
  query: string,
  variables?: TVariables
): Promise<TData> {
  const res = await fetch("/api/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  })

  const json = (await res.json()) as GraphQLResponse<TData>
  if (!res.ok) {
    throw new Error((json as any)?.error ?? `GraphQL request failed (${res.status})`)
  }
  if ("errors" in json && json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "))
  }
  return json.data as TData
}

