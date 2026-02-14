"use client"

import { useDirectoryItems } from "@/hooks/use-directory-items"
import { TechnologyRadarZone } from "@archpad/contract"
import {
  DEFAULT_PROPERTY_FIELD_CLASS,
  mapDirectoryItemsToSelectOptions,
  type SelectFieldOption,
} from "@/components/shared/archimate/property-fields"
import {
  PropertiesSection,
  type PropertiesSectionField,
} from "@/components/shared/archimate/properties-section"
import {
  systemSoftwareEditableSelectConfig,
  systemSoftwareReadonlyInputConfig,
  systemSoftwareReadonlySelectConfig,
} from "./properties-config"

export type PropertiesSidebarProps = {
  t: (key: string) => string
  code: string
  version: string
  radarArea: TechnologyRadarZone | null
  typeId: string | null
  licenseTypeId: string | null
  onCodeChange: (value: string) => void
  onVersionChange: (value: string) => void
  onRadarAreaChange: (value: TechnologyRadarZone | null) => void
  onTypeChange: (value: string | null) => void
  onLicenseTypeChange: (value: string | null) => void
}

export function PropertiesSidebar({
  t,
  code,
  version,
  radarArea,
  typeId,
  licenseTypeId,
  onCodeChange,
  onVersionChange,
  onRadarAreaChange,
  onTypeChange,
  onLicenseTypeChange,
}: PropertiesSidebarProps) {
  const { items: componentStates = [] } = useDirectoryItems("component-states")
  const { items: softwareTypes = [] } = useDirectoryItems("software-types")
  const { items: licenseTypes = [] } = useDirectoryItems("license-types")
  const { items: criticalLevels = [] } = useDirectoryItems("critical-levels")

  const radarOptions: SelectFieldOption[] = Object.values(TechnologyRadarZone).map((zone) => ({
    value: zone,
    label: t(zone),
  }))

  const optionsByKey = {
    componentStates,
    softwareTypes,
    licenseTypes,
    criticalLevels,
  } as const

  const editableFieldValues = {
    typeId,
    licenseTypeId,
  } as const

  const onEditableFieldChange = {
    typeId: onTypeChange,
    licenseTypeId: onLicenseTypeChange,
  } as const

  const fields: PropertiesSectionField[] = [
    {
      kind: "input",
      id: "system-software-code",
      label: t("table.code"),
      value: code,
      onChange: onCodeChange,
    },
    {
      kind: "input",
      id: "system-software-version",
      label: t("table.version"),
      value: version,
      onChange: onVersionChange,
      className: `${DEFAULT_PROPERTY_FIELD_CLASS} font-mono`,
      placeholder: t("table.version.placeholder"),
    },
    {
      kind: "select",
      id: "system-software-radar-area",
      label: t("item.radarArea"),
      value: radarArea ?? "",
      onValueChange: (value) => onRadarAreaChange((value as TechnologyRadarZone) || null),
      options: radarOptions,
      placeholder: t("select.placeholder"),
    },
    ...systemSoftwareEditableSelectConfig.map((field): PropertiesSectionField => ({
      kind: "select",
      id: field.id,
      label: t(field.labelKey),
      value: editableFieldValues[field.field] ?? "",
      onValueChange: (value) => onEditableFieldChange[field.field](value || null),
      options: mapDirectoryItemsToSelectOptions(optionsByKey[field.optionsKey]),
      placeholder: t("select.placeholder"),
    })),
    ...systemSoftwareReadonlySelectConfig.map((field): PropertiesSectionField => ({
      kind: "select",
      id: field.id,
      label: t(field.labelKey),
      value: "",
      options: mapDirectoryItemsToSelectOptions(optionsByKey[field.optionsKey]),
      placeholder: t("select.placeholder"),
      disabled: true,
    })),
    ...systemSoftwareReadonlyInputConfig.map((field): PropertiesSectionField => ({
      kind: "input",
      id: field.id,
      label: t(field.labelKey),
      value: "",
      disabled: true,
      readOnly: true,
      placeholder: "-",
    })),
  ]

  return (
    <PropertiesSection
      title={t("tab.properties")}
      fields={fields}
    />
  )
}
