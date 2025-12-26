"use client"

import type { DirectoryKind } from "@/@types/directory-kind"
import type { DirectoryItem, DirectoryRelation, DirectorySlug } from "@/@types/directories"
import type { DirectoryLinkType } from "@/@types/directory-link-type"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import type {
  GetDirectoryCountQuery,
  GetDirectoryCountQueryVariables,
  GetDirectoryItemByPkQuery,
  GetDirectoryItemByPkQueryVariables,
  GetDirectoryItemsQuery,
  GetDirectoryItemsQueryVariables,
  GetDirectoryRelationsQuery,
  GetDirectoryRelationsQueryVariables,
} from "@/generated/operations"

type HasuraDirectoryRow =
  | GetDirectoryItemsQuery["directories"][number]
  | NonNullable<GetDirectoryItemByPkQuery["directories_by_pk"]>

type HasuraDirectoryRelationRow = GetDirectoryRelationsQuery["map_directory_items"][number]

function toDirectoryItem(row: HasuraDirectoryRow): DirectoryItem {
  return {
    id: row.id,
    code: row.code ?? "",
    name: row.name,
    description: row.description ?? "",
    color: row.color,
    byDefault: Boolean(row.byDefault),
    created:
      row.createdAt || row.createdBy
        ? { at: row.createdAt ?? "", by: row.createdBy ?? null }
        : undefined,
    updated:
      row.updatedAt || row.updatedBy
        ? { at: row.updatedAt ?? "", by: row.updatedBy ?? null }
        : undefined,
  }
}

function requireDirectoryKind(slug: DirectorySlug): DirectoryKind {
  const meta = getDirectoryMeta(slug)
  if (!meta.kind) {
    throw new Error(`Unknown directory slug: ${slug}`)
  }
  return meta.kind
}

export async function getDirectoryItemsGraphql(slug: DirectorySlug): Promise<DirectoryItem[]> {
  const kind = requireDirectoryKind(slug)
  const query = await loadGql("directories/get-directory-items.gql")
  const data = await graphqlRequest<GetDirectoryItemsQuery, GetDirectoryItemsQueryVariables>(query, {
    kind,
  })
  return (data.directories ?? []).map(toDirectoryItem)
}

export async function getDirectoryItemGraphql(
  slug: DirectorySlug,
  id: string
): Promise<DirectoryItem> {
  void requireDirectoryKind(slug)
  const query = await loadGql("directories/get-directory-item-by-pk.gql")
  const data = await graphqlRequest<GetDirectoryItemByPkQuery, GetDirectoryItemByPkQueryVariables>(query, { id })
  const row = data.directories_by_pk
  if (!row) throw new Error("Item not found")
  return toDirectoryItem(row)
}

export async function getDirectoryCountGraphql(slug: DirectorySlug): Promise<number> {
  const kind = requireDirectoryKind(slug)
  const query = await loadGql("directories/get-directory-count.gql")
  const data = await graphqlRequest<GetDirectoryCountQuery, GetDirectoryCountQueryVariables>(query, {
    kind,
  })
  return data.directories_aggregate?.aggregate?.count ?? 0
}

export async function getDirectoryRelationsGraphql(
  slug: DirectorySlug,
  sourceId: string
): Promise<Array<DirectoryRelation & { target: DirectoryItem }>> {
  void requireDirectoryKind(slug)
  const query = await loadGql("directories/get-directory-relations.gql")
  const data = await graphqlRequest<GetDirectoryRelationsQuery, GetDirectoryRelationsQueryVariables>(query, { sourceId })

  return (data.map_directory_items ?? []).map((r: HasuraDirectoryRelationRow) => ({
    id: `${r.sourceId}:${r.targetId}:${r.type}`,
    sourceDirectorySlug: slug,
    sourceItemId: r.sourceId,
    targetDirectorySlug: slug,
    targetItemId: r.targetId,
    type: r.type as DirectoryLinkType,
    createdAt: String(r.createdAt),
    target: toDirectoryItem(r.target),
  }))
}


