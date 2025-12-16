"use client"

import * as React from "react"

import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import { getDirectoryItems } from "@/components/directories/storage"

const ITEMS_KEY_PREFIX = "archpad:directory:"

export function useDirectoryItems(slug: DirectorySlug) {
  const [items, setItems] = React.useState<DirectoryItem[]>(() => getDirectoryItems(slug))

  React.useEffect(() => {
    setItems(getDirectoryItems(slug))

    const onStorage = (e: StorageEvent) => {
      if (e.key === `${ITEMS_KEY_PREFIX}${slug}`) setItems(getDirectoryItems(slug))
    }
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent
      if (ce.detail?.slug === slug) setItems(getDirectoryItems(slug))
    }

    window.addEventListener("storage", onStorage)
    window.addEventListener("archpad:directory-items-changed", onCustom as EventListener)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("archpad:directory-items-changed", onCustom as EventListener)
    }
  }, [slug])

  return items
}

