import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ApplicationEvent, Paginated } from "@/@types/application-event"
import type {
  CreateApplicationEventInput,
  GetApplicationEventsParams,
  UpdateApplicationEventInput,
} from "@/services/application-event.rest"
import * as ApplicationEventAPI from "@/services/application-event.rest"

export const applicationEventApi = createApi({
  reducerPath: "applicationEventApi",
  baseQuery: fakeBaseQuery<unknown>(),
  keepUnusedDataFor: 60 * 10,
  tagTypes: ["ApplicationEvents", "ApplicationEvent"],
  endpoints: (builder) => ({
    getApplicationEvents: builder.query<Paginated<ApplicationEvent>, GetApplicationEventsParams>({
      async queryFn(params) {
        try {
          const data = await ApplicationEventAPI.getApplicationEventsRest(params)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: () => [{ type: "ApplicationEvents" }],
    }),

    getApplicationEvent: builder.query<ApplicationEvent, { id: string }>({
      async queryFn({ id }) {
        try {
          const data = await ApplicationEventAPI.getApplicationEventRest(id)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      providesTags: (_result, _error, { id }) => [
        { type: "ApplicationEvents" },
        { type: "ApplicationEvent", id },
      ],
    }),

    createApplicationEvent: builder.mutation<ApplicationEvent, { input: CreateApplicationEventInput }>({
      async queryFn({ input }) {
        try {
          const data = await ApplicationEventAPI.createApplicationEventRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "ApplicationEvents" }],
    }),

    updateApplicationEvent: builder.mutation<ApplicationEvent, { id: string; input: UpdateApplicationEventInput }>({
      async queryFn({ id, input }) {
        try {
          const data = await ApplicationEventAPI.updateApplicationEventRest(id, input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "ApplicationEvents" },
        { type: "ApplicationEvent", id },
      ],
    }),

    deleteApplicationEvent: builder.mutation<void, { id: string }>({
      async queryFn({ id }) {
        try {
          await ApplicationEventAPI.deleteApplicationEventRest(id)
          return { data: undefined }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: () => [{ type: "ApplicationEvents" }],
    }),
  }),
})

export const {
  useGetApplicationEventsQuery,
  useGetApplicationEventQuery,
  useCreateApplicationEventMutation,
  useUpdateApplicationEventMutation,
  useDeleteApplicationEventMutation,
} = applicationEventApi
