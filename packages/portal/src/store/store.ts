import { configureStore } from "@reduxjs/toolkit"
import { directoryApi } from "@/store/apis/directory-api"
import { applicationComponentApi } from "@/store/apis/application-component-api"
import { systemSoftwareApi } from "@/store/apis/system-software-api"
import { dataObjectApi } from "@/store/apis/data-object-api"
import { applicationFunctionApi } from "@/store/apis/application-function-api"
import logger from 'redux-logger';

export function makeStore() {
  return configureStore({
    reducer: {
      [directoryApi.reducerPath]: directoryApi.reducer,
      [applicationComponentApi.reducerPath]: applicationComponentApi.reducer,
      [systemSoftwareApi.reducerPath]: systemSoftwareApi.reducer,
      [dataObjectApi.reducerPath]: dataObjectApi.reducer,
      [applicationFunctionApi.reducerPath]: applicationFunctionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      })
        .concat(directoryApi.middleware)
        .concat(applicationComponentApi.middleware)
        .concat(systemSoftwareApi.middleware)
        .concat(dataObjectApi.middleware)
        .concat(applicationFunctionApi.middleware)
        .concat(logger),
    devTools: process.env.NODE_ENV !== "production",
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]


