import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { SystemSoftware, Paginated } from "@/@types/system-software"
import type {
  CreateSystemSoftwareInput,
  UpdateSystemSoftwareInput,
} from "@/services/system-software.rest"
import * as SystemSoftwareAPI from "@/services/system-software.rest"
import type { GetSystemSoftwareParams, SystemSoftwareFull } from "@/services/system-software.graphql"
import * as SystemSoftwareHasura from "@/services/system-software.graphql"

export const systemSoftwareApi = createApi({
  reducerPath: "systemSoftwareApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["SystemSoftwareList", "SystemSoftware"],
  endpoints: (builder) => ({
    getSystemSoftware: builder.query<
      Paginated<SystemSoftware>,
      GetSystemSoftwareParams
    >({
      async queryFn(params) {
        try {
          const data = await SystemSoftwareHasura.getSystemSoftwareGraphql(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result) => [{ type: "SystemSoftwareList" }],
    }),

    getSystemSoftwareById: builder.query<SystemSoftware, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await SystemSoftwareHasura.getSystemSoftwareByPkGraphql(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "SystemSoftwareList" },
        { type: "SystemSoftware", id },
      ],
    }),

    getSystemSoftwareFull: builder.query<SystemSoftwareFull, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await SystemSoftwareHasura.getSystemSoftwareFullGraphql(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "SystemSoftwareList" },
        { type: "SystemSoftware", id },
      ],
    }),

    createSystemSoftware: builder.mutation<SystemSoftware, { input: CreateSystemSoftwareInput }>({
      async queryFn({ input }) {
        try {
          const data = await SystemSoftwareAPI.createSystemSoftwareRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "SystemSoftwareList" }],
    }),

    updateSystemSoftware: builder.mutation<
      SystemSoftware,
      { id: string; input: UpdateSystemSoftwareInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await SystemSoftwareAPI.updateSystemSoftwareRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(systemSoftwareApi.util.updateQueryData("getSystemSoftwareById", { id }, () => data))
        } catch {
          // ignore
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "SystemSoftwareList" },
        { type: "SystemSoftware", id },
      ],
    }),

    deleteSystemSoftware: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await SystemSoftwareAPI.deleteSystemSoftwareRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "SystemSoftwareList" }],
    }),

    unlinkSystemSoftwareComponent: builder.mutation<
      void,
      { id: string; componentId: string }
    >({
      async queryFn({ id, componentId }) {
        try {
          await SystemSoftwareAPI.unlinkSystemSoftwareComponentRest(id, componentId)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "SystemSoftwareList" },
        { type: "SystemSoftware", id },
      ],
    }),

    unlinkSystemSoftwareNode: builder.mutation<void, { id: string; nodeId: string }>({
      async queryFn({ id, nodeId }) {
        try {
          await SystemSoftwareAPI.unlinkSystemSoftwareNodeRest(id, nodeId)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "SystemSoftwareList" },
        { type: "SystemSoftware", id },
      ],
    }),
  }),
})

export const {
  useGetSystemSoftwareQuery,
  useGetSystemSoftwareByIdQuery,
  useGetSystemSoftwareFullQuery,
  useCreateSystemSoftwareMutation,
  useUpdateSystemSoftwareMutation,
  useDeleteSystemSoftwareMutation,
  useUnlinkSystemSoftwareComponentMutation,
  useUnlinkSystemSoftwareNodeMutation,
} = systemSoftwareApi
