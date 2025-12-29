"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store/store"
import {
  selectDirectoryItems,
  selectIsDirectoryLoading,
  selectIsDirectoryLoaded,
  setLoading,
  setDirectoryItems,
  clearDirectory,
} from "@/store/slices/directories-slice"
import * as DirectoryHasura from "@/services/directories.graphql"
import type { DirectorySlug } from "@/@types/directories"

/**
 * Hook to get directory items from Redux store.
 * Automatically loads from store (preloaded on app start) and refreshes when needed.
 * 
 * @param slug - Directory slug (e.g., "component-states", "license-types")
 * @param options - Optional configuration
 * @param options.refreshOnMount - Refresh data when component mounts (default: false)
 * @param options.autoRefresh - Automatically refresh when page is visited (default: true for directory pages)
 */
export function useDirectoryItems(
  slug: DirectorySlug,
  options?: { refreshOnMount?: boolean; autoRefresh?: boolean }
) {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => selectDirectoryItems(slug)(state))
  const isLoading = useSelector((state: RootState) => selectIsDirectoryLoading(slug)(state))
  const isLoaded = useSelector((state: RootState) => selectIsDirectoryLoaded(slug)(state))

  const refreshOnMount = options?.refreshOnMount ?? false
  const autoRefresh = options?.autoRefresh ?? false

  // Load directory items if not loaded or if refresh requested
  React.useEffect(() => {
    const loadDirectory = async () => {
      if (isLoading) return // Already loading

      // If already loaded and not refreshing, use cached data
      if (isLoaded && !refreshOnMount && !autoRefresh) return

      try {
        dispatch(setLoading({ slug, loading: true }))
        const data = await DirectoryHasura.getDirectoryItemsGraphql(slug)
        dispatch(setDirectoryItems({ slug, items: data }))
      } catch (error) {
        console.error(`Failed to load directory ${slug}:`, error)
        dispatch(setLoading({ slug, loading: false }))
      }
    }

    void loadDirectory()
  }, [slug, dispatch, isLoading, isLoaded, refreshOnMount, autoRefresh])

  // Return refetch function for manual refresh
  const refetch = React.useCallback(async () => {
    if (isLoading) return
    try {
      dispatch(clearDirectory(slug))
      dispatch(setLoading({ slug, loading: true }))
      const data = await DirectoryHasura.getDirectoryItemsGraphql(slug)
      dispatch(setDirectoryItems({ slug, items: data }))
    } catch (error) {
      console.error(`Failed to refetch directory ${slug}:`, error)
      dispatch(setLoading({ slug, loading: false }))
      throw error // Re-throw to allow caller to handle
    }
  }, [slug, dispatch, isLoading])

  return {
    items,
    isLoading,
    isLoaded,
    refetch,
  }
}
