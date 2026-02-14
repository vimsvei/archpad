export type DirectoryItem = {
  id: string
  name: string
}

export type DirectoryTargetByName = {
  name?: string | null
} | null | undefined

export type RelatedItemLike = {
  id: string | number
  code?: string | null
  name?: string | null
  description?: string | null
}

export type MappedRelatedItem = {
  id: string
  code: string
  name: string
  description: string | null
}

export function mapDirectoryIdByName(
  items: DirectoryItem[],
  target: DirectoryTargetByName
): string | null {
  if (!target?.name || items.length === 0) {
    return null
  }

  const found = items.find((item) => item.name === target.name)
  return found?.id ?? null
}

export function mapRelatedItem(item: RelatedItemLike): MappedRelatedItem {
  return {
    id: String(item.id),
    code: String(item.code ?? ""),
    name: String(item.name ?? ""),
    description: item.description ?? null,
  }
}

export function mapRelatedItems(items: RelatedItemLike[] | null | undefined): MappedRelatedItem[] {
  return (items ?? []).map((item) => mapRelatedItem(item))
}
