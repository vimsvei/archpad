import type { DirectoryKind } from "./directory-kind"

export type DirectorySlug = string

export type ActionStamp = {
  at: string
  by?: string | null
}

export type DirectoryItem = {
  id: string
  code: string
  name: string
  description?: string
  color?: string | null
  byDefault: boolean
  created?: ActionStamp
  updated?: ActionStamp
}

export type DirectoryRelation = {
  id: string
  sourceDirectorySlug: DirectorySlug
  sourceItemId: string
  targetDirectorySlug: DirectorySlug
  targetItemId: string
  createdAt: string
}

export type DirectoryMeta = {
  slug: DirectorySlug
  /** Directory kind (contract), if slug is recognized */
  kind: DirectoryKind | null
  /** Tolgee key for human readable directory title */
  titleKey: string
}

