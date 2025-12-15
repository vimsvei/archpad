import type { DirectoryKind } from "@archpad/contracts"

import type { DirectoryItem } from "@/types/directories"
import { graphqlRequest } from "@/lib/graphql"

type HasuraDirectoryRow = {
  id: string
  code: string
  name: string
  description: string | null
  color: string | null
  by_default: boolean
}

type GetDirectoriesData = {
  directories: HasuraDirectoryRow[]
}

export async function fetchDirectoryItemsByKind(kind: DirectoryKind): Promise<DirectoryItem[]> {
  // Note: column names are Hasura snake_case.
  const query = /* GraphQL */ `
    query GetDirectories($kind: directory_kind_enum!) {
      directories(where: { kind: { _eq: $kind } }, order_by: { name: asc }) {
        id
        code
        name
        description
        color
        by_default
      }
    }
  `

  const data = await graphqlRequest<GetDirectoriesData, { kind: DirectoryKind }>(query, { kind })
  return data.directories.map((row) => ({
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description ?? "",
    color: row.color,
    byDefault: row.by_default,
  }))
}

