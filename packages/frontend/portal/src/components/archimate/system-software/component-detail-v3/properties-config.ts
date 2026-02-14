export type SystemSoftwareDirectoryField = "typeId" | "licenseTypeId"

export type SystemSoftwareDirectoryOptionsKey =
  | "componentStates"
  | "softwareTypes"
  | "licenseTypes"
  | "criticalLevels"

export type SystemSoftwareEditableSelectConfig = {
  id: string
  labelKey: string
  field: SystemSoftwareDirectoryField
  optionsKey: SystemSoftwareDirectoryOptionsKey
}

export type SystemSoftwareReadonlySelectConfig = {
  id: string
  labelKey: string
  optionsKey: SystemSoftwareDirectoryOptionsKey
}

export type SystemSoftwareReadonlyInputConfig = {
  id: string
  labelKey: string
}

export const systemSoftwareEditableSelectConfig: SystemSoftwareEditableSelectConfig[] = [
  {
    id: "software-type",
    labelKey: "directory.software.type",
    field: "typeId",
    optionsKey: "softwareTypes",
  },
  {
    id: "license-type",
    labelKey: "directory.license.type",
    field: "licenseTypeId",
    optionsKey: "licenseTypes",
  },
]

export const systemSoftwareReadonlySelectConfig: SystemSoftwareReadonlySelectConfig[] = [
  {
    id: "system-software-state",
    labelKey: "item.state",
    optionsKey: "componentStates",
  },
  {
    id: "system-software-critical-level",
    labelKey: "item.criticalLevel",
    optionsKey: "criticalLevels",
  },
]

export const systemSoftwareReadonlyInputConfig: SystemSoftwareReadonlyInputConfig[] = [
  {
    id: "system-software-vendor",
    labelKey: "item.vendor_name",
  },
  {
    id: "system-software-license-count",
    labelKey: "item.licenseCount",
  },
]
