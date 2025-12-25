/**
 * Directory REST API functions (arch-repo)
 */

import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import type { DirectoryLinkType } from "@/@types/directory-link-type"
import { restRequest } from "@/services/http/rest-service"

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

function normalizeActionStamp(input: any): { at: string; by?: string | null } | undefined {
  if (!input) return undefined
  const at = typeof input.at === "string" ? input.at : ""
  const by = typeof input.by === "string" ? input.by : input.by ?? null
  if (!at && !by) return undefined
  return { at, by }
}

function mapToDirectoryItem(row: ArchRepoDirectoryItem): DirectoryItem {
  const anyRow: any = row as any
  return {
    id: row.id,
    code: row.code ?? "",
    name: row.name,
    description: row.description ?? "",
    color: row.color ?? null,
    byDefault: Boolean(row.byDefault),
    created:
      normalizeActionStamp(anyRow.created) ??
      (anyRow.createdAt || anyRow.createdBy
        ? { at: String(anyRow.createdAt ?? ""), by: anyRow.createdBy ?? null }
        : undefined),
    updated:
      normalizeActionStamp(anyRow.updated) ??
      (anyRow.updatedAt || anyRow.updatedBy
        ? { at: String(anyRow.updatedAt ?? ""), by: anyRow.updatedBy ?? null }
        : undefined),
  }
}

export async function createDirectoryItemRest(
  slug: DirectorySlug,
  input: CreateDirectoryItemInput
): Promise<DirectoryItem> {
  const response = await restRequest<ArchRepoDirectoryItem>(slug, {
    method: "POST",
    body: input,
  })
  return mapToDirectoryItem(response)
}

export async function getDirectoryItemRest(slug: DirectorySlug, id: string): Promise<DirectoryItem> {
  const response = await restRequest<ArchRepoDirectoryItem>([slug, id], {
    method: "GET",
  })
  return mapToDirectoryItem(response)
}

export async function updateDirectoryItemRest(
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

export async function deleteDirectoryItemRest(slug: DirectorySlug, id: string): Promise<void> {
  await restRequest([slug, id], { method: "DELETE" })
}

export async function getDirectoryItemsRest(slug: DirectorySlug): Promise<DirectoryItem[]> {
  const response = await restRequest<ArchRepoDirectoryItem[]>(slug, { method: "GET" })
  return response.map(mapToDirectoryItem)
}

export async function bulkCreateDirectoryItemsRest(
  slug: DirectorySlug,
  inputs: CreateDirectoryItemInput[]
): Promise<DirectoryItem[]> {
  const response = await restRequest<ArchRepoDirectoryItem[]>([slug, "bulk"], {
    method: "POST",
    body: inputs,
  })
  return response.map(mapToDirectoryItem)
}

export async function bulkUpsertDirectoryItemsRest(
  slug: DirectorySlug,
  inputs: CreateDirectoryItemInput[]
): Promise<DirectoryItem[]> {
  const response = await restRequest<ArchRepoDirectoryItem[]>([slug, "bulk", "upsert"], {
    method: "POST",
    body: inputs,
  })
  return response.map(mapToDirectoryItem)
}

export async function createDirectoryLinkRest(
  slug: DirectorySlug,
  sourceId: string,
  input: { targetId: string; type: DirectoryLinkType }
): Promise<void> {
  await restRequest([slug, sourceId, "links"], {
    method: "POST",
    body: input,
  })
}

export async function bulkCreateDirectoryLinksRest(
  slug: DirectorySlug,
  inputs: Array<{ sourceId: string; targetId: string; type: DirectoryLinkType }>
): Promise<void> {
  await restRequest([slug, "links", "bulk"], {
    method: "POST",
    body: inputs,
  })
}

export async function deleteDirectoryLinkRest(
  slug: DirectorySlug,
  sourceId: string,
  targetId: string
): Promise<void> {
  await restRequest([slug, sourceId, "links", targetId], {
    method: "DELETE",
  })
}


