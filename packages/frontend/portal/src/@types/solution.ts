export type Solution = {
  id: string
  code: string
  name: string
  description: string | null
  context: string | null
  decision: string | null
  consequences: string | null
  alternatives: string | null
  decisionStatus?: string | null
  implementationStatus?: string | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}

export type SolutionFull = {
  id: string
  code: string
  name: string
  description: string | null
  context: string | null
  decision: string | null
  consequences: string | null
  alternatives: string | null
  decisionStatus?: string | null
  implementationStatus?: string | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  components: Array<{ id: string; code: string; name: string; description?: string | null }>
  functions: Array<{ id: string; code: string; name: string; description?: string | null }>
  dataObjects: Array<{ id: string; code: string; name: string; description?: string | null }>
  flows: Array<{
    id: string
    code: string
    name: string
    description?: string | null
    sourceComponent?: { id: string; code: string; name: string } | null
    targetComponent?: { id: string; code: string; name: string } | null
  }>
  motivations: Array<{ id: string; code: string; name: string; description?: string | null }>
  stakeholders: Array<{
    stakeholderId: string
    stakeholderName: string
    roleId: string
    roleName: string
  }>
  technologyNodes: Array<{ id: string; code: string; name: string; description?: string | null }>
  technologyNetworks: Array<{ id: string; code: string; name: string; description?: string | null }>
}

export type { Paginated } from "@archpad/contract"