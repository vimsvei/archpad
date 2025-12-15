import { DirectoryKind } from "@archpad/contracts"

import type { DirectoryMeta, DirectorySlug } from "@/types/directories"

type DirectoryKindKey = keyof typeof DirectoryKind

function slugFromDirectoryKindKey(key: string): DirectorySlug {
  // ARCHITECTURE_STYLE -> architecture-styles
  return `${key.toLowerCase().replace(/_/g, "-")}s`
}

const KIND_BY_SLUG: Record<DirectorySlug, DirectoryKind> = Object.fromEntries(
  (Object.keys(DirectoryKind) as DirectoryKindKey[]).map((key) => [
    slugFromDirectoryKindKey(key),
    DirectoryKind[key],
  ])
) as Record<DirectorySlug, DirectoryKind>

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

