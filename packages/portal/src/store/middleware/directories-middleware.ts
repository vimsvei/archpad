import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import type { AppDispatch, RootState } from "@/store/store"
import { directoryApi } from "@/store/apis/directory-api"
import { setDirectoryItems, clearDirectory } from "@/store/slices/directories-slice"
import * as DirectoryHasura from "@/services/directories.graphql"
import type { DirectorySlug } from "@/@types/directories"

/**
 * Middleware to automatically update directories in Redux store
 * after successful mutations
 */
export const directoriesMiddleware = createListenerMiddleware()

// Listen to successful mutations and refresh the directory in store
directoriesMiddleware.startListening({
  matcher: isAnyOf(
    directoryApi.endpoints.createDirectoryItem.matchFulfilled,
    directoryApi.endpoints.updateDirectoryItem.matchFulfilled,
    directoryApi.endpoints.deleteDirectoryItem.matchFulfilled,
    directoryApi.endpoints.bulkCreateDirectoryItems.matchFulfilled,
    directoryApi.endpoints.bulkUpsertDirectoryItems.matchFulfilled
  ),
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch as AppDispatch

    // Extract slug from action meta arg
    const slug = (action.meta?.arg?.originalArgs as { slug?: DirectorySlug })?.slug
    if (!slug) {
      console.warn('Could not extract slug from action:', action)
      return
    }

    try {
      // Refresh directory items from server
      const items = await DirectoryHasura.getDirectoryItemsGraphql(slug)
      dispatch(setDirectoryItems({ slug, items }))
    } catch (error) {
      console.error(`Failed to refresh directory ${slug} after mutation:`, error)
      // Clear cache so it will be reloaded next time
      dispatch(clearDirectory(slug))
    }
  },
})

