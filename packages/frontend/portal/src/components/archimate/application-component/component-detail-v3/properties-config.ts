import type { DirectoryFields } from "./properties-sidebar"

export type ApplicationComponentDirectoryOptionsKey =
  | "architectureStyles"
  | "licenseTypes"
  | "criticalLevels"
  | "failoverTypes"
  | "recoveryTimes"
  | "redundancyTypes"
  | "monitoringLevels"
  | "scalingTypes"

export type ApplicationComponentDirectorySelectConfig = {
  id: string
  labelKey: string
  field: keyof DirectoryFields
  optionsKey: ApplicationComponentDirectoryOptionsKey
}

export const applicationComponentDirectorySelectConfig: ApplicationComponentDirectorySelectConfig[] = [
  {
    id: "architecture",
    labelKey: "directory.architecture.style",
    field: "architectureStyleId",
    optionsKey: "architectureStyles",
  },
  {
    id: "license",
    labelKey: "directory.license.type",
    field: "licenseTypeId",
    optionsKey: "licenseTypes",
  },
  {
    id: "critical",
    labelKey: "directory.critical.level",
    field: "criticalLevelId",
    optionsKey: "criticalLevels",
  },
  {
    id: "failover",
    labelKey: "directory.failover.type",
    field: "failoverTypeId",
    optionsKey: "failoverTypes",
  },
  {
    id: "recovery",
    labelKey: "directory.recovery.time",
    field: "recoveryTimeId",
    optionsKey: "recoveryTimes",
  },
  {
    id: "redundancy",
    labelKey: "directory.redundancy.type",
    field: "redundancyTypeId",
    optionsKey: "redundancyTypes",
  },
  {
    id: "monitoring",
    labelKey: "directory.monitoring.level",
    field: "monitoringLevelId",
    optionsKey: "monitoringLevels",
  },
  {
    id: "scaling",
    labelKey: "directory.scaling.type",
    field: "scalingTypeId",
    optionsKey: "scalingTypes",
  },
]
