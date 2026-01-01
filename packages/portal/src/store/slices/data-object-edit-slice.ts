import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import type { DataObjectFull } from "@/services/data-object.graphql"

export type RelatedItem = {
  id: string
  code: string
  name: string
  description?: string | null
}

export type FunctionUsage = NonNullable<DataObjectFull["functionUsages"]>[number]

export type DataObjectEditState = {
  code: string
  name: string
  description: string

  // Read-only usage data (from GraphQL read model)
  components: RelatedItem[]
  functionUsages: FunctionUsage[]

  baseline: {
    code: string
    name: string
    description: string
  } | null

  isLoading: boolean
  isSaving: boolean
  error: string | null
  saveError: string | null
}

const initialState: DataObjectEditState = {
  code: "",
  name: "",
  description: "",
  components: [],
  functionUsages: [],
  baseline: null,
  isLoading: false,
  isSaving: false,
  error: null,
  saveError: null,
}

export const dataObjectEditSlice = createSlice({
  name: "dataObjectEdit",
  initialState,
  reducers: {
    reset: () => initialState,

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) state.error = null
    },

    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload
      if (action.payload) state.saveError = null
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },

    setSaveError: (state, action: PayloadAction<string | null>) => {
      state.saveError = action.payload
      state.isSaving = false
    },

    loadDataObject: (
      state,
      action: PayloadAction<{
        code: string
        name: string
        description: string | null
        components: RelatedItem[]
        functionUsages: FunctionUsage[]
      }>
    ) => {
      state.code = action.payload.code
      state.name = action.payload.name
      state.description = action.payload.description ?? ""
      state.components = action.payload.components
      state.functionUsages = action.payload.functionUsages

      state.baseline = {
        code: action.payload.code,
        name: action.payload.name,
        description: action.payload.description ?? "",
      }
    },

    updateBasicFields: (state, action: PayloadAction<Partial<BaseObjectValues>>) => {
      if (action.payload.code !== undefined) state.code = action.payload.code
      if (action.payload.name !== undefined) state.name = action.payload.name
      if (action.payload.description !== undefined) state.description = action.payload.description
    },

    updateBaseline: (state) => {
      if (!state.baseline) return
      state.baseline = {
        code: state.code,
        name: state.name,
        description: state.description,
      }
    },
  },
})

export const {
  reset,
  setLoading,
  setSaving,
  setError,
  setSaveError,
  loadDataObject,
  updateBasicFields,
  updateBaseline,
} = dataObjectEditSlice.actions

export const dataObjectEditReducer = dataObjectEditSlice.reducer

const selectEditState = (state: { dataObjectEdit: DataObjectEditState }) => state.dataObjectEdit

export const selectIsDirty = createSelector([selectEditState], (s) => {
  if (!s.baseline) return false
  return s.code !== s.baseline.code || s.name !== s.baseline.name || s.description !== s.baseline.description
})

export const selectIsDraftValid = createSelector([selectEditState], (s) => {
  return Boolean(s.name.trim())
})

export const selectBasicFields = createSelector([selectEditState], (s) => ({
  code: s.code,
  name: s.name,
  description: s.description,
}))


