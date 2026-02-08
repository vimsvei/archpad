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
  try {
    const json = await httpRequestJson<GraphQLResponse<TData>>("/api/graphql", {
      method: "POST",
      body: { query, variables },
      credentials: "include",
    })

    if ("errors" in json && json.errors?.length) {
      const errorMessages = json.errors
        .map((e) => (typeof e.message === "string" ? e.message : JSON.stringify(e)))
        .join("; ")
      throw new Error(errorMessages)
    }
    
    if (!json.data) {
      throw new Error("GraphQL response missing data")
    }
    
    return json.data as TData
  } catch (error) {
    // Re-throw with better error message if it's not already an Error
    if (error instanceof Error) {
      throw error
    }
    throw new Error(
      typeof error === "string" 
        ? error 
        : JSON.stringify(error) || "Unknown GraphQL error"
    )
  }
}




