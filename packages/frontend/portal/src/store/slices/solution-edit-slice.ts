import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { createSelector } from "@reduxjs/toolkit"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"

export type RelatedItem = {
  id: string
  code: string
  name: string
  description?: string | null
}

export type FlowItem = RelatedItem & {
  sourceComponent?: string | null
  sourceFunction?: string | null
  targetComponent?: string | null
  targetFunction?: string | null
}

export type StakeholderItem = {
  id: string // composite key: solutionId-stakeholderId-roleId
  stakeholderId: string
  stakeholderName: string
  roleId: string
  roleName: string
}

export type SolutionEditState = {
  // Basic fields
  code: string
  name: string
  description: string

  // ADR fields
  context: string
  decision: string
  consequences: string
  alternatives: string
  decisionStatus: string | null
  implementationStatus: string | null

  // Related items
  components: RelatedItem[]
  functions: RelatedItem[]
  dataObjects: RelatedItem[]
  flows: FlowItem[]
  motivations: RelatedItem[]
  stakeholders: StakeholderItem[]
  technologyNodes: RelatedItem[]
  technologyNetworks: RelatedItem[]

  // Baseline for dirty checking
  baseline: {
    code: string
    name: string
    description: string
    context: string
    decision: string
    consequences: string
    alternatives: string
    decisionStatus: string | null
    implementationStatus: string | null
    components: RelatedItem[]
    functions: RelatedItem[]
    dataObjects: RelatedItem[]
    flows: FlowItem[]
    motivations: RelatedItem[]
    stakeholders: StakeholderItem[]
    technologyNodes: RelatedItem[]
    technologyNetworks: RelatedItem[]
  } | null

  // Loading state
  isLoading: boolean
  isSaving: boolean
  error: string | null
  saveError: string | null
}

const initialState: SolutionEditState = {
  code: "",
  name: "",
  description: "",
  context: "",
  decision: "",
  consequences: "",
  alternatives: "",
  decisionStatus: null,
  implementationStatus: null,
  components: [],
  functions: [],
  dataObjects: [],
  flows: [],
  motivations: [],
  stakeholders: [],
  technologyNodes: [],
  technologyNetworks: [],
  baseline: null,
  isLoading: false,
  isSaving: false,
  error: null,
  saveError: null,
}

