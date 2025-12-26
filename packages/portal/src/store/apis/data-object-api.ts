import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"

import type { DataObject, Paginated } from "@/@types/data-object"
import type {
  CreateDataObjectInput,
  UpdateDataObjectInput,
} from "@/services/data-object.rest"
import * as DataObjectAPI from "@/services/data-object.rest"
import type { GetDataObjectsParams } from "@/services/data-object.graphql"
import * as DataObjectGraphql from "@/services/data-object.graphql"

export const dataObjectApi = createApi({
  reducerPath: "dataObjectApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["DataObjects", "DataObject"],
  endpoints: (builder) => ({
    getDataObjects: builder.query<
      Paginated<DataObject>,
      GetDataObjectsParams
    >({
      async queryFn(params) {
        try {
          const data = await DataObjectGraphql.getDataObjectsGraphql(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result) => [{ type: "DataObjects" }],
    }),

    getDataObject: builder.query<DataObject, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await DataObjectGraphql.getDataObjectGraphql(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "DataObjects" },
        { type: "DataObject", id },
      ],
    }),

    createDataObject: builder.mutation<DataObject, { input: CreateDataObjectInput }>({
      async queryFn({ input }) {
        try {
          const data = await DataObjectAPI.createDataObjectRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "DataObjects" }],
    }),

    updateDataObject: builder.mutation<
      DataObject,
      { id: string; input: UpdateDataObjectInput }
    >({
      async queryFn({ id, input }) {
        try {
          const data = await DataObjectAPI.updateDataObjectRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(dataObjectApi.util.updateQueryData("getDataObject", { id }, () => data))
        } catch {
          // ignore
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "DataObjects" },
        { type: "DataObject", id },
      ],
    }),

    deleteDataObject: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await DataObjectAPI.deleteDataObjectRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "DataObjects" }],
    }),
  }),
})

export const {
  useGetDataObjectsQuery,
  useGetDataObjectQuery,
  useCreateDataObjectMutation,
  useUpdateDataObjectMutation,
  useDeleteDataObjectMutation,
} = dataObjectApi

