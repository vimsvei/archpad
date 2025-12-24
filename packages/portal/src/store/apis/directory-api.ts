import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { DirectoryItem, DirectorySlug } from "@/@types/directories"
import type { DirectoryLinkType } from "@/@types/directory-link-type"
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

    getDirectoryCount: builder.query<number, DirectorySlug>({
      async queryFn(slug) {
        try {
          const data = await DirectoryHasura.getDirectoryCountHasura(slug)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      // Reuse the same tag so counts refresh after create/bulkCreate/delete
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

    getDirectoryRelations: builder.query<
      Array<{ target: DirectoryItem } & import("@/@types/directories").DirectoryRelation>,
      { slug: DirectorySlug; sourceId: string }
    >({
      async queryFn({ slug, sourceId }) {
        try {
          const data = await DirectoryHasura.getDirectoryRelationsHasura(slug, sourceId)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { slug, sourceId }) => [
        { type: "DirectoryItems", id: slug },
        { type: "DirectoryItem", id: `${slug}:${sourceId}` },
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

    bulkCreateDirectoryItems: builder.mutation<
      DirectoryItem[],
      { slug: DirectorySlug; inputs: CreateDirectoryItemInput[] }
    >({
      async queryFn({ slug, inputs }) {
        try {
          const data = await DirectoryAPI.bulkCreateDirectoryItems(slug, inputs)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { slug }) => [{ type: "DirectoryItems", id: slug }],
    }),

    bulkUpsertDirectoryItems: builder.mutation<
      DirectoryItem[],
      { slug: DirectorySlug; inputs: CreateDirectoryItemInput[] }
    >({
      async queryFn({ slug, inputs }) {
        try {
          const data = await DirectoryAPI.bulkUpsertDirectoryItems(slug, inputs)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { slug }) => [{ type: "DirectoryItems", id: slug }],
    }),

    createDirectoryLink: builder.mutation<
      void,
      { slug: DirectorySlug; sourceId: string; targetId: string; type: DirectoryLinkType }
    >({
      async queryFn({ slug, sourceId, targetId, type }) {
        try {
          await DirectoryAPI.createDirectoryLink(slug, sourceId, { targetId, type })
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { slug, sourceId }) => [
        { type: "DirectoryItems", id: slug },
        { type: "DirectoryItem", id: `${slug}:${sourceId}` },
      ],
    }),

    bulkCreateDirectoryLinks: builder.mutation<
      void,
      { slug: DirectorySlug; inputs: Array<{ sourceId: string; targetId: string; type: DirectoryLinkType }> }
    >({
      async queryFn({ slug, inputs }) {
        try {
          await DirectoryAPI.bulkCreateDirectoryLinks(slug, inputs)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { slug }) => [{ type: "DirectoryItems", id: slug }],
    }),

    deleteDirectoryLink: builder.mutation<void, { slug: DirectorySlug; sourceId: string; targetId: string }>({
      async queryFn({ slug, sourceId, targetId }) {
        try {
          await DirectoryAPI.deleteDirectoryLink(slug, sourceId, targetId)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { slug, sourceId }) => [
        { type: "DirectoryItems", id: slug },
        { type: "DirectoryItem", id: `${slug}:${sourceId}` },
      ],
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
  useGetDirectoryCountQuery,
  useGetDirectoryItemQuery,
  useGetDirectoryRelationsQuery,
  useCreateDirectoryItemMutation,
  useBulkCreateDirectoryItemsMutation,
  useBulkUpsertDirectoryItemsMutation,
  useCreateDirectoryLinkMutation,
  useBulkCreateDirectoryLinksMutation,
  useDeleteDirectoryLinkMutation,
  useUpdateDirectoryItemMutation,
  useDeleteDirectoryItemMutation,
} = directoryApi


