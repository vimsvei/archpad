import { configureStore } from "@reduxjs/toolkit"
import { directoryApi } from "@/store/apis/directory-api"
import { applicationComponentApi } from "@/store/apis/application-component-api"
import { systemSoftwareApi } from "@/store/apis/system-software-api"
import { dataObjectApi } from "@/store/apis/data-object-api"
import { applicationFunctionApi } from "@/store/apis/application-function-api"
import { solutionApi } from "@/store/apis/solution-api"
import { profileApi } from "@/store/apis/profile-api"
import { applicationComponentEditReducer } from "@/store/slices/application-component-edit-slice"
import { solutionEditReducer } from "@/store/slices/solution-edit-slice"
import { dataObjectEditReducer } from "@/store/slices/data-object-edit-slice"
import { directoriesReducer } from "@/store/slices/directories-slice"
import { authFormsReducer } from "@/store/slices/auth-forms-slice"
import { directoriesMiddleware } from "@/store/middleware/directories-middleware"
import { openExchangeImportReducer } from "@/store/slices/open-exchange-import-slice"
import { drawIoImportReducer } from "@/store/slices/draw-io-import-slice"

export function makeStore() {
  return configureStore({
    reducer: {
      [directoryApi.reducerPath]: directoryApi.reducer,
      [applicationComponentApi.reducerPath]: applicationComponentApi.reducer,
      [systemSoftwareApi.reducerPath]: systemSoftwareApi.reducer,
      [dataObjectApi.reducerPath]: dataObjectApi.reducer,
      [applicationFunctionApi.reducerPath]: applicationFunctionApi.reducer,
      [solutionApi.reducerPath]: solutionApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
      authForms: authFormsReducer,
      applicationComponentEdit: applicationComponentEditReducer,
      solutionEdit: solutionEditReducer,
      dataObjectEdit: dataObjectEditReducer,
      directories: directoriesReducer,
      openExchangeImport: openExchangeImportReducer,
      drawIoImport: drawIoImportReducer,
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
        .concat(solutionApi.middleware)
        .concat(profileApi.middleware)
        .prepend(directoriesMiddleware.middleware),
        // .concat(logger),
    // devTools: process.env.NODE_ENV !== "production",
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]

