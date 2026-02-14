import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { FlowDetail, FlowListItem, Paginated } from "@/@types/flow"
import type {
  CreateFlowInput,
  GetFlowsParams,
  UpdateFlowInput,
} from "@/services/flow.rest"
import * as FlowAPI from "@/services/flow.rest"

export const flowApi = createApi({
  reducerPath: "flowApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["Flows", "Flow"],
  endpoints: (builder) => ({
    getFlows: builder.query<Paginated<FlowListItem>, GetFlowsParams>({
      async queryFn(params) {
        try {
          const data = await FlowAPI.getFlowsRest(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => [{ type: "Flows" }],
    }),

    getFlow: builder.query<FlowDetail, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await FlowAPI.getFlowRest(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "Flows" },
        { type: "Flow", id },
      ],
    }),

    createFlow: builder.mutation<FlowDetail, { input: CreateFlowInput }>({
      async queryFn({ input }) {
        try {
          const data = await FlowAPI.createFlowRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "Flows" }],
    }),

    updateFlow: builder.mutation<FlowDetail, { id: string; input: UpdateFlowInput }>({
      async queryFn({ id, input }) {
        try {
          const data = await FlowAPI.updateFlowRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(flowApi.util.updateQueryData("getFlow", { id }, () => data))
        } catch {
          // ignore
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Flows" },
        { type: "Flow", id },
      ],
    }),

    deleteFlow: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await FlowAPI.deleteFlowRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "Flows" }],
    }),

    unlinkFlowProxyComponent: builder.mutation<void, { id: string; componentId: string }>({
      async queryFn({ id, componentId }) {
        try {
          await FlowAPI.unlinkFlowProxyComponentRest(id, componentId)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Flows" },
        { type: "Flow", id },
      ],
    }),

    unlinkFlowProxyNode: builder.mutation<void, { id: string; nodeId: string }>({
      async queryFn({ id, nodeId }) {
        try {
          await FlowAPI.unlinkFlowProxyNodeRest(id, nodeId)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Flows" },
        { type: "Flow", id },
      ],
    }),
  }),
})

export const {
  useGetFlowsQuery,
  useGetFlowQuery,
  useCreateFlowMutation,
  useUpdateFlowMutation,
  useDeleteFlowMutation,
  useUnlinkFlowProxyComponentMutation,
  useUnlinkFlowProxyNodeMutation,
} = flowApi

