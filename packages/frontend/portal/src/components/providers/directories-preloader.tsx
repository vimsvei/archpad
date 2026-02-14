"use client"

import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/store/store"
import { setLoading, setInitialLoadComplete, setMultipleDirectories, selectInitialLoadComplete } from "@/store/slices/directories-slice"
import { listKnownDirectorySlugs } from "@/components/directories/directory-meta"
import * as DirectoryHasura from "@/services/directories.graphql"
import type { DirectorySlug } from "@/@types/directories"

/**
 * Component that preloads all directories on app startup
 * and refreshes them when their pages are visited
 */
export function DirectoriesPreloader() {
  const dispatch = useDispatch<AppDispatch>()
  const initialLoadComplete = useSelector(selectInitialLoadComplete)

  // Load all directories on mount
  React.useEffect(() => {
    if (initialLoadComplete) return // Already loaded

    const loadAllDirectories = async () => {
      const slugs = listKnownDirectorySlugs()
      
      // Set loading state for all
      slugs.forEach((slug) => {
        dispatch(setLoading({ slug, loading: true }))
      })

      try {
        // Load all directories in a single query
        const directories = await DirectoryHasura.getAllDirectoriesGraphql()
        
        // Ensure all slugs are present (even if empty)
        const allDirectories: Record<DirectorySlug, any[]> = {} as any
        slugs.forEach((slug) => {
          allDirectories[slug] = directories[slug] ?? []
          dispatch(setLoading({ slug, loading: false }))
        })

        dispatch(setMultipleDirectories(allDirectories))
        dispatch(setInitialLoadComplete(true))
      } catch (error) {
        // 401 is expected when not authenticated; avoid noisy error logs
        const is401 = error instanceof Error && error.message.includes("401")
        if (!is401) {
          console.error("Failed to load directories:", error)
        }
        // Mark all as not loading
        slugs.forEach((slug) => {
          dispatch(setLoading({ slug, loading: false }))
        })
      }
    }

    void loadAllDirectories()
  }, [dispatch, initialLoadComplete])

  return null // This component doesn't render anything
}
