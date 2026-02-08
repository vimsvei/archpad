export type ApplicationComponent = {
  id: string
  code: string
  name: string
  description: string | null
  state?: { name: string; color?: string | null } | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}

export type { Paginated } from "@archpad/contract"

export type ApplicationComponentDirectoryFields = {
  stateId: string | null
  licenseTypeId: string | null
  architectureStyleId: string | null
  criticalLevelId: string | null
  failoverTypeId: string | null
  recoveryTimeId: string | null
  redundancyTypeId: string | null
  monitoringLevelId: string | null
  scalingTypeId: string | null
}
