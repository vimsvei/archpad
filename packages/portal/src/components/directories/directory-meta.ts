import type { DirectoryMeta, DirectorySlug } from "@/components/directories/types"

const KNOWN_DIRECTORIES: Record<DirectorySlug, Omit<DirectoryMeta, "slug">> = {
  "node-types": { title: "Node Types" },
  "architecture-style": { title: "Architecture Style" },
  "critical-levels": { title: "Critical Levels" },
  "license-types": { title: "License Types" },
  "protocol-types": { title: "Protocol Types" },
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((p) => p.slice(0, 1).toUpperCase() + p.slice(1))
    .join(" ")
}

export function getDirectoryMeta(slug: DirectorySlug): DirectoryMeta {
  const known = KNOWN_DIRECTORIES[slug]
  if (known) return { slug, ...known }
  return { slug, title: titleFromSlug(slug) }
}

export function listKnownDirectorySlugs(): DirectorySlug[] {
  return Object.keys(KNOWN_DIRECTORIES)
}

