import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import type { CreateDirectoryItemInput } from "@/services/directories-service"
import * as DirectoryAPI from "@/services/directories-service"
import * as DirectoryHasura from "@/services/directories-hasura"

export const directoryApi = createApi({
  reducerPath: "directoryApi",
  baseQuery: fakeBaseQuery<unknown>(),
  // Keep cached directory data while user navigates inside /directories/*.
  // We'll explicitly clear it when leaving the section (see directories layout scope).
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["DirectoryItems", "DirectoryItem"],
  endpoints: (builder) => ({
    getDirectoryItems: builder.query<DirectoryItem[], DirectorySlug>({
      async queryFn(slug) {
        try {
          const data = await DirectoryHasura.getDirectoryItemsHasura(slug)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, slug) => [{ type: "DirectoryItems", id: slug }],
    }),

    getDirectoryItem: builder.query<DirectoryItem, { slug: DirectorySlug; id: string }>({
      async queryFn({ slug, id }) {
        try {
          const data = await DirectoryHasura.getDirectoryItemHasura(slug, id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { slug, id }) => [
        { type: "DirectoryItems", id: slug },
        { type: "DirectoryItem", id: `${slug}:${id}` },
      ],
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

    updateDirectoryItem: builder.mutation<
      DirectoryItem,
      { slug: DirectorySlug; id: string; input: Partial<CreateDirectoryItemInput> }
    >({
      async queryFn({ slug, id, input }) {
        try {
          const data = await DirectoryAPI.updateDirectoryItem(slug, id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ slug, id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            directoryApi.util.updateQueryData("getDirectoryItem", { slug, id }, () => data)
          )
          dispatch(
            directoryApi.util.updateQueryData("getDirectoryItems", slug, (draft) => {
              const idx = draft.findIndex((x) => x.id === id)
              if (idx >= 0) draft[idx] = data
            })
          )
        } catch {
          // ignore
        }
      },
    }),

    deleteDirectoryItem: builder.mutation<void, { slug: DirectorySlug; id: string }>({
      async queryFn({ slug, id }) {
        try {
          await DirectoryAPI.deleteDirectoryItem(slug, id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      // Same rationale as update: keep list cache consistent without refetch.
      async onQueryStarted({ slug, id }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            directoryApi.util.updateQueryData("getDirectoryItems", slug, (draft) => {
              const idx = draft.findIndex((x) => x.id === id)
              if (idx >= 0) draft.splice(idx, 1)
            })
          )
        } catch {
          // ignore
        }
      },
    }),
  }),
})

export const {
  useGetDirectoryItemsQuery,
  useGetDirectoryItemQuery,
  useCreateDirectoryItemMutation,
  useUpdateDirectoryItemMutation,
  useDeleteDirectoryItemMutation,
} = directoryApi


