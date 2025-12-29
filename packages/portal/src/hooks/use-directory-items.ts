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

  // Track if we've already triggered a load for this mount/refresh combination
  const loadTriggeredRef = React.useRef<Set<string>>(new Set())
  const lastSlugRef = React.useRef<DirectorySlug | null>(null)

  // Load directory items if not loaded or if refresh requested
  React.useEffect(() => {
    // Reset trigger set when slug changes
    if (lastSlugRef.current !== slug) {
      loadTriggeredRef.current.clear()
      lastSlugRef.current = slug
    }

    const loadKey = `${slug}-${refreshOnMount}-${autoRefresh}`
    
    // If already loaded and not refreshing, use cached data
    if (isLoaded && !refreshOnMount && !autoRefresh) {
      loadTriggeredRef.current.add(loadKey)
      return
    }

    // If we already triggered load for this combination, skip
    if (loadTriggeredRef.current.has(loadKey)) {
      return
    }

    // If already loading, skip
    if (isLoading) {
      return
    }

    // Mark as triggered before async operation
    loadTriggeredRef.current.add(loadKey)

    const loadDirectory = async () => {
      try {
        dispatch(setLoading({ slug, loading: true }))
        const data = await DirectoryHasura.getDirectoryItemsGraphql(slug)
        // Ensure data is an array
        const itemsArray = Array.isArray(data) ? data : []
        dispatch(setDirectoryItems({ slug, items: itemsArray }))
      } catch (error) {
        console.error(`Failed to load directory ${slug}:`, error)
        dispatch(setLoading({ slug, loading: false }))
        // Remove from triggered set to allow retry on error
        loadTriggeredRef.current.delete(loadKey)
      }
    }

    void loadDirectory()
    // Check isLoading and isLoaded but don't include them in deps to prevent loops
    // They are checked inside the effect, so we get current values
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, dispatch, refreshOnMount, autoRefresh]) // Only depend on slug, options, and dispatch

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
    items: items ?? [], // Ensure items is always an array
    isLoading,
    isLoaded,
    refetch,
  }
}
