import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { createSelector } from "@reduxjs/toolkit"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import type { ApplicationComponentDirectoryFields } from "@/@types/application-component"

export type RelatedItem = {
  id: string
  code: string
  name: string
  description?: string | null
}

export type SystemSoftwareItem = RelatedItem & {
  kind: string
}

export type TechnologyNodeItem = RelatedItem

export type TechnologyNetworkItem = RelatedItem

export type FlowItem = RelatedItem & {
  sourceComponent?: string | null
  sourceFunction?: string | null
  sourceInterface?: string | null
  targetComponent?: string | null
  targetFunction?: string | null
  targetInterface?: string | null
}

export type StakeholderItem = {
  id: string // composite key: componentId-stakeholderId-roleId
  stakeholderId: string
  stakeholderName: string
  roleId: string
  roleName: string
}

export type ApplicationComponentEditState = {
  // Basic fields
  code: string
  name: string
  description: string
  stateId: string | null

  // Directory fields
  directoryFields: ApplicationComponentDirectoryFields

  // Related items
  functions: RelatedItem[]
  dataObjects: RelatedItem[]
  interfaces: RelatedItem[]
  events: RelatedItem[]
  systemSoftware: SystemSoftwareItem[]
  technologyNodes: TechnologyNodeItem[]
  technologyNetworks: TechnologyNetworkItem[]
  parents: RelatedItem[]
  children: RelatedItem[]
  stakeholders: StakeholderItem[]
  incomingFlows: FlowItem[]
  outgoingFlows: FlowItem[]

  // Baseline for dirty checking
  baseline: {
    code: string
    name: string
    description: string
    stateId: string | null
    directoryFields: ApplicationComponentDirectoryFields
    functions: RelatedItem[]
    dataObjects: RelatedItem[]
    interfaces: RelatedItem[]
    events: RelatedItem[]
    systemSoftware: SystemSoftwareItem[]
    technologyNodes: TechnologyNodeItem[]
      technologyNetworks: TechnologyNetworkItem[]
      parents: RelatedItem[]
      children: RelatedItem[]
      stakeholders: StakeholderItem[]
      incomingFlows: FlowItem[]
      outgoingFlows: FlowItem[]
    } | null

  // Loading state
  isLoading: boolean
  isSaving: boolean
  error: string | null
  saveError: string | null
}

const initialState: ApplicationComponentEditState = {
  code: "",
  name: "",
  description: "",
  stateId: null,
  directoryFields: {
    stateId: null,
    licenseTypeId: null,
    architectureStyleId: null,
    criticalLevelId: null,
    failoverTypeId: null,
    recoveryTimeId: null,
    redundancyTypeId: null,
    monitoringLevelId: null,
    scalingTypeId: null,
  },
  functions: [],
  dataObjects: [],
  interfaces: [],
  events: [],
  systemSoftware: [],
  technologyNodes: [],
  technologyNetworks: [],
  parents: [],
  children: [],
  stakeholders: [],
  incomingFlows: [],
  outgoingFlows: [],
  baseline: null,
  isLoading: false,
  isSaving: false,
  error: null,
  saveError: null,
}

