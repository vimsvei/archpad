import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { TechnologyNetwork, Paginated } from "@/@types/technology-network"
import type {
  CreateTechnologyNetworkInput,
  GetTechnologyNetworksParams,
  UpdateTechnologyNetworkInput,
} from "@/services/technology-network.rest"
import * as TechnologyNetworkAPI from "@/services/technology-network.rest"

export const technologyNetworkApi = createApi({
  reducerPath: "technologyNetworkApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["TechnologyNetworks", "TechnologyNetwork"],
  endpoints: (builder) => ({
    getTechnologyNetworks: builder.query<Paginated<TechnologyNetwork>, GetTechnologyNetworksParams>({
      async queryFn(params) {
        try {
          const data = await TechnologyNetworkAPI.getTechnologyNetworksRest(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => [{ type: "TechnologyNetworks" }],
    }),

    getTechnologyNetwork: builder.query<TechnologyNetwork, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await TechnologyNetworkAPI.getTechnologyNetworkRest(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "TechnologyNetworks" },
        { type: "TechnologyNetwork", id },
      ],
    }),

    createTechnologyNetwork: builder.mutation<TechnologyNetwork, { input: CreateTechnologyNetworkInput }>({
      async queryFn({ input }) {
        try {
          const data = await TechnologyNetworkAPI.createTechnologyNetworkRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "TechnologyNetworks" }],
    }),

    updateTechnologyNetwork: builder.mutation<
      TechnologyNetwork,
      { id: string; input: UpdateTechnologyNetworkInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await TechnologyNetworkAPI.updateTechnologyNetworkRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "TechnologyNetworks" },
        { type: "TechnologyNetwork", id },
      ],
    }),

    deleteTechnologyNetwork: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await TechnologyNetworkAPI.deleteTechnologyNetworkRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "TechnologyNetworks" }],
    }),
  }),
})

export const {
  useGetTechnologyNetworksQuery,
  useGetTechnologyNetworkQuery,
  useCreateTechnologyNetworkMutation,
  useUpdateTechnologyNetworkMutation,
  useDeleteTechnologyNetworkMutation,
} = technologyNetworkApi
