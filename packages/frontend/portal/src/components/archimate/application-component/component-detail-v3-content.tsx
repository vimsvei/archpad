"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Save,
  Layers,
  ChevronDown,
  Plus,
  Link2,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  Eye,
  UserPlus,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import type { RelatedItem, StakeholderItem, FlowItem } from "@/store/slices/application-component-edit-slice"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import { MarkdownEditor } from "./markdown-editor"
import { ApplicationSchemaView } from "./application-schema-view"
import type { SheetType } from "@/components/shared/archimate/sheet-configs"

type RelationGroupConfig = {
  titleKey: string
  items: RelatedItem[]
  emptyTextKey: string
  sheetType?: SheetType
  canCreate?: boolean
  editPath: (item: RelatedItem) => string
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

function RelationGroup({
  t,
  titleKey,
  items,
  emptyTextKey,
  sheetType,
  canCreate,
  editPath,
  onRefresh,
  onAddExisting,
  onCreate,
  onDelete,
  stateColor,
}: RelationGroupConfig & {
  t: (key: string) => string
  onRefresh: () => void
  onAddExisting?: () => void
  onCreate?: () => void
  onDelete: (item: RelatedItem) => void
  stateColor?: (item: RelatedItem) => string | undefined
}) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <div className="border-b border-border/50 last:border-b-0">
      <div className="w-full flex items-center justify-between py-3 px-1 group">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 flex-1 hover:text-foreground transition-colors text-left"
        >
          <ChevronDown
            className={`size-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
          <span className="text-sm font-medium text-foreground">{t(titleKey)}</span>
          <span className="text-xs text-muted-foreground">{items.length}</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onRefresh}>
              <RefreshCw className="size-4 mr-2" />
              {t("action.update")}
            </DropdownMenuItem>
            {sheetType && onAddExisting && (
              <DropdownMenuItem onClick={onAddExisting}>
                <Link2 className="size-4 mr-2" />
                {t("action.add")}
              </DropdownMenuItem>
            )}
            {canCreate && onCreate && (
              <DropdownMenuItem onClick={onCreate}>
                <Plus className="size-4 mr-2" />
                {t("action.create")}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isOpen && (
        <div className="pb-3 px-1">
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">{t(emptyTextKey)}</p>
          ) : (
            <div className="space-y-1.5">
              {items.map((item) => {
                const desc = item.description ?? ""
                const descFirstPart = desc.slice(0, 80)
                const descSecondPart =
                  desc.length > 80 ? truncateText(desc.slice(80), 80) : ""
                const color = stateColor?.(item) ?? "#6b7280"

                return (
                  <div
                    key={item.id}
                    className="group/item relative hover:bg-accent/10 px-2 py-2 rounded cursor-pointer border border-transparent hover:border-border/50 transition-colors"
                  >
                    <Link href={editPath(item)} className="block">
                      <div className="flex items-start gap-2 pr-14">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">
                            <span className="font-mono">{item.code}</span>
                            {descFirstPart && (
                              <>
                                <span className="mx-1">•</span>
                                <span>{descFirstPart}</span>
                              </>
                            )}
                          </div>
                          {descSecondPart && (
                            <div className="text-xs text-muted-foreground mt-0.5 truncate">
                              {descSecondPart}
                            </div>
                          )}
                        </div>

                        <div className="absolute right-2 top-2 flex items-center gap-1.5">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className="size-2 rounded-full shrink-0"
                                style={{ backgroundColor: color }}
                              />
                            </TooltipTrigger>
                            <TooltipContent>{t("item.state")}</TooltipContent>
                          </Tooltip>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                className="opacity-0 group-hover/item:opacity-100 transition-opacity size-6"
                                onClick={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                }}
                              >
                                <MoreHorizontal className="size-3.5 text-muted-foreground" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={editPath(item)}>
                                  <Eye className="size-4 mr-2" />
                                  {t("item.action.view")}
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={(e) => {
                                  e.preventDefault()
                                  onDelete(item)
                                }}
                              >
                                <Trash2 className="size-4 mr-2" />
                                {t("action.delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

type ComponentDetailV3ContentWithStoreProps = {
  componentId: string
  componentName: string
  t: (key: string) => string
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
      failoverTypeId?: string | null
      recoveryTimeId?: string | null
      redundancyTypeId?: string | null
      monitoringLevelId?: string | null
      scalingTypeId?: string | null
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

export function ComponentDetailV3ContentWithStore({
  componentId,
  componentName,
  t,
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
}: ComponentDetailV3ContentWithStoreProps) {
  const { items: componentStates = [] } = useDirectoryItems("component-states")
  const { items: licenseTypes = [] } = useDirectoryItems("license-types")
  const { items: architectureStyles = [] } = useDirectoryItems("architecture-styles")
  const { items: criticalLevels = [] } = useDirectoryItems("critical-levels")

  const stateItem = componentStates.find((s) => s.id === editState.stateId)
  const hasStakeholders = editState.stakeholders.length > 0

  const handleRefresh = React.useCallback(() => {
    window.location.reload()
  }, [])

  const relationGroupProps = {
    t,
    onRefresh: handleRefresh,
  }

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex-1 min-h-0 overflow-auto">
        <div className="max-w-[1800px] mx-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onBack}
                  className="text-foreground hover:text-foreground"
                >
                  <ArrowLeft />
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("action.back")}</TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-3 flex-1">
              <div className="grid place-items-center rounded-lg bg-primary/10 shrink-0 size-10">
                <ArchimateObjectIcon type="application-component" className="text-primary" size={20} />
              </div>
              <Input
                value={editState.name}
                onChange={(e) => onUpdateName(e.target.value)}
                className="text-2xl font-semibold border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={t("application.component")}
              />
            </div>

            <div className="flex items-center gap-2">
              {stateItem && (
                <Badge
                  style={{
                    backgroundColor: (stateItem as any).color ?? "#6b7280",
                    color: "#ffffff",
                  }}
                >
                  {stateItem.name}
                </Badge>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    onClick={onSave}
                    disabled={!isDirty || !isDraftValid || isSaving}
                  >
                    <Save className="size-4 mr-2" />
                    {t("action.save")}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{t("action.save")}</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Alert: No Stakeholders */}
          {!hasStakeholders && (
            <Alert className="mb-6 border-amber-500/50 bg-amber-500/10">
              <AlertCircle className="size-4 text-amber-500" />
              <AlertDescription className="text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">
                    {t("table.component.stakeholders.no-results", { component: componentName })}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAddStakeholder}
                    className="ml-4 shrink-0"
                  >
                    <UserPlus className="size-4 mr-2" />
                    {t("action.add")}
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Main Layout: 2/3 Left + 1/3 Right */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left 2/3 Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm text-foreground mb-2 block">
                  {t("item.description")}
                </Label>
                <div className="min-h-[200px] border rounded-lg overflow-hidden">
                  <MarkdownEditor
                    key={editState.code}
                    value={editState.description}
                    onChange={onUpdateDescription}
                    disabled={isSaving}
                    placeholder={t("description.placeholder")}
                  />
                </div>
              </div>

              {/* Relations Section */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  {t("tab.application")} / {t("tab.technology")}
                </h3>
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-2" style={{ minWidth: "min-content" }}>
                    {/* Application Layer */}
                    <div
                      className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0"
                      style={{ width: "340px" }}
                    >
                      <div className="bg-muted/30 px-4 py-2 border-b border-border">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                          {t("tab.application")}
                        </h4>
                      </div>
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="tab.functions"
                        items={editState.functions}
                        emptyTextKey="table.no-results"
                        sheetType="functions"
                        canCreate={true}
                        editPath={(item) => `/application/functions/${item.id}`}
                        onAddExisting={() => onAddExisting("functions")}
                        onCreate={() => onCreate("functions")}
                        onDelete={(item) => onRemoveFunction(item.id)}
                      />
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="tab.interfaces"
                        items={editState.interfaces}
                        emptyTextKey="table.no-results"
                        sheetType="interfaces"
                        canCreate={true}
                        editPath={(item) => `/application/interfaces/${item.id}`}
                        onAddExisting={() => onAddExisting("interfaces")}
                        onCreate={() => onCreate("interfaces")}
                        onDelete={(item) => onRemoveInterface(item.id)}
                      />
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="tab.events"
                        items={editState.events}
                        emptyTextKey="table.no-results"
                        sheetType="events"
                        canCreate={true}
                        editPath={(item) => `/application/events/${item.id}`}
                        onAddExisting={() => onAddExisting("events")}
                        onCreate={() => onCreate("events")}
                        onDelete={(item) => onRemoveEvent(item.id)}
                      />
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="tab.data-objects"
                        items={editState.dataObjects}
                        emptyTextKey="table.no-results"
                        sheetType="data-objects"
                        canCreate={true}
                        editPath={(item) => `/application/data-objects/${item.id}`}
                        onAddExisting={() => onAddExisting("data-objects")}
                        onCreate={() => onCreate("data-objects")}
                        onDelete={(item) => onRemoveDataObject(item.id)}
                      />
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="hierarchy.parent"
                        items={editState.parents}
                        emptyTextKey="table.no-results"
                        sheetType="parent"
                        editPath={(item) => `/application/components/${item.id}`}
                        onAddExisting={() => onAddExisting("parent")}
                        onDelete={(item) => onRemoveParent(item.id)}
                      />
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="hierarchy.children"
                        items={editState.children}
                        emptyTextKey="table.no-results"
                        sheetType="child"
                        editPath={(item) => `/application/components/${item.id}`}
                        onAddExisting={() => onAddExisting("child")}
                        onDelete={(item) => onRemoveChild(item.id)}
                      />
                    </div>

                    {/* Technology Layer */}
                    <div
                      className="border border-border rounded-lg overflow-hidden bg-card flex-shrink-0"
                      style={{ width: "340px" }}
                    >
                      <div className="bg-muted/30 px-4 py-2 border-b border-border">
                        <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                          {t("tab.technology")}
                        </h4>
                      </div>
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="tab.technology.system-software"
                        items={editState.systemSoftware}
                        emptyTextKey="table.no-results"
                        sheetType="system-software"
                        canCreate={true}
                        editPath={(item) => `/technologies/system-software/${item.id}`}
                        onAddExisting={() => onAddExisting("system-software")}
                        onCreate={() => onCreate("system-software")}
                        onDelete={(item) => onRemoveSystemSoftware(item.id)}
                      />
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="tab.technology.nodes"
                        items={editState.technologyNodes}
                        emptyTextKey="table.no-results"
                        sheetType="node"
                        editPath={(item) => `/technologies/nodes/${item.id}`}
                        onAddExisting={() => onAddExisting("node")}
                        onDelete={(item) => onRemoveTechnologyNode(item.id)}
                      />
                      <RelationGroup
                        {...relationGroupProps}
                        titleKey="tab.technology.networks"
                        items={editState.technologyNetworks}
                        emptyTextKey="table.no-results"
                        sheetType="network"
                        editPath={(item) => `/technologies/networks/${item.id}`}
                        onAddExisting={() => onAddExisting("network")}
                        onDelete={(item) => onRemoveTechnologyNetwork(item.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Flows Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">{t("tab.flows")}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onAddFlow?.()}
                    disabled={!onAddFlow}
                    title={onAddFlow ? undefined : t("action.not-implemented")}
                  >
                    <Plus className="size-4 mr-2" />
                    {t("action.add")}
                  </Button>
                </div>
                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                            {t("flow.direction")}
                          </th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                            {t("table.name")}
                          </th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                            {t("flow.source")}
                          </th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                            {t("flow.target")}
                          </th>
                          <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">
                            {t("table.description")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {editState.incomingFlows.map((flow) => (
                          <tr
                            key={flow.id}
                            className="border-b border-border/50 hover:bg-accent/5 cursor-pointer"
                          >
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="text-xs">
                                {t("flow.incoming")}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">{flow.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {flow.sourceComponent ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {componentName}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {flow.description ?? "—"}
                            </td>
                          </tr>
                        ))}
                        {editState.outgoingFlows.map((flow) => (
                          <tr
                            key={flow.id}
                            className="border-b border-border/50 hover:bg-accent/5 cursor-pointer"
                          >
                            <td className="px-4 py-3">
                              <Badge variant="outline" className="text-xs">
                                {t("flow.outgoing")}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm text-foreground">{flow.name}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {componentName}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {flow.targetComponent ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              {flow.description ?? "—"}
                            </td>
                          </tr>
                        ))}
                        {editState.incomingFlows.length === 0 &&
                          editState.outgoingFlows.length === 0 && (
                            <tr>
                              <td
                                colSpan={5}
                                className="px-4 py-8 text-center text-sm text-muted-foreground italic"
                              >
                                {t("table.no-results")}
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1/3 Area - Properties + Stakeholders */}
            <div className="space-y-6">
              <div className="sticky top-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("tab.classification")}
                  </h3>

                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="code" className="text-xs text-muted-foreground">
                        {t("table.code")}
                      </Label>
                      <Input
                        id="code"
                        value={editState.code}
                        onChange={(e) => onUpdateCode(e.target.value)}
                        className="h-8 border-border bg-background text-sm"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="state" className="text-xs text-muted-foreground">
                        {t("item.state")}
                      </Label>
                      <Select
                        value={editState.stateId ?? ""}
                        onValueChange={(v) => onUpdateStateId(v || null)}
                      >
                        <SelectTrigger
                          id="state"
                          className="h-8 border-border bg-background text-sm"
                        >
                          <SelectValue placeholder={t("select.placeholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {componentStates.map((state) => (
                            <SelectItem key={state.id} value={state.id}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="license" className="text-xs text-muted-foreground">
                        {t("directory.license.type")}
                      </Label>
                      <Select
                        value={editState.directoryFields.licenseTypeId ?? ""}
                        onValueChange={(v) =>
                          onUpdateDirectoryField("licenseTypeId", v || null)
                        }
                      >
                        <SelectTrigger
                          id="license"
                          className="h-8 border-border bg-background text-sm"
                        >
                          <SelectValue placeholder={t("select.placeholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {licenseTypes.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="architecture" className="text-xs text-muted-foreground">
                        {t("directory.architecture.style")}
                      </Label>
                      <Select
                        value={editState.directoryFields.architectureStyleId ?? ""}
                        onValueChange={(v) =>
                          onUpdateDirectoryField("architectureStyleId", v || null)
                        }
                      >
                        <SelectTrigger
                          id="architecture"
                          className="h-8 border-border bg-background text-sm"
                        >
                          <SelectValue placeholder={t("select.placeholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {architectureStyles.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="critical" className="text-xs text-muted-foreground">
                        {t("directory.critical.level")}
                      </Label>
                      <Select
                        value={editState.directoryFields.criticalLevelId ?? ""}
                        onValueChange={(v) =>
                          onUpdateDirectoryField("criticalLevelId", v || null)
                        }
                      >
                        <SelectTrigger
                          id="critical"
                          className="h-8 border-border bg-background text-sm"
                        >
                          <SelectValue placeholder={t("select.placeholder")} />
                        </SelectTrigger>
                        <SelectContent>
                          {criticalLevels.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Stakeholders */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">
                      {t("tab.stakeholders")}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={onAddStakeholder}
                      aria-label={t("action.add")}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  {editState.stakeholders.length === 0 ? (
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center bg-muted/10">
                      <div className="flex flex-col items-center gap-3">
                        <div className="size-12 rounded-full bg-muted/50 grid place-items-center">
                          <UserPlus className="size-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">
                            {t("table.component.stakeholders.no-results", {
                              component: componentName,
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("table.component.stakeholders.no-results.description", {
                              component: componentName,
                            })}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onAddStakeholder}
                          className="mt-2"
                        >
                          <UserPlus className="size-4 mr-2" />
                          {t("action.add")}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {editState.stakeholders.map((sh) => (
                        <div
                          key={sh.id}
                          className="py-2 px-3 rounded-lg hover:bg-accent/10 border border-border bg-card cursor-pointer flex items-center justify-between group"
                        >
                          <Link
                            href={`/motivation/stakeholders/${sh.stakeholderId}`}
                            className="flex-1 min-w-0"
                          >
                            <div className="text-sm text-foreground font-medium">
                              {sh.stakeholderName}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {sh.roleName}
                            </div>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.preventDefault()
                              onRemoveStakeholder(sh.id)
                            }}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Diagram Section */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              {t("tab.schemas")}
            </h3>
            <ApplicationSchemaView
              componentId={componentId}
              componentName={componentName}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
