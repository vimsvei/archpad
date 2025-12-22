"use client"

import type { DirectoryKind } from "@/@types/directory-kind"
import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import { graphqlRequest } from "@/services/http/graphql-service"
import { loadGql } from "@/graphql/load-gql"
import { getDirectoryMeta } from "@/components/directories/directory-meta"

type HasuraDirectoryRow = {
  id: string
  code: string
  name: string
  description: string | null
  color: string | null
  byDefault: boolean
  createdAt: string | null
  createdBy: string | null
  updatedAt: string | null
  updatedBy: string | null
}

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

export async function getDirectoryItemsHasura(slug: DirectorySlug): Promise<DirectoryItem[]> {
  const kind = requireDirectoryKind(slug)
  const query = await loadGql("directories/get-directory-items.gql")
  const data = await graphqlRequest<{ directories: HasuraDirectoryRow[] }, { kind: DirectoryKind }>(query, {
    kind,
  })
  return (data.directories ?? []).map(toDirectoryItem)
}

export async function getDirectoryItemHasura(
  slug: DirectorySlug,
  id: string
): Promise<DirectoryItem> {
  // slug is only used for guarding kind; by_pk doesn't need kind
  void requireDirectoryKind(slug)
  const query = await loadGql("directories/get-directory-item-by-pk.gql")
  const data = await graphqlRequest<{ directories_by_pk: HasuraDirectoryRow | null }, { id: string }>(query, {
    id,
  })
  const row = data.directories_by_pk
  if (!row) throw new Error("Item not found")
  return toDirectoryItem(row)
}