export const applicationComponentEditSlice = createSlice({
  name: "applicationComponentEdit",
  initialState,
  reducers: {
    reset: () => initialState,
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      if (action.payload) {
        state.error = null // Clear error when starting to load
      }
    },

    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload
      if (action.payload) {
        state.saveError = null // Clear error when starting to save
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

    loadComponent: (
      state,
      action: PayloadAction<{
        code: string
        name: string
        description: string | null
        stateId: string | null
        directoryFields: ApplicationComponentDirectoryFields
        functions: RelatedItem[]
        dataObjects: RelatedItem[]
        interfaces: RelatedItem[]
        events: RelatedItem[]
        systemSoftware: SystemSoftwareItem[]
        technologyNodes: TechnologyNodeItem[]
        technologyNetworks: TechnologyNetworkItem[]
        parents: RelatedItem[]
        children: RelatedItem[]
        stakeholders: StakeholderItem[]
        incomingFlows: FlowItem[]
        outgoingFlows: FlowItem[]
      }>
    ) => {
      state.code = action.payload.code
      state.name = action.payload.name
      state.description = action.payload.description ?? ""
      state.stateId = action.payload.stateId
      state.directoryFields = action.payload.directoryFields
      state.functions = action.payload.functions
      state.dataObjects = action.payload.dataObjects
      state.interfaces = action.payload.interfaces
      state.events = action.payload.events
      state.systemSoftware = action.payload.systemSoftware
      state.technologyNodes = action.payload.technologyNodes
      state.technologyNetworks = action.payload.technologyNetworks
      state.parents = action.payload.parents
      state.children = action.payload.children
      state.stakeholders = action.payload.stakeholders
      state.incomingFlows = action.payload.incomingFlows
      state.outgoingFlows = action.payload.outgoingFlows

      // Set baseline
      state.baseline = {
        code: action.payload.code,
        name: action.payload.name,
        description: action.payload.description ?? "",
        stateId: action.payload.stateId,
        directoryFields: { ...action.payload.directoryFields },
        functions: [...action.payload.functions],
        dataObjects: [...action.payload.dataObjects],
        interfaces: [...action.payload.interfaces],
        events: [...action.payload.events],
        systemSoftware: [...action.payload.systemSoftware],
        technologyNodes: [...action.payload.technologyNodes],
        technologyNetworks: [...action.payload.technologyNetworks],
        parents: [...action.payload.parents],
        children: [...action.payload.children],
        stakeholders: [...action.payload.stakeholders],
        incomingFlows: [...action.payload.incomingFlows],
        outgoingFlows: [...action.payload.outgoingFlows],
      }
    },

    updateBasicFields: (state, action: PayloadAction<Partial<BaseObjectValues>>) => {
      if (action.payload.code !== undefined) state.code = action.payload.code
      if (action.payload.name !== undefined) state.name = action.payload.name
      if (action.payload.description !== undefined) state.description = action.payload.description
    },

    updateStateId: (state, action: PayloadAction<string | null>) => {
      state.stateId = action.payload
      state.directoryFields.stateId = action.payload
    },

    updateDirectoryField: (
      state,
      action: PayloadAction<{ field: keyof ApplicationComponentDirectoryFields; value: string | null }>
    ) => {
      state.directoryFields[action.payload.field] = action.payload.value
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

    addInterface: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.interfaces.find((i) => i.id === action.payload.id)) {
        state.interfaces.push(action.payload)
      }
    },

    removeInterface: (state, action: PayloadAction<string>) => {
      state.interfaces = state.interfaces.filter((i) => i.id !== action.payload)
    },

    addEvent: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.events.find((e) => e.id === action.payload.id)) {
        state.events.push(action.payload)
      }
    },

    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((e) => e.id !== action.payload)
    },

    addSystemSoftware: (state, action: PayloadAction<SystemSoftwareItem>) => {
      if (!state.systemSoftware.find((s) => s.id === action.payload.id)) {
        state.systemSoftware.push(action.payload)
      }
    },

    removeSystemSoftware: (state, action: PayloadAction<string>) => {
      state.systemSoftware = state.systemSoftware.filter((s) => s.id !== action.payload)
    },

    addTechnologyNode: (state, action: PayloadAction<TechnologyNodeItem>) => {
      if (!state.technologyNodes.find((n) => n.id === action.payload.id)) {
        state.technologyNodes.push(action.payload)
      }
    },

    removeTechnologyNode: (state, action: PayloadAction<string>) => {
      state.technologyNodes = state.technologyNodes.filter((n) => n.id !== action.payload)
    },

    addTechnologyNetwork: (state, action: PayloadAction<TechnologyNetworkItem>) => {
      if (!state.technologyNetworks.find((n) => n.id === action.payload.id)) {
        state.technologyNetworks.push(action.payload)
      }
    },

    removeTechnologyNetwork: (state, action: PayloadAction<string>) => {
      state.technologyNetworks = state.technologyNetworks.filter((n) => n.id !== action.payload)
    },

    addParent: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.parents.find((p) => p.id === action.payload.id)) {
        state.parents.push(action.payload)
      }
    },

    removeParent: (state, action: PayloadAction<string>) => {
      state.parents = state.parents.filter((p) => p.id !== action.payload)
    },

    addChild: (state, action: PayloadAction<RelatedItem>) => {
      if (!state.children.find((c) => c.id === action.payload.id)) {
        state.children.push(action.payload)
      }
    },

    removeChild: (state, action: PayloadAction<string>) => {
      state.children = state.children.filter((c) => c.id !== action.payload)
    },

    addStakeholder: (state, action: PayloadAction<StakeholderItem>) => {
      if (!state.stakeholders.find((s) => s.id === action.payload.id)) {
        state.stakeholders.push(action.payload)
      }
    },

    removeStakeholder: (state, action: PayloadAction<string>) => {
      state.stakeholders = state.stakeholders.filter((s) => s.id !== action.payload)
    },

    addFlow: (state, action: PayloadAction<FlowItem & { isIncoming: boolean }>) => {
      const { isIncoming, ...flow } = action.payload
      if (isIncoming) {
        if (!state.incomingFlows.find((f) => f.id === flow.id)) {
          state.incomingFlows.push(flow)
        }
      } else {
        if (!state.outgoingFlows.find((f) => f.id === flow.id)) {
          state.outgoingFlows.push(flow)
        }
      }
    },

    removeFlow: (state, action: PayloadAction<{ id: string; isIncoming: boolean }>) => {
      if (action.payload.isIncoming) {
        state.incomingFlows = state.incomingFlows.filter((f) => f.id !== action.payload.id)
      } else {
        state.outgoingFlows = state.outgoingFlows.filter((f) => f.id !== action.payload.id)
      }
    },

    updateBaseline: (state) => {
      if (state.baseline) {
        state.baseline = {
          code: state.code,
          name: state.name,
          description: state.description,
          stateId: state.stateId,
          directoryFields: { ...state.directoryFields },
          functions: [...state.functions],
          dataObjects: [...state.dataObjects],
          interfaces: [...state.interfaces],
          events: [...state.events],
          systemSoftware: [...state.systemSoftware],
          technologyNodes: [...state.technologyNodes],
          technologyNetworks: [...state.technologyNetworks],
          parents: [...state.parents],
          children: [...state.children],
          stakeholders: [...state.stakeholders],
          incomingFlows: [...state.incomingFlows],
          outgoingFlows: [...state.outgoingFlows],
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
  loadComponent,
  updateBasicFields,
  updateStateId,
  updateDirectoryField,
  addFunction,
  removeFunction,
  addDataObject,
  removeDataObject,
  addInterface,
  removeInterface,
  addEvent,
  removeEvent,
  addSystemSoftware,
  removeSystemSoftware,
  addTechnologyNode,
  removeTechnologyNode,
  addTechnologyNetwork,
  removeTechnologyNetwork,
  addParent,
  removeParent,
  addChild,
  removeChild,
  addStakeholder,
  removeStakeholder,
  addFlow,
  removeFlow,
  updateBaseline,
} = applicationComponentEditSlice.actions

export const applicationComponentEditReducer = applicationComponentEditSlice.reducer

// Memoized selectors for performance
const selectEditState = (state: { applicationComponentEdit: ApplicationComponentEditState }) =>
  state.applicationComponentEdit

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
    editState.stateId !== baseline.stateId

  const directoryChanged = Object.keys(editState.directoryFields).some(
    (key) =>
      editState.directoryFields[key as keyof typeof editState.directoryFields] !==
      baseline.directoryFields[key as keyof typeof baseline.directoryFields]
  )

  const relatedItemsChanged =
    !arraysEqual(editState.functions, baseline.functions) ||
    !arraysEqual(editState.dataObjects, baseline.dataObjects) ||
    !arraysEqual(editState.interfaces, baseline.interfaces) ||
    !arraysEqual(editState.events, baseline.events) ||
    !arraysEqual(editState.systemSoftware, baseline.systemSoftware) ||
    !arraysEqual(editState.technologyNodes, baseline.technologyNodes) ||
    !arraysEqual(editState.technologyNetworks, baseline.technologyNetworks) ||
    !arraysEqual(editState.parents, baseline.parents) ||
    !arraysEqual(editState.children, baseline.children) ||
    !arraysEqual(editState.incomingFlows, baseline.incomingFlows) ||
    !arraysEqual(editState.outgoingFlows, baseline.outgoingFlows)

  return basicChanged || directoryChanged || relatedItemsChanged
})

export const selectIsDraftValid = createSelector([selectEditState], (editState) => {
  return Boolean(editState.code.trim()) && Boolean(editState.name.trim())
})

export const selectBasicFields = createSelector([selectEditState], (editState) => ({
  code: editState.code,
  name: editState.name,
  description: editState.description,
}))

export const selectRelatedItemsCounts = createSelector([selectEditState], (editState) => ({
  functions: editState.functions.length,
  dataObjects: editState.dataObjects.length,
  interfaces: editState.interfaces.length,
  events: editState.events.length,
  systemSoftware: editState.systemSoftware.length,
  technologyNodes: editState.technologyNodes.length,
  technologyNetworks: editState.technologyNetworks.length,
  parents: editState.parents.length,
  children: editState.children.length,
  incomingFlows: editState.incomingFlows.length,
  outgoingFlows: editState.outgoingFlows.length,
}))

