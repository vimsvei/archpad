import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { ApplicationComponent, Paginated } from "@/@types/application-component"
import type {
  CreateApplicationComponentInput,
  UpdateApplicationComponentInput,
} from "@/services/application-components-service"
import * as ApplicationComponentAPI from "@/services/application-components-service"
import type { GetApplicationComponentsParams } from "@/services/application-components-hasura"
import * as ApplicationComponentHasura from "@/services/application-components-hasura"

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
          const data = await ApplicationComponentHasura.getApplicationComponentsHasura(params)
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
          const data = await ApplicationComponentHasura.getApplicationComponentHasura(id)
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
          const data = await ApplicationComponentAPI.createApplicationComponent(input)
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
          const data = await ApplicationComponentAPI.updateApplicationComponent(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(applicationComponentApi.util.updateQueryData("getApplicationComponent", { id }, () => data))
        } catch {
          // ignore
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
  useCreateApplicationComponentMutation,
  useUpdateApplicationComponentMutation,
} = applicationComponentApi


