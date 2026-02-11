"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { Label } from "@/components/ui/label"
import type { RelatedItem, StakeholderItem, FlowItem } from "@/store/slices/application-component-edit-slice"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import { MarkdownEditor } from "../markdown-editor"
import { ApplicationSchemaView } from "../application-schema-view"
import type { SheetType } from "@/components/shared/archimate/sheet-configs"
import {
  ApplicationFunction2,
  ApplicationDataObject2,
  ApplicationInterface,
  ApplicationEvent,
  ApplicationComponent,
  SystemSoftware,
  TechnicalNode,
  Network2,
  BusinessRole,
  BusinessFunction2,
  Stakeholder,
} from "@/components/icons"
import { DetailHeader } from "./detail-header"
import { StakeholdersWarning } from "./stakeholders-warning"
import { RelationsPanel, type RelationLayer } from "./relations-panel"
import { FlowsPanel } from "./flows-panel"
import { PropertiesSidebar } from "./properties-sidebar"
import { StakeholdersPanel } from "./stakeholders-panel"
import { SidebarItemPreview } from "./sidebar-item-preview"
import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"

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

  const handleRefresh = React.useCallback(() => {
    window.location.reload()
  }, [])

  const [previewItem, setPreviewItem] = React.useState<{
    item: RelationGroupItem
    editPath: string
  } | null>(null)
  const handleViewInSidebar = React.useCallback((item: RelationGroupItem, editPath: string) => {
    setPreviewItem({ item, editPath })
  }, [])

  const businessNoOp = React.useCallback(
    (_item: RelatedItem) => {
      // Business links are read-only from component view
    },
    []
  )

  const businessLayer: RelationLayer = {
    titleKey: "tab.business",
    groups: [
      {
        titleKey: "tab.business.actors",
        icon: <Stakeholder className="size-6 min-w-6 min-h-6" />,
        items: editState.businessActors,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/business/actors/${item.id}`,
        onDelete: businessNoOp,
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "tab.business.processes",
        icon: <BusinessFunction2 className="size-6 min-w-6 min-h-6" />,
        items: editState.businessProcesses,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/business/processes/${item.id}`,
        onDelete: businessNoOp,
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "tab.business.roles",
        icon: <BusinessRole className="size-6 min-w-6 min-h-6" />,
        items: editState.businessRoles,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/business/roles/${item.id}`,
        onDelete: businessNoOp,
        onViewInSidebar: handleViewInSidebar,
      },
    ],
  }

  const applicationLayer: RelationLayer = {
    titleKey: "tab.application",
    groups: [
      {
        titleKey: "tab.functions",
        icon: <ApplicationFunction2 className="size-6 min-w-6 min-h-6" />,
        items: editState.functions,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/application/functions/${item.id}`,
        onAddExisting: () => onAddExisting("functions"),
        onCreate: () => onCreate("functions"),
        onDelete: (item) => onRemoveFunction(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "tab.interfaces",
        icon: <ApplicationInterface className="size-6 min-w-6 min-h-6" />,
        items: editState.interfaces,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/application/interfaces/${item.id}`,
        onAddExisting: () => onAddExisting("interfaces"),
        onCreate: () => onCreate("interfaces"),
        onDelete: (item) => onRemoveInterface(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "tab.events",
        icon: <ApplicationEvent className="size-6 min-w-6 min-h-6" />,
        items: editState.events,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/application/events/${item.id}`,
        onAddExisting: () => onAddExisting("events"),
        onCreate: () => onCreate("events"),
        onDelete: (item) => onRemoveEvent(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "tab.data-objects",
        icon: <ApplicationDataObject2 className="size-6 min-w-6 min-h-6" />,
        items: editState.dataObjects,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/application/data-objects/${item.id}`,
        onAddExisting: () => onAddExisting("data-objects"),
        onCreate: () => onCreate("data-objects"),
        onDelete: (item) => onRemoveDataObject(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "hierarchy.parent",
        icon: <ApplicationComponent className="size-6 min-w-6 min-h-6" />,
        items: editState.parents,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/application/components/${item.id}`,
        onAddExisting: () => onAddExisting("parent"),
        onDelete: (item) => onRemoveParent(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "hierarchy.children",
        icon: <ApplicationComponent className="size-6 min-w-6 min-h-6" />,
        items: editState.children,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/application/components/${item.id}`,
        onAddExisting: () => onAddExisting("child"),
        onDelete: (item) => onRemoveChild(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
    ],
  }

  const technologyLayer: RelationLayer = {
    titleKey: "tab.technology",
    groups: [
      {
        titleKey: "tab.technology.system-software",
        icon: <SystemSoftware className="size-6 min-w-6 min-h-6" />,
        items: editState.systemSoftware,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/technologies/system-software/${item.id}`,
        onAddExisting: () => onAddExisting("system-software"),
        onCreate: () => onCreate("system-software"),
        onDelete: (item) => onRemoveSystemSoftware(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "tab.technology.nodes",
        icon: <TechnicalNode className="size-6 min-w-6 min-h-6" />,
        items: editState.technologyNodes,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/technologies/nodes/${item.id}`,
        onAddExisting: () => onAddExisting("node"),
        onDelete: (item) => onRemoveTechnologyNode(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
      {
        titleKey: "tab.technology.networks",
        icon: <Network2 className="size-6 min-w-6 min-h-6" />,
        items: editState.technologyNetworks,
        emptyTextKey: "table.no-results",
        editPath: (item) => `/technologies/networks/${item.id}`,
        onAddExisting: () => onAddExisting("network"),
        onDelete: (item) => onRemoveTechnologyNetwork(item.id),
        onViewInSidebar: handleViewInSidebar,
      },
    ],
  }

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-[1800px] mx-auto p-6">
          <DetailHeader
            t={(k) => t(k)}
            name={editState.name}
            onNameChange={onUpdateName}
            stateName={stateItem?.name}
            stateColor={(stateItem as { color?: string })?.color ?? "#6b7280"}
            onBack={onBack}
            onSave={onSave}
            isSaving={isSaving}
            isDirty={isDirty}
            isDraftValid={isDraftValid}
            placeholder={t("application.component")}
          />

          {!hasStakeholders && (
            <StakeholdersWarning
              t={(k, p) => (p ? t(k, p as any) : t(k))}
              entityName={componentName}
              onAdd={onAddStakeholder}
            />
          )}

          <div className="grid lg:grid-cols-3 gap-6 min-h-0">
            <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
              <div className="flex flex-col min-h-[min(400px,50vh)]">
                <Label htmlFor="description" className="text-sm text-foreground mb-2 block shrink-0">
                  {t("item.description")}
                </Label>
                <div className="flex-1 min-h-[200px] border rounded-lg overflow-hidden flex flex-col">
                  <MarkdownEditor
                    key={editState.code}
                    value={editState.description}
                    onChange={onUpdateDescription}
                    disabled={isSaving}
                    placeholder={t("description.placeholder")}
                  />
                </div>
              </div>

              <RelationsPanel
                t={(k) => t(k)}
                title={t("tab.relations")}
                layers={[businessLayer, applicationLayer, technologyLayer]}
                onRefresh={handleRefresh}
              />

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
            </div>

            <div className="space-y-6">
              <div className="sticky top-6 space-y-6">
                <SidebarItemPreview
                  t={(k) => t(k)}
                  item={previewItem?.item ?? { id: "", code: "", name: "", description: null }}
                  editPath={previewItem?.editPath ?? "#"}
                  open={!!previewItem}
                  onOpenChange={(open) => !open && setPreviewItem(null)}
                />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
