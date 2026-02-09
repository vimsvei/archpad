import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import type { FullProfile } from "@/services/profile.service"
import type { ProfileUpdateInput, ProfileUpdateResult } from "@/services/profile.rest"
import { getProfileFromMe } from "@/services/profile.service"
import { updateProfileRest } from "@/services/profile.rest"

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fakeBaseQuery<unknown>(),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<FullProfile | null, void>({
      async queryFn() {
        try {
          const data = await getProfileFromMe()
          return { data: data ?? null }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<ProfileUpdateResult, ProfileUpdateInput>({
      async queryFn(input) {
        try {
          const data = await updateProfileRest(input)
          return { data }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ["Profile"],
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi
