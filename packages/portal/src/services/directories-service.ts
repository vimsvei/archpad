/**
 * Directory API functions (directories-service)
 * Centralized API calls for directory operations
 */

import type { DirectoryKind } from "@/@types/directory-kind"
import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import { restRequest } from "@/services/http/rest-service"
import { graphqlRequest } from "@/services/http/graphql-service"

// ============================================================================
// Types
// ============================================================================

export type CreateDirectoryItemInput = {
  code?: string
  name: string
  description?: string
  color?: string
  byDefault?: boolean
  parentId?: string
}

export type UpdateDirectoryItemInput = Partial<CreateDirectoryItemInput>

type ArchRepoDirectoryItem = {
  id: string
  code?: string
  name: string
  description?: string | null
  color?: string | null
  byDefault?: boolean
}

// Hasura types for GraphQL queries
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

// ============================================================================
// Mappers
// ============================================================================

function mapToDirectoryItem(row: ArchRepoDirectoryItem): DirectoryItem {
  return {
    id: row.id,
    code: row.code ?? "",
    name: row.name,
    description: row.description ?? "",
    color: row.color ?? null,
    byDefault: Boolean(row.byDefault),
  }
}

function mapHasuraToDirectoryItem(row: HasuraDirectoryRow): DirectoryItem {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description ?? "",
    color: row.color,
    byDefault: row.by_default,
  }
}

// ============================================================================
// REST API (Arch-Repo)
// ============================================================================

export async function createDirectoryItem(
  slug: DirectorySlug,
  input: CreateDirectoryItemInput
): Promise<DirectoryItem> {
  const response = await restRequest<ArchRepoDirectoryItem>(slug, {
    method: "POST",
    body: input,
  })
  return mapToDirectoryItem(response)
}

export async function getDirectoryItem(
  slug: DirectorySlug,
  id: string
): Promise<DirectoryItem> {
  const response = await restRequest<ArchRepoDirectoryItem>([slug, id], {
    method: "GET",
  })
  return mapToDirectoryItem(response)
}

export async function updateDirectoryItem(
  slug: DirectorySlug,
  id: string,
  input: UpdateDirectoryItemInput
): Promise<DirectoryItem> {
  const response = await restRequest<ArchRepoDirectoryItem>([slug, id], {
    method: "PATCH",
    body: input,
  })
  return mapToDirectoryItem(response)
}

export async function deleteDirectoryItem(slug: DirectorySlug, id: string): Promise<void> {
  await restRequest([slug, id], { method: "DELETE" })
}

export async function getDirectoryItems(slug: DirectorySlug): Promise<DirectoryItem[]> {
  const response = await restRequest<ArchRepoDirectoryItem[]>(slug, { method: "GET" })
  return response.map(mapToDirectoryItem)
}

// ============================================================================
// GraphQL API (Hasura)
// ============================================================================

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
  return data.directories.map(mapHasuraToDirectoryItem)
}


