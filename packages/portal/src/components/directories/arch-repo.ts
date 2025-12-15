import type { DirectoryItem, DirectorySlug } from "@/types/directories"

export type CreateDirectoryItemInput = {
  code?: string
  name: string
  description?: string
  color?: string
  byDefault?: boolean
  parentId?: string
}

type ArchRepoDirectoryItem = {
  id: string
  code?: string
  name: string
  description?: string | null
  color?: string | null
  byDefault?: boolean
}

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

export async function createDirectoryItemInArchRepo(
  slug: DirectorySlug,
  input: CreateDirectoryItemInput
): Promise<DirectoryItem> {
  const res = await fetch(`/api/rest/${encodeURIComponent(slug)}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  })

  const json = (await res.json().catch(() => null)) as ArchRepoDirectoryItem | any
  if (!res.ok) {
    throw new Error(json?.message ?? json?.error ?? `arch-repo request failed (${res.status})`)
  }
  return mapToDirectoryItem(json as ArchRepoDirectoryItem)
}


