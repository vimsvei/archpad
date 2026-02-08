import { DirectoryKind } from "@/@types/directory-kind"

import type { DirectoryMeta, DirectorySlug } from "@/@types/directories"

type DirectoryKindKey = keyof typeof DirectoryKind

function slugFromDirectoryKindKey(key: string): DirectorySlug {
  // ARCHITECTURE_STYLE -> architecture-styles
  return `${key.toLowerCase().replace(/_/g, "-")}s`
}

export const KIND_BY_SLUG: Record<DirectorySlug, DirectoryKind> = Object.fromEntries(
  (Object.keys(DirectoryKind) as DirectoryKindKey[]).map((key) => [
    slugFromDirectoryKindKey(key),
    DirectoryKind[key],
  ])
) as Record<DirectorySlug, DirectoryKind>

// Reverse mapping: kind -> slug
export const SLUG_BY_KIND: Record<DirectoryKind, DirectorySlug> = Object.fromEntries(
  Object.entries(KIND_BY_SLUG).map(([slug, kind]) => [kind, slug])
) as Record<DirectoryKind, DirectorySlug>

export function getDirectoryMeta(slug: DirectorySlug): DirectoryMeta {
  const kind = KIND_BY_SLUG[slug] ?? null
  return {
    slug,
    kind,
    titleKey: kind ?? `directory.${slug}`,
  }
}

export function listKnownDirectorySlugs(): DirectorySlug[] {
  // stable ordering for UI
  return Object.keys(KIND_BY_SLUG).sort()
}

