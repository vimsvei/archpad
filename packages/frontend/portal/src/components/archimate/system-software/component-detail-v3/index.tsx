"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"
import type { TechnologyRadarZone } from "@archpad/contract"
import { ArchimateDetailCard } from "@/components/shared/archimate/archimate-detail-card"
import { PropertiesSidebar } from "./properties-sidebar"
import { createSystemSoftwareRelationLayers } from "./relations-config"

export type SystemSoftwareDetailV3Props = {
  softwareId: string
  isSaving: boolean
  isDirty: boolean
  isDraftValid: boolean
  onBack: () => void
  onSave: () => void
  editState: {
    code: string
    name: string
    description: string
    version: string
    radarArea: TechnologyRadarZone | null
    typeId: string | null
    licenseTypeId: string | null
    components: RelationGroupItem[]
    technologyNodes: RelationGroupItem[]
  }
  onUpdateCode: (value: string) => void
  onUpdateName: (value: string) => void
  onUpdateDescription: (value: string) => void
  onUpdateVersion: (value: string) => void
  onUpdateRadarArea: (value: TechnologyRadarZone | null) => void
  onUpdateTypeId: (value: string | null) => void
  onUpdateLicenseTypeId: (value: string | null) => void
  onRemoveComponent: (id: string) => void
  onRemoveTechnologyNode: (id: string) => void
}

export function SystemSoftwareDetailV3({
  softwareId,
  isSaving,
  isDirty,
  isDraftValid,
  onBack,
  onSave,
  editState,
  onUpdateCode,
  onUpdateName,
  onUpdateDescription,
  onUpdateVersion,
  onUpdateRadarArea,
  onUpdateTypeId,
  onUpdateLicenseTypeId,
  onRemoveComponent,
  onRemoveTechnologyNode,
}: SystemSoftwareDetailV3Props) {
  const { t } = useTranslate()
  const relationLayers = createSystemSoftwareRelationLayers({
    components: editState.components,
    technologyNodes: editState.technologyNodes,
    onRemoveComponent,
    onRemoveTechnologyNode,
  })

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
        placeholder: t("technologies.system-software"),
        iconType: "system-software",
      }}
      description={{
        editorKey: softwareId,
        value: editState.description,
        onChange: onUpdateDescription,
        disabled: isSaving,
      }}
      relations={{
        layers: relationLayers,
      }}
      sidebar={(
        <PropertiesSidebar
          t={(key) => t(key)}
          code={editState.code}
          version={editState.version}
          radarArea={editState.radarArea}
          typeId={editState.typeId}
          licenseTypeId={editState.licenseTypeId}
          onCodeChange={onUpdateCode}
          onVersionChange={onUpdateVersion}
          onRadarAreaChange={onUpdateRadarArea}
          onTypeChange={onUpdateTypeId}
          onLicenseTypeChange={onUpdateLicenseTypeId}
        />
      )}
    />
  )
}
