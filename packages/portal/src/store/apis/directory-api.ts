import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { DirectoryItem, DirectorySlug } from "@/types/directories"
import type { CreateDirectoryItemInput } from "@/lib/api/directories"
import * as DirectoryAPI from "@/lib/api/directories"

/**
 * Directories RTK Query API
 *
 * Uses existing centralized API functions (`lib/api/directories`) so auth/refresh/proxy logic
 * stays in one place, while Redux provides caching + invalidation + status flags.
 */
export const directoryApi = createApi({
  reducerPath: "directoryApi",
  baseQuery: fakeBaseQuery<unknown>(),
  tagTypes: ["DirectoryItems"],
  endpoints: (builder) => ({
    getDirectoryItems: builder.query<DirectoryItem[], DirectorySlug>({
      async queryFn(slug) {
        try {
          const data = await DirectoryAPI.getDirectoryItems(slug)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, slug) => [{ type: "DirectoryItems", id: slug }],
    }),

    createDirectoryItem: builder.mutation<
      DirectoryItem,
      { slug: DirectorySlug; input: CreateDirectoryItemInput }
    >({
      async queryFn({ slug, input }) {
        try {
          const data = await DirectoryAPI.createDirectoryItem(slug, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { slug }) => [{ type: "DirectoryItems", id: slug }],
    }),
  }),
})

export const { useGetDirectoryItemsQuery, useCreateDirectoryItemMutation } = directoryApi


