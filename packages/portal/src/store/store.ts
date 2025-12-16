import { configureStore } from "@reduxjs/toolkit"
import { directoryApi } from "@/store/apis/directory-api"

export function makeStore() {
  return configureStore({
    reducer: {
      [directoryApi.reducerPath]: directoryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(directoryApi.middleware),
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]


