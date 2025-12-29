import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit"
import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import { listKnownDirectorySlugs } from "@/components/directories/directory-meta"

export type DirectoriesState = {
  // Store all directories by slug
  directories: Record<DirectorySlug, DirectoryItem[]>
  // Track which directories have been loaded (using array since Redux doesn't support Set)
  loaded: DirectorySlug[]
  // Track which directories are currently loading
  loading: DirectorySlug[]
  // Track last update time for each directory
  lastUpdated: Record<DirectorySlug, number>
  // Initial load flag
  initialLoadComplete: boolean
}

const initialState: DirectoriesState = {
  directories: {} as Record<DirectorySlug, DirectoryItem[]>,
  loaded: [],
  loading: [],
  lastUpdated: {} as Record<DirectorySlug, number>,
  initialLoadComplete: false,
}

export const directoriesSlice = createSlice({
  name: "directories",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ slug: DirectorySlug; loading: boolean }>) => {
      if (action.payload.loading) {
        if (!state.loading.includes(action.payload.slug)) {
          state.loading.push(action.payload.slug)
        }
      } else {
        state.loading = state.loading.filter((s) => s !== action.payload.slug)
      }
    },

    setDirectoryItems: (
      state,
      action: PayloadAction<{ slug: DirectorySlug; items: DirectoryItem[] }>
    ) => {
      state.directories[action.payload.slug] = action.payload.items
      if (!state.loaded.includes(action.payload.slug)) {
        state.loaded.push(action.payload.slug)
      }
      state.loading = state.loading.filter((s) => s !== action.payload.slug)
      state.lastUpdated[action.payload.slug] = Date.now()
    },

    setInitialLoadComplete: (state, action: PayloadAction<boolean>) => {
      state.initialLoadComplete = action.payload
    },

    // Batch load multiple directories
    setMultipleDirectories: (
      state,
      action: PayloadAction<Record<DirectorySlug, DirectoryItem[]>>
    ) => {
      const now = Date.now()
      Object.entries(action.payload).forEach(([slug, items]) => {
        const dirSlug = slug as DirectorySlug
        state.directories[dirSlug] = items
        if (!state.loaded.includes(dirSlug)) {
          state.loaded.push(dirSlug)
        }
        state.loading = state.loading.filter((s) => s !== dirSlug)
        state.lastUpdated[dirSlug] = now
      })
    },

    // Clear specific directory (for refresh)
    clearDirectory: (state, action: PayloadAction<DirectorySlug>) => {
      delete state.directories[action.payload]
      state.loaded = state.loaded.filter((s) => s !== action.payload)
      delete state.lastUpdated[action.payload]
    },

    // Reset all
    reset: () => initialState,
  },
})

export const {
  setLoading,
  setDirectoryItems,
  setInitialLoadComplete,
  setMultipleDirectories,
  clearDirectory,
  reset,
} = directoriesSlice.actions

export const directoriesReducer = directoriesSlice.reducer

// Base selectors
const selectDirectoriesState = (state: { directories: DirectoriesState }) => state.directories
const selectDirectories = (state: { directories: DirectoriesState }) => state.directories.directories
const selectLoading = (state: { directories: DirectoriesState }) => state.directories.loading
const selectLoaded = (state: { directories: DirectoriesState }) => state.directories.loaded

// Static empty array to reuse for missing directories
const EMPTY_DIRECTORY_ARRAY: DirectoryItem[] = []

// Memoized selectors with parameters using factory pattern
export const selectDirectoryItems = (() => {
  const cache = new Map<DirectorySlug, ReturnType<typeof createSelector>>()
  
  return (slug: DirectorySlug) => {
    if (!cache.has(slug)) {
      cache.set(
        slug,
        createSelector([selectDirectories], (directories) => directories[slug] ?? EMPTY_DIRECTORY_ARRAY)
      )
    }
    return cache.get(slug)!
  }
})()

export const selectIsDirectoryLoading = (() => {
  const cache = new Map<DirectorySlug, ReturnType<typeof createSelector>>()
  
  return (slug: DirectorySlug) => {
    if (!cache.has(slug)) {
      cache.set(
        slug,
        createSelector([selectLoading], (loading) => loading.includes(slug))
      )
    }
    return cache.get(slug)!
  }
})()

export const selectIsDirectoryLoaded = (() => {
  const cache = new Map<DirectorySlug, ReturnType<typeof createSelector>>()
  
  return (slug: DirectorySlug) => {
    if (!cache.has(slug)) {
      cache.set(
        slug,
        createSelector([selectLoaded], (loaded) => loaded.includes(slug))
      )
    }
    return cache.get(slug)!
  }
})()

export const selectInitialLoadComplete = createSelector(
  [selectDirectoriesState],
  (state) => state.initialLoadComplete
)

export const selectAllDirectories = selectDirectories

