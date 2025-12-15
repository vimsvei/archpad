"use client"

import * as React from "react"

import type { DirectoryRelation, DirectorySlug } from "@/types/directories"
import { getRelationsForSource } from "@/components/directories/storage"

const RELATIONS_KEY = "archpad:directory-relations"

export function useDirectoryRelations(sourceDirectorySlug: DirectorySlug, sourceItemId: string) {
  const [relations, setRelations] = React.useState<DirectoryRelation[]>(() =>
    getRelationsForSource(sourceDirectorySlug, sourceItemId)
  )

  React.useEffect(() => {
    setRelations(getRelationsForSource(sourceDirectorySlug, sourceItemId))

    const onStorage = (e: StorageEvent) => {
      if (e.key === RELATIONS_KEY) setRelations(getRelationsForSource(sourceDirectorySlug, sourceItemId))
    }
    const onCustom = () => {
      setRelations(getRelationsForSource(sourceDirectorySlug, sourceItemId))
    }

    window.addEventListener("storage", onStorage)
    window.addEventListener("archpad:directory-relations-changed", onCustom as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("archpad:directory-relations-changed", onCustom as EventListener)
    }
  }, [sourceDirectorySlug, sourceItemId])

  return relations
}

