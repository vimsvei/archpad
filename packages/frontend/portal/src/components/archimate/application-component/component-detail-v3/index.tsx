"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import type { RelatedItem, StakeholderItem, FlowItem } from "@/store/slices/application-component-edit-slice"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import { ApplicationSchemaView } from "../application-schema-view"
import type { SheetType } from "@/components/shared/archimate/sheet-configs"
import { StakeholdersWarning } from "./stakeholders-warning"
import { FlowsPanel } from "./flows-panel"
import { PropertiesSidebar } from "./properties-sidebar"
import { StakeholdersPanel } from "./stakeholders-panel"
import { ArchimateDetailCard } from "@/components/shared/archimate/archimate-detail-card"
import { createApplicationComponentRelationLayers } from "./relations-config"

export type ComponentDetailV3Props = {
  componentId: string
  componentName: string
  isSaving: boolean
  onBack: () => void
  onSave: () => void
  isDirty: boolean
  isDraftValid: boolean
  onAddExisting: (type: SheetType) => void
  onCreate: (type: SheetType) => void
  onAddStakeholder: () => void
  onAddFlow?: () => void
  editState: {
    code: string
    name: string
    description: string
    stateId: string | null
    directoryFields: {
      licenseTypeId: string | null
      architectureStyleId: string | null
      criticalLevelId: string | null
      [key: string]: string | null | undefined
    }
    functions: RelatedItem[]
    dataObjects: RelatedItem[]
    interfaces: RelatedItem[]
    events: RelatedItem[]
    systemSoftware: RelatedItem[]
    technologyNodes: RelatedItem[]
    technologyNetworks: RelatedItem[]
    parents: RelatedItem[]
    children: RelatedItem[]
    businessActors: RelatedItem[]
    businessRoles: RelatedItem[]
    businessProcesses: RelatedItem[]
    stakeholders: StakeholderItem[]
    incomingFlows: FlowItem[]
    outgoingFlows: FlowItem[]
  }
  onUpdateCode: (v: string) => void
  onUpdateName: (v: string) => void
  onUpdateDescription: (v: string) => void
  onUpdateStateId: (v: string | null) => void
  onUpdateDirectoryField: (field: string, value: string | null) => void
  onRemoveFunction: (id: string) => void
  onRemoveDataObject: (id: string) => void
  onRemoveInterface: (id: string) => void
  onRemoveEvent: (id: string) => void
  onRemoveSystemSoftware: (id: string) => void
  onRemoveTechnologyNode: (id: string) => void
  onRemoveTechnologyNetwork: (id: string) => void
  onRemoveParent: (id: string) => void
  onRemoveChild: (id: string) => void
  onRemoveStakeholder: (id: string) => void
}

export function ComponentDetailV3({
  componentId,
  componentName,
  isSaving,
  onBack,
  onSave,
  isDirty,
  isDraftValid,
  editState,
  onAddExisting,
  onCreate,
  onAddStakeholder,
  onAddFlow,
  onUpdateCode,
  onUpdateName,
  onUpdateDescription,
  onUpdateStateId,
  onUpdateDirectoryField,
  onRemoveFunction,
  onRemoveDataObject,
  onRemoveInterface,
  onRemoveEvent,
  onRemoveSystemSoftware,
  onRemoveTechnologyNode,
  onRemoveTechnologyNetwork,
  onRemoveParent,
  onRemoveChild,
  onRemoveStakeholder,
}: ComponentDetailV3Props) {
  const { t } = useTranslate()
  const { items: componentStates = [] } = useDirectoryItems("component-states")
  const stateItem = componentStates.find((s) => s.id === editState.stateId)
  const hasStakeholders = editState.stakeholders.length > 0
  const relationLayers = createApplicationComponentRelationLayers({
    state: {
      functions: editState.functions,
      dataObjects: editState.dataObjects,
      interfaces: editState.interfaces,
      events: editState.events,
      systemSoftware: editState.systemSoftware,
      technologyNodes: editState.technologyNodes,
      technologyNetworks: editState.technologyNetworks,
      parents: editState.parents,
      children: editState.children,
      businessActors: editState.businessActors,
      businessRoles: editState.businessRoles,
      businessProcesses: editState.businessProcesses,
    },
    callbacks: {
      onAddExisting,
      onCreate,
      onRemoveFunction,
      onRemoveDataObject,
      onRemoveInterface,
      onRemoveEvent,
      onRemoveSystemSoftware,
      onRemoveTechnologyNode,
      onRemoveTechnologyNetwork,
      onRemoveParent,
      onRemoveChild,
    },
  })

  return (
    <ArchimateDetailCard
      t={(k) => t(k)}
      header={{
        name: editState.name,
        onNameChange: onUpdateName,
        stateName: stateItem?.name,
        stateColor: (stateItem as { color?: string })?.color ?? "#6b7280",
        onBack,
        onSave,
        isSaving,
        isDirty,
        isDraftValid,
        placeholder: t("application.component"),
      }}
      beforeGrid={!hasStakeholders ? (
        <StakeholdersWarning
          t={(k, p) => (p ? t(k, p as any) : t(k))}
          entityName={componentName}
          onAdd={onAddStakeholder}
        />
      ) : null}
      description={{
        editorKey: editState.code,
        value: editState.description,
        onChange: onUpdateDescription,
        disabled: isSaving,
      }}
      relations={{
        layers: relationLayers,
      }}
      mainAfterRelations={(
        <>
          <FlowsPanel
            t={(k) => t(k)}
            incomingFlows={editState.incomingFlows}
            outgoingFlows={editState.outgoingFlows}
            entityName={componentName}
            onAdd={onAddFlow}
          />

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t("tab.schemas")}
            </h3>
            <ApplicationSchemaView
              componentId={componentId}
              componentName={componentName}
            />
          </div>
        </>
      )}
      sidebar={(
        <>
          <PropertiesSidebar
            t={(k) => t(k)}
            code={editState.code}
            stateId={editState.stateId}
            directoryFields={{
              licenseTypeId: editState.directoryFields.licenseTypeId ?? null,
              architectureStyleId: editState.directoryFields.architectureStyleId ?? null,
              criticalLevelId: editState.directoryFields.criticalLevelId ?? null,
              failoverTypeId: editState.directoryFields.failoverTypeId ?? null,
              recoveryTimeId: editState.directoryFields.recoveryTimeId ?? null,
              redundancyTypeId: editState.directoryFields.redundancyTypeId ?? null,
              monitoringLevelId: editState.directoryFields.monitoringLevelId ?? null,
              scalingTypeId: editState.directoryFields.scalingTypeId ?? null,
            }}
            onCodeChange={onUpdateCode}
            onStateChange={onUpdateStateId}
            onDirectoryFieldChange={(field, value) =>
              onUpdateDirectoryField(field, value)
            }
          />

          <StakeholdersPanel
            t={(k, p) => (p ? t(k, p as any) : t(k))}
            entityName={componentName}
            stakeholders={editState.stakeholders}
            onAdd={onAddStakeholder}
            onRemove={onRemoveStakeholder}
          />
        </>
      )}
    />
  )
}