export const solutionEditSlice = createSlice({
  name: "solutionEdit",
  initialState,
  reducers: {
    reset: () => initialState,
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null
      }
    },

    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload
      if (action.payload) {
        state.saveError = null
      }
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
      state.isLoading = false
    },

    setSaveError: (state, action: PayloadAction<string | null>) => {
      state.saveError = action.payload
      state.isSaving = false
    },

    loadSolution: (
      state,
      action: PayloadAction<{
        code: string
        name: string
        description: string | null
        context: string | null
        decision: string | null
        consequences: string | null
        alternatives: string | null
        decisionStatus: string | null
        implementationStatus: string | null
        components: RelatedItem[]
        functions: RelatedItem[]
        dataObjects: RelatedItem[]
        flows: FlowItem[]
        motivations: RelatedItem[]
        stakeholders: StakeholderItem[]
        technologyNodes: RelatedItem[]
        technologyNetworks: RelatedItem[]
      }>
    ) => {
      state.code = action.payload.code
      state.name = action.payload.name
      state.description = action.payload.description ?? ""
      state.context = action.payload.context ?? ""
      state.decision = action.payload.decision ?? ""
      state.consequences = action.payload.consequences ?? ""
      state.alternatives = action.payload.alternatives ?? ""
      state.decisionStatus = action.payload.decisionStatus
      state.implementationStatus = action.payload.implementationStatus
      state.components = action.payload.components
      state.functions = action.payload.functions
      state.dataObjects = action.payload.dataObjects
      state.flows = action.payload.flows
      state.motivations = action.payload.motivations
      state.stakeholders = action.payload.stakeholders
      state.technologyNodes = action.payload.technologyNodes
      state.technologyNetworks = action.payload.technologyNetworks

      // Set baseline
      state.baseline = {
        code: action.payload.code,
        name: action.payload.name,
        description: action.payload.description ?? "",
        context: action.payload.context ?? "",
        decision: action.payload.decision ?? "",
        consequences: action.payload.consequences ?? "",
        alternatives: action.payload.alternatives ?? "",
        decisionStatus: action.payload.decisionStatus,
        implementationStatus: action.payload.implementationStatus,
        components: [...action.payload.components],
        functions: [...action.payload.functions],
        dataObjects: [...action.payload.dataObjects],
        flows: [...action.payload.flows],
        motivations: [...action.payload.motivations],
        stakeholders: [...action.payload.stakeholders],
        technologyNodes: [...action.payload.technologyNodes],
        technologyNetworks: [...action.payload.technologyNetworks],
      }
    },

    updateBasicFields: (state, action: PayloadAction<Partial<BaseObjectValues>>) => {
      if (action.payload.code !== undefined) state.code = action.payload.code
      if (action.payload.name !== undefined) state.name = action.payload.name
      if (action.payload.description !== undefined) state.description = action.payload.description
    },

    updateADRField: (
      state,
      action: PayloadAction<{
        field: "context" | "decision" | "consequences" | "alternatives"
        value: string
      }>
    ) => {
      state[action.payload.field] = action.payload.value
    },

    updateDecisionStatus: (state, action: PayloadAction<string | null>) => {
      state.decisionStatus = action.payload
    },

    updateImplementationStatus: (state, action: PayloadAction<string | null>) => {
      state.implementationStatus = action.payload
    },

    addComponent: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.components.find((c) => c.id === action.payload.id)) {
        state.components.push(action.payload)
      }
    },

    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter((c) => c.id !== action.payload)
    },

    addFunction: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.functions.find((f) => f.id === action.payload.id)) {
        state.functions.push(action.payload)
      }
    },

    removeFunction: (state, action: PayloadAction<string>) => {
      state.functions = state.functions.filter((f) => f.id !== action.payload)
    },

    addDataObject: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.dataObjects.find((d) => d.id === action.payload.id)) {
        state.dataObjects.push(action.payload)
      }
    },

    removeDataObject: (state, action: PayloadAction<string>) => {
      state.dataObjects = state.dataObjects.filter((d) => d.id !== action.payload)
    },

    addFlow: (state, action: PayloadAction<FlowItem>) => {
      if (!state.flows.find((f) => f.id === action.payload.id)) {
        state.flows.push(action.payload)
      }
    },

    removeFlow: (state, action: PayloadAction<string>) => {
      state.flows = state.flows.filter((f) => f.id !== action.payload)
    },

    addMotivation: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.motivations.find((m) => m.id === action.payload.id)) {
        state.motivations.push(action.payload)
      }
    },

    removeMotivation: (state, action: PayloadAction<string>) => {
      state.motivations = state.motivations.filter((m) => m.id !== action.payload)
    },

    addStakeholder: (state, action: PayloadAction<StakeholderItem>) => {
      if (!state.stakeholders.find((s) => s.id === action.payload.id)) {
        state.stakeholders.push(action.payload)
      }
    },

    removeStakeholder: (state, action: PayloadAction<string>) => {
      state.stakeholders = state.stakeholders.filter((s) => s.id !== action.payload)
    },

    addTechnologyNode: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.technologyNodes.find((n) => n.id === action.payload.id)) {
        state.technologyNodes.push(action.payload)
      }
    },

    removeTechnologyNode: (state, action: PayloadAction<string>) => {
      state.technologyNodes = state.technologyNodes.filter((n) => n.id !== action.payload)
    },

    addTechnologyNetwork: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.technologyNetworks.find((n) => n.id === action.payload.id)) {
        state.technologyNetworks.push(action.payload)
      }
    },

    removeTechnologyNetwork: (state, action: PayloadAction<string>) => {
      state.technologyNetworks = state.technologyNetworks.filter((n) => n.id !== action.payload)
    },

    updateBaseline: (state) => {
      if (state.baseline) {
        state.baseline = {
          code: state.code,
          name: state.name,
          description: state.description,
          context: state.context,
          decision: state.decision,
          consequences: state.consequences,
          alternatives: state.alternatives,
          decisionStatus: state.decisionStatus,
          implementationStatus: state.implementationStatus,
          components: [...state.components],
          functions: [...state.functions],
          dataObjects: [...state.dataObjects],
          flows: [...state.flows],
          motivations: [...state.motivations],
          stakeholders: [...state.stakeholders],
          technologyNodes: [...state.technologyNodes],
          technologyNetworks: [...state.technologyNetworks],
        }
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
  loadSolution,
  updateBasicFields,
  updateADRField,
  updateDecisionStatus,
  updateImplementationStatus,
  addComponent,
  removeComponent,
  addFunction,
  removeFunction,
  addDataObject,
  removeDataObject,
  addFlow,
  removeFlow,
  addMotivation,
  removeMotivation,
  addStakeholder,
  removeStakeholder,
  addTechnologyNode,
  removeTechnologyNode,
  addTechnologyNetwork,
  removeTechnologyNetwork,
  updateBaseline,
} = solutionEditSlice.actions

export const solutionEditReducer = solutionEditSlice.reducer

// Memoized selectors for performance
const selectEditState = (state: { solutionEdit: SolutionEditState }) =>
  state.solutionEdit

// Helper function to compare arrays of items by id
function arraysEqual<T extends { id: string }>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false
  const aIds = new Set(a.map(item => item.id))
  const bIds = new Set(b.map(item => item.id))
  if (aIds.size !== bIds.size) return false
  for (const id of aIds) {
    if (!bIds.has(id)) return false
  }
  return true
}

