import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  TechnologyNode,
  TechnologyNodeFull,
  Paginated,
} from "@/@types/technology-node"
import type {
  CreateTechnologyNodeInput,
  GetTechnologyNodesParams,
  UpdateTechnologyNodeInput,
} from "@/services/technology-node.rest"
import * as TechnologyNodeAPI from "@/services/technology-node.rest"
import * as NamedObjectHasura from "@/services/named-object.graphql"

export const technologyNodeApi = createApi({
  reducerPath: "technologyNodeApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["TechnologyNodes", "TechnologyNode"],
  endpoints: (builder) => ({
    getTechnologyNodes: builder.query<Paginated<TechnologyNode>, GetTechnologyNodesParams>({
      async queryFn(params) {
        try {
          const data = await TechnologyNodeAPI.getTechnologyNodesRest(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => [{ type: "TechnologyNodes" }],
    }),

    getTechnologyNode: builder.query<TechnologyNode, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await TechnologyNodeAPI.getTechnologyNodeRest(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "TechnologyNodes" },
        { type: "TechnologyNode", id },
      ],
    }),

    getTechnologyNodeFull: builder.query<TechnologyNodeFull, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await NamedObjectHasura.getTechnologyNodeFullGraphql(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "TechnologyNodes" },
        { type: "TechnologyNode", id },
      ],
    }),

    createTechnologyNode: builder.mutation<TechnologyNode, { input: CreateTechnologyNodeInput }>({
      async queryFn({ input }) {
        try {
          const data = await TechnologyNodeAPI.createTechnologyNodeRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "TechnologyNodes" }],
    }),

    updateTechnologyNode: builder.mutation<TechnologyNode, { id: string; input: UpdateTechnologyNodeInput }>({
      async queryFn({ id, input }) {
        try {
          const data = await TechnologyNodeAPI.updateTechnologyNodeRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "TechnologyNodes" },
        { type: "TechnologyNode", id },
      ],
    }),

    deleteTechnologyNode: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await TechnologyNodeAPI.deleteTechnologyNodeRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "TechnologyNodes" }],
    }),
  }),
})

export const {
  useGetTechnologyNodesQuery,
  useGetTechnologyNodeQuery,
  useGetTechnologyNodeFullQuery,
  useCreateTechnologyNodeMutation,
  useUpdateTechnologyNodeMutation,
  useDeleteTechnologyNodeMutation,
} = technologyNodeApi
