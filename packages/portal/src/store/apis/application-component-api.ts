import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import type {
  CreateApplicationComponentInput,
  UpdateApplicationComponentInput,
  UpdateApplicationComponentFullInput,
} from "@/services/application-component.rest"
import * as ApplicationComponentAPI from "@/services/application-component.rest"
import type { GetApplicationComponentsParams, ApplicationComponentFull } from "@/services/application-component.graphql"
import * as ApplicationComponentHasura from "@/services/application-component.graphql"

export const applicationComponentApi = createApi({
  reducerPath: "applicationComponentApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["ApplicationComponents", "ApplicationComponent"],
  endpoints: (builder) => ({
    getApplicationComponents: builder.query<
      Paginated<ApplicationComponent>,
      GetApplicationComponentsParams
    >({
      async queryFn(params) {
        try {
          const data = await ApplicationComponentHasura.getApplicationComponentsGraphql(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result) => [{ type: "ApplicationComponents" }],
    }),

    getApplicationComponent: builder.query<ApplicationComponent, { id: string }>({
      async queryFn({ id }) {
        try {
          // Use full query and extract basic fields for compatibility
          const fullData = await ApplicationComponentHasura.getApplicationComponentFullGraphql(id)
          const data: ApplicationComponent = {
            id: fullData.id,
            code: fullData.code,
            name: fullData.name,
            description: fullData.description,
            state: fullData.state ? { name: fullData.state.name, color: fullData.state.color } : null,
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
        { type: "ApplicationComponents" },
        { type: "ApplicationComponent", id },
      ],
    }),

    getApplicationComponentFull: builder.query<ApplicationComponentFull, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await ApplicationComponentHasura.getApplicationComponentFullGraphql(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "ApplicationComponents" },
        { type: "ApplicationComponent", id },
      ],
    }),

    createApplicationComponent: builder.mutation<ApplicationComponent, { input: CreateApplicationComponentInput }>({
      async queryFn({ input }) {
        try {
          const data = await ApplicationComponentAPI.createApplicationComponentRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "ApplicationComponents" }],
    }),

    updateApplicationComponent: builder.mutation<
      ApplicationComponent,
      { id: string; input: UpdateApplicationComponentInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await ApplicationComponentAPI.updateApplicationComponentRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // Update both queries cache
          dispatch(applicationComponentApi.util.updateQueryData("getApplicationComponent", { id }, () => data))
          // Also update full query cache if it exists
          dispatch(
            applicationComponentApi.util.updateQueryData("getApplicationComponentFull", { id }, (draft) => {
              if (draft) {
                draft.code = data.code
                draft.name = data.name
                draft.description = data.description
                if (data.state && draft.state) {
                  draft.state.name = data.state.name
                  draft.state.color = data.state.color
                }
              }
            })
          )
        } catch {
          // ignore
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ApplicationComponents" },
        { type: "ApplicationComponent", id },
      ],
    }),

    updateApplicationComponentFull: builder.mutation<
      ApplicationComponent,
      { id: string; input: UpdateApplicationComponentFullInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await ApplicationComponentAPI.updateApplicationComponentFullRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ApplicationComponents" },
        { type: "ApplicationComponent", id },
      ],
    }),
  }),
})

export const {
  useGetApplicationComponentsQuery,
  useGetApplicationComponentQuery,
  useGetApplicationComponentFullQuery,
  useCreateApplicationComponentMutation,
  useUpdateApplicationComponentMutation,
  useUpdateApplicationComponentFullMutation,
} = applicationComponentApi


