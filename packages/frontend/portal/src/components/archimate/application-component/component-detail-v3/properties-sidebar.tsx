"use client"

import { useDirectoryItems } from "@/hooks/use-directory-items"
import {
  mapDirectoryItemsToSelectOptions,
} from "@/components/shared/archimate/property-fields"
import {
  PropertiesSection,
  type PropertiesSectionField,
} from "@/components/shared/archimate/properties-section"
import { applicationComponentDirectorySelectConfig } from "./properties-config"

export type DirectoryFields = {
  licenseTypeId: string | null
  architectureStyleId: string | null
  criticalLevelId: string | null
  failoverTypeId: string | null
  recoveryTimeId: string | null
  redundancyTypeId: string | null
  monitoringLevelId: string | null
  scalingTypeId: string | null
}

export type PropertiesSidebarProps = {
  t: (key: string) => string
  code: string
  stateId: string | null
  directoryFields: DirectoryFields
  onCodeChange: (v: string) => void
  onStateChange: (v: string | null) => void
  onDirectoryFieldChange: (field: keyof DirectoryFields, value: string | null) => void
}

/**
 * Properties sidebar with all classifiers: code, state, license, architecture,
 * critical level, failover, recovery, redundancy, monitoring, scaling.
 * Select fields match Code input width (w-full).
 */
export function PropertiesSidebar({
  t,
  code,
  stateId,
  directoryFields,
  onCodeChange,
  onStateChange,
  onDirectoryFieldChange,
}: PropertiesSidebarProps) {
  const { items: componentStates = [] } = useDirectoryItems("component-states")
  const { items: licenseTypes = [] } = useDirectoryItems("license-types")
  const { items: architectureStyles = [] } = useDirectoryItems("architecture-styles")
  const { items: criticalLevels = [] } = useDirectoryItems("critical-levels")
  const { items: failoverTypes = [] } = useDirectoryItems("failover-types")
  const { items: recoveryTimes = [] } = useDirectoryItems("recovery-times")
  const { items: redundancyTypes = [] } = useDirectoryItems("redundancy-types")
  const { items: monitoringLevels = [] } = useDirectoryItems("monitoring-levels")
  const { items: scalingTypes = [] } = useDirectoryItems("scaling-types")

  const optionsByKey = {
    componentStates,
    architectureStyles,
    licenseTypes,
    criticalLevels,
    failoverTypes,
    recoveryTimes,
    redundancyTypes,
    monitoringLevels,
    scalingTypes,
  } as const

  const fields: PropertiesSectionField[] = [
    {
      kind: "input",
      id: "code",
      label: t("table.code"),
      value: code,
      onChange: onCodeChange,
    },
    {
      kind: "select",
      id: "state",
      label: t("item.state"),
      value: stateId ?? "",
      onValueChange: (value) => onStateChange(value || null),
      options: mapDirectoryItemsToSelectOptions(optionsByKey.componentStates),
      placeholder: t("select.placeholder"),
    },
    ...applicationComponentDirectorySelectConfig.map((field): PropertiesSectionField => ({
      kind: "select",
      id: field.id,
      label: t(field.labelKey),
      value: directoryFields[field.field] ?? "",
      onValueChange: (value) => onDirectoryFieldChange(field.field, value || null),
      options: mapDirectoryItemsToSelectOptions(optionsByKey[field.optionsKey]),
      placeholder: t("select.placeholder"),
    })),
  ]

  return (
    <PropertiesSection
      title={t("tab.properties")}
      fields={fields}
    />
  )
}
