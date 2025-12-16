"use client"

import * as React from "react"
import * as DirectoryAPI from "@/lib/api/directories"
import * as GraphQLAPI from "@/lib/api/graphql"
import * as RestAPI from "@/lib/api/rest"

/**
 * API Context provides centralized access to all API methods
 * This keeps components clean and makes API logic testable
 */
type ApiContextValue = {
  directories: typeof DirectoryAPI
  graphql: typeof GraphQLAPI
  rest: typeof RestAPI
}

const ApiContext = React.createContext<ApiContextValue | null>(null)

export function useApi() {
  const context = React.useContext(ApiContext)
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider")
  }
  return context
}

type ApiProviderProps = {
  children: React.ReactNode
}

/**
 * ApiProvider makes all API methods available through context
 * This allows for:
 * - Centralized API logic
 * - Easy mocking in tests
 * - Future state management integration (Redux, etc.)
 */
export function ApiProvider({ children }: ApiProviderProps) {
  const value = React.useMemo<ApiContextValue>(
    () => ({
      directories: DirectoryAPI,
      graphql: GraphQLAPI,
      rest: RestAPI,
    }),
    []
  )

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>
}

