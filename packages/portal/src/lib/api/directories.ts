/**
 * Directory API functions
 * Centralized API calls for directory operations
 */

import type { DirectoryKind } from "@/types/directory-kind"
import type { DirectoryItem, DirectorySlug } from "@/types/directories"
import { restPost, restGet } from "./rest"
import { graphqlRequest } from "./graphql"

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

/**
 * Create a new directory item via REST API
 */
export async function createDirectoryItem(
  slug: DirectorySlug,
  input: CreateDirectoryItemInput
): Promise<DirectoryItem> {
  const response = await restPost<ArchRepoDirectoryItem>(slug, input)
  return mapToDirectoryItem(response)
}

/**
 * Get a directory item by ID via REST API
 */
export async function getDirectoryItem(
  slug: DirectorySlug,
  id: string
): Promise<DirectoryItem> {
  const response = await restGet<ArchRepoDirectoryItem>([slug, id])
  return mapToDirectoryItem(response)
}

/**
 * Update a directory item via REST API
 */
export async function updateDirectoryItem(
  slug: DirectorySlug,
  id: string,
  input: UpdateDirectoryItemInput
): Promise<DirectoryItem> {
  const response = await restPost<ArchRepoDirectoryItem>([slug, id], input)
  return mapToDirectoryItem(response)
}

/**
 * Delete a directory item via REST API
 */
export async function deleteDirectoryItem(
  slug: DirectorySlug,
  id: string
): Promise<void> {
  await restDelete([slug, id])
}

/**
 * Get all directory items for a given slug via REST API
 */
export async function getDirectoryItems(
  slug: DirectorySlug
): Promise<DirectoryItem[]> {
  const response = await restGet<ArchRepoDirectoryItem[]>(slug)
  return response.map(mapToDirectoryItem)
}

// ============================================================================
// GraphQL API (Hasura)
// ============================================================================

/**
 * Fetch directory items by kind via GraphQL (Hasura)
 */
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

