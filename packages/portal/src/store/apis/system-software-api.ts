import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { SystemSoftware, Paginated } from "@/@types/system-software"
import type {
  CreateSystemSoftwareInput,
  UpdateSystemSoftwareInput,
} from "@/services/system-software-service"
import * as SystemSoftwareAPI from "@/services/system-software-service"
import type { GetSystemSoftwareParams } from "@/services/system-software-hasura"
import * as SystemSoftwareHasura from "@/services/system-software-hasura"

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
          const data = await SystemSoftwareHasura.getSystemSoftwareHasura(params)
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
          const data = await SystemSoftwareHasura.getSystemSoftwareByPkHasura(id)
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
          const data = await SystemSoftwareAPI.createSystemSoftware(input)
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
          const data = await SystemSoftwareAPI.updateSystemSoftware(id, input)
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
          await SystemSoftwareAPI.deleteSystemSoftware(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "SystemSoftwareList" }],
    }),
  }),
})

export const {
  useGetSystemSoftwareQuery,
  useGetSystemSoftwareByIdQuery,
  useCreateSystemSoftwareMutation,
  useUpdateSystemSoftwareMutation,
  useDeleteSystemSoftwareMutation,
} = systemSoftwareApi

