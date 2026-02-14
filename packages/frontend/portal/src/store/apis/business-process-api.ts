import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { BusinessProcess, Paginated } from "@/@types/business-process"
import type {
  CreateBusinessProcessInput,
  GetBusinessProcessesParams,
  UpdateBusinessProcessInput,
} from "@/services/business-process.rest"
import * as BusinessProcessAPI from "@/services/business-process.rest"

export const businessProcessApi = createApi({
  reducerPath: "businessProcessApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["BusinessProcesses", "BusinessProcess"],
  endpoints: (builder) => ({
    getBusinessProcesses: builder.query<Paginated<BusinessProcess>, GetBusinessProcessesParams>({
      async queryFn(params) {
        try {
          const data = await BusinessProcessAPI.getBusinessProcessesRest(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => [{ type: "BusinessProcesses" }],
    }),

    getBusinessProcess: builder.query<BusinessProcess, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await BusinessProcessAPI.getBusinessProcessRest(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "BusinessProcesses" },
        { type: "BusinessProcess", id },
      ],
    }),

    createBusinessProcess: builder.mutation<BusinessProcess, { input: CreateBusinessProcessInput }>({
      async queryFn({ input }) {
        try {
          const data = await BusinessProcessAPI.createBusinessProcessRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "BusinessProcesses" }],
    }),

    updateBusinessProcess: builder.mutation<BusinessProcess, { id: string; input: UpdateBusinessProcessInput }>({
      async queryFn({ id, input }) {
        try {
          const data = await BusinessProcessAPI.updateBusinessProcessRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "BusinessProcesses" },
        { type: "BusinessProcess", id },
      ],
    }),

    deleteBusinessProcess: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await BusinessProcessAPI.deleteBusinessProcessRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "BusinessProcesses" }],
    }),
  }),
})

export const {
  useGetBusinessProcessesQuery,
  useGetBusinessProcessQuery,
  useCreateBusinessProcessMutation,
  useUpdateBusinessProcessMutation,
  useDeleteBusinessProcessMutation,
} = businessProcessApi
