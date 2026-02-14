"use client"

import { useTranslate } from "@tolgee/react"
import { ArchimateDetailCard } from "@/components/shared/archimate/archimate-detail-card"
import { PropertiesSection, type PropertiesSectionField } from "@/components/shared/archimate/properties-section"
import type { ArchimateObjectIconType } from "@/components/shared/archimate/archimate-object-icon"
import type { RelationLayer } from "@/components/archimate/application-component/component-detail-v3/relations-panel"

type NamedObjectDetailV3Props = {
  objectId: string
  titleKey: string
  iconType: ArchimateObjectIconType
  isSaving: boolean
  isDirty: boolean
  isDraftValid: boolean
  onBack: () => void
  onSave: () => void
  editState: {
    code: string
    name: string
    description: string
    layer?: string | null
  }
  onUpdateCode: (value: string) => void
  onUpdateName: (value: string) => void
  onUpdateDescription: (value: string) => void
  relations?: {
    layers: RelationLayer[]
    titleKey?: string
  }
}

export function NamedObjectDetailV3({
  objectId,
  titleKey,
  iconType,
  isSaving,
  isDirty,
  isDraftValid,
  onBack,
  onSave,
  editState,
  onUpdateCode,
  onUpdateName,
  onUpdateDescription,
  relations,
}: NamedObjectDetailV3Props) {
  const { t } = useTranslate()

  const layerValue = (() => {
    const raw = (editState.layer ?? "").trim()
    if (!raw) return ""

    const normalized = raw.toLowerCase().replace(/[_\s]+/g, "-")
    const layerKeyMap: Record<string, string> = {
      application: "architecture.layer.application",
      business: "architecture.layer.business",
      common: "architecture.layer.common",
      motivation: "architecture.layer.motivation",
      strategy: "architecture.layer.strategy",
      technology: "architecture.layer.technologies",
      technologies: "architecture.layer.technologies",
      implementation: "architecture.layer.implementation",
      "implementation-and-migration": "architecture.layer.implementation",
      "implementation-and-migrations": "architecture.layer.implementation",
    }

    const key = layerKeyMap[normalized]
    return key ? t(key) : raw
  })()

  const fields: PropertiesSectionField[] = [
    {
      kind: "input",
      id: `${objectId}-code`,
      label: t("table.code"),
      value: editState.code,
      onChange: onUpdateCode,
    },
    ...(layerValue ? [{
      kind: "input" as const,
      id: `${objectId}-layer`,
      label: t("architecture.layer"),
      value: layerValue,
      readOnly: true,
      disabled: true,
    }] : []),
  ]

  return (
    <ArchimateDetailCard
      t={(key) => t(key)}
      header={{
        name: editState.name,
        onNameChange: onUpdateName,
        onBack,
        onSave,
        isSaving,
        isDirty,
        isDraftValid,
        placeholder: t(titleKey),
        iconType,
      }}
      description={{
        editorKey: objectId,
        value: editState.description,
        onChange: onUpdateDescription,
        disabled: isSaving,
      }}
      relations={relations}
      sidebar={(
        <PropertiesSection
          title={t("tab.properties")}
          fields={fields}
        />
      )}
    />
  )
}
