import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { Solution, Paginated } from "@/@types/solution"
import type {
  CreateSolutionInput,
  UpdateSolutionInput,
  UpdateSolutionFullInput,
} from "@/services/solution.rest"
import * as SolutionAPI from "@/services/solution.rest"
import type { GetSolutionsParams, SolutionFull } from "@/services/solution.graphql"
import * as SolutionHasura from "@/services/solution.graphql"

export const solutionApi = createApi({
  reducerPath: "solutionApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["Solutions", "Solution"],
  endpoints: (builder) => ({
    getSolutions: builder.query<
      Paginated<Solution>,
      GetSolutionsParams
    >({
      async queryFn(params) {
        try {
          // TODO: Use GraphQL when implemented
          // For now, use REST API directly
          const data = await SolutionHasura.getSolutionsGraphql(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result) => [{ type: "Solutions" }],
    }),

    getSolution: builder.query<Solution, { id: string }>({
      async queryFn({ id }) {
        try {
          // TODO: Use GraphQL when implemented
          // For now, use REST API
          const fullData = await SolutionHasura.getSolutionFullGraphql(id)
          const data: Solution = {
            id: fullData.id,
            code: fullData.code,
            name: fullData.name,
            description: fullData.description,
            context: fullData.context,
            decision: fullData.decision,
            consequences: fullData.consequences,
            alternatives: fullData.alternatives,
            decisionStatus: fullData.decisionStatus,
            implementationStatus: fullData.implementationStatus,
            createdAt: fullData.createdAt,
            createdBy: fullData.createdBy,
            updatedAt: fullData.updatedAt,
            updatedBy: fullData.updatedBy,
          }
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "Solutions" },
        { type: "Solution", id },
      ],
    }),

    getSolutionFull: builder.query<SolutionFull, { id: string }>({
      async queryFn({ id }) {
        try {
          // In private zone, id is always UUID
          const data = await SolutionHasura.getSolutionFullGraphql(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "Solutions" },
        { type: "Solution", id },
      ],
    }),

    createSolution: builder.mutation<Solution, { input: CreateSolutionInput }>({
      async queryFn({ input }) {
        try {
          const data = await SolutionAPI.createSolutionRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "Solutions" }],
    }),

    updateSolution: builder.mutation<
      Solution,
      { id: string; input: UpdateSolutionInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await SolutionAPI.updateSolutionRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // Update both queries cache
          dispatch(solutionApi.util.updateQueryData("getSolution", { id }, () => data))
          // Also update full query cache if it exists
          dispatch(
            solutionApi.util.updateQueryData("getSolutionFull", { id }, (draft) => {
              if (draft) {
                draft.code = data.code
                draft.name = data.name
                draft.description = data.description
                draft.context = data.context
                draft.decision = data.decision
                draft.consequences = data.consequences
                draft.alternatives = data.alternatives
              }
            })
          )
        } catch {
          // ignore
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Solutions" },
        { type: "Solution", id },
      ],
    }),

    updateSolutionFull: builder.mutation<
      Solution,
      { id: string; input: UpdateSolutionFullInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await SolutionAPI.updateSolutionFullRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Solutions" },
        { type: "Solution", id },
      ],
    }),
  }),
})

export const {
  useGetSolutionsQuery,
  useGetSolutionQuery,
  useGetSolutionFullQuery,
  useCreateSolutionMutation,
  useUpdateSolutionMutation,
  useUpdateSolutionFullMutation,
} = solutionApi