export const selectIsDirty = createSelector([selectEditState], (editState) => {
  if (!editState.baseline) return false

  const baseline = editState.baseline

  const basicChanged =
    editState.code !== baseline.code ||
    editState.name !== baseline.name ||
    editState.description !== baseline.description ||
    editState.context !== baseline.context ||
    editState.decision !== baseline.decision ||
    editState.consequences !== baseline.consequences ||
    editState.alternatives !== baseline.alternatives ||
    editState.decisionStatus !== baseline.decisionStatus ||
    editState.implementationStatus !== baseline.implementationStatus

  const relatedItemsChanged =
    !arraysEqual(editState.components, baseline.components) ||
    !arraysEqual(editState.functions, baseline.functions) ||
    !arraysEqual(editState.dataObjects, baseline.dataObjects) ||
    !arraysEqual(editState.flows, baseline.flows) ||
    !arraysEqual(editState.motivations, baseline.motivations) ||
    !arraysEqual(editState.stakeholders, baseline.stakeholders) ||
    !arraysEqual(editState.technologyNodes, baseline.technologyNodes) ||
    !arraysEqual(editState.technologyNetworks, baseline.technologyNetworks)

  return basicChanged || relatedItemsChanged
})

export const selectIsDraftValid = createSelector([selectEditState], (editState) => {
  return Boolean(editState.code.trim()) && Boolean(editState.name.trim())
})

export const selectBasicFields = createSelector([selectEditState], (editState) => ({
  code: editState.code,
  name: editState.name,
  description: editState.description,
}))

export const selectADRFields = createSelector([selectEditState], (editState) => ({
  context: editState.context,
  decision: editState.decision,
  consequences: editState.consequences,
  alternatives: editState.alternatives,
  decisionStatus: editState.decisionStatus,
  implementationStatus: editState.implementationStatus,
}))