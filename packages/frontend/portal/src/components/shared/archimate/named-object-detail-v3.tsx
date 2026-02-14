"use client"

import { useTranslate } from "@tolgee/react"
import { ArchimateDetailCard } from "@/components/shared/archimate/archimate-detail-card"
import { PropertiesSection, type PropertiesSectionField } from "@/components/shared/archimate/properties-section"
import type { ArchimateObjectIconType } from "@/components/shared/archimate/archimate-object-icon"

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
  }
  onUpdateCode: (value: string) => void
  onUpdateName: (value: string) => void
  onUpdateDescription: (value: string) => void
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
}: NamedObjectDetailV3Props) {
  const { t } = useTranslate()

  const fields: PropertiesSectionField[] = [
    {
      kind: "input",
      id: `${objectId}-code`,
      label: t("table.code"),
      value: editState.code,
      onChange: onUpdateCode,
    },
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
      sidebar={(
        <PropertiesSection
          title={t("tab.properties")}
          fields={fields}
        />
      )}
    />
  )
}
