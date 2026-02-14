import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { ApplicationFunction, Paginated } from "@/@types/application-function"
import type {
  CreateApplicationFunctionInput,
  GetApplicationFunctionsParams,
  UpdateApplicationFunctionInput,
} from "@/services/application-function.rest"
import * as ApplicationFunctionAPI from "@/services/application-function.rest"

export const applicationFunctionApi = createApi({
  reducerPath: "applicationFunctionApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["ApplicationFunctions", "ApplicationFunction"],
  endpoints: (builder) => ({
    getApplicationFunctions: builder.query<
      Paginated<ApplicationFunction>,
      GetApplicationFunctionsParams
    >({
      async queryFn(params) {
        try {
          const data = await ApplicationFunctionAPI.getApplicationFunctionsRest(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result) => [{ type: "ApplicationFunctions" }],
    }),

    getApplicationFunction: builder.query<ApplicationFunction, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await ApplicationFunctionAPI.getApplicationFunctionRest(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "ApplicationFunctions" },
        { type: "ApplicationFunction", id },
      ],
    }),

    createApplicationFunction: builder.mutation<ApplicationFunction, { input: CreateApplicationFunctionInput }>({
      async queryFn({ input }) {
        try {
          const data = await ApplicationFunctionAPI.createApplicationFunctionRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "ApplicationFunctions" }],
    }),

    updateApplicationFunction: builder.mutation<
      ApplicationFunction,
      { id: string; input: UpdateApplicationFunctionInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await ApplicationFunctionAPI.updateApplicationFunctionRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(applicationFunctionApi.util.updateQueryData("getApplicationFunction", { id }, () => data))
        } catch {
          // ignore
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ApplicationFunctions" },
        { type: "ApplicationFunction", id },
      ],
    }),

    deleteApplicationFunction: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await ApplicationFunctionAPI.deleteApplicationFunctionRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "ApplicationFunctions" }],
    }),
  }),
})

export const {
  useGetApplicationFunctionsQuery,
  useGetApplicationFunctionQuery,
  useCreateApplicationFunctionMutation,
  useUpdateApplicationFunctionMutation,
  useDeleteApplicationFunctionMutation,
} = applicationFunctionApi
