"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BaseObjectItem } from "@/components/shared/base-object/base-object-item"
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import {
  useGetApplicationComponentQuery,
  useUpdateApplicationComponentMutation,
} from "@/store/apis/application-component-api"
import { useGetDirectoryItemsQuery } from "@/store/apis/directory-api"
import type { ApplicationComponentDirectoryFields } from "@/@types/application-component"
import { MarkdownEditor } from "./markdown-editor"
import { ParentTable, ChildrenTable } from "./hierarchy-tables"
import { SystemSoftwareTable } from "./system-software-table"
import { DataObjectsTable } from "./data-objects-table"
import { AddExistingItemsSheet, type SelectableItem } from "@/components/shared/add-existing-items-sheet"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  const { t } = useTranslate()
  const router = useRouter()

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  const { data: item, error, isLoading, isFetching } = useGetApplicationComponentQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )
  const [updateItem, updateState] = useUpdateApplicationComponentMutation()

  const normalize = React.useCallback((v: BaseObjectValues) => {
    return {
      code: v.code.trim(),
      name: v.name.trim(),
      description: v.description.trim(),
    }
  }, [])

  const baselineRef = React.useRef<ReturnType<typeof normalize> | null>(null)
  const directoryFieldsBaselineRef = React.useRef<ApplicationComponentDirectoryFields | null>(null)
  const [draft, setDraft] = React.useState<BaseObjectValues>({
    code: "",
    name: "",
    description: "",
  })

  const [directoryFields, setDirectoryFields] = React.useState<ApplicationComponentDirectoryFields>({
    stateId: null,
    licenseTypeId: null,
    architectureStyleId: null,
    criticalLevelId: null,
    failoverTypeId: null,
    recoveryTimeId: null,
    redundancyTypeId: null,
    monitoringLevelId: null,
    scalingTypeId: null,
  })
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [tab, setTab] = React.useState<string>("general")

  // Add existing items sheet state
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [sheetType, setSheetType] = React.useState<"system-software" | "data-objects" | "parent" | "child" | null>(null)
  const [sheetSearchQuery, setSheetSearchQuery] = React.useState("")
  const [sheetSelectedItems, setSheetSelectedItems] = React.useState<Set<string>>(new Set())
  const [sheetAvailableItems, setSheetAvailableItems] = React.useState<SelectableItem[]>([])
  const [sheetIsLoading, setSheetIsLoading] = React.useState(false)

  // Load directory items for all directories from Redux (database)
  const { data: componentStates = [] } = useGetDirectoryItemsQuery("component-states")
  const { data: licenseTypes = [] } = useGetDirectoryItemsQuery("license-types")
  const { data: architectureStyles = [] } = useGetDirectoryItemsQuery("architecture-styles")
  const { data: criticalLevels = [] } = useGetDirectoryItemsQuery("critical-levels")
  const { data: failoverTypes = [] } = useGetDirectoryItemsQuery("failover-types")
  const { data: recoveryTimes = [] } = useGetDirectoryItemsQuery("recovery-times")
  const { data: redundancyTypes = [] } = useGetDirectoryItemsQuery("redundancy-types")
  const { data: monitoringLevels = [] } = useGetDirectoryItemsQuery("monitoring-levels")
  const { data: scalingTypes = [] } = useGetDirectoryItemsQuery("scaling-types")

  React.useEffect(() => {
    if (!item) return
    const initial: BaseObjectValues = {
      code: item.code ?? "",
      name: item.name ?? "",
      description: item.description ?? "",
    }
    baselineRef.current = normalize(initial)
    setDraft(initial)
  }, [item, normalize])

  // Initialize directory fields from item data
  React.useEffect(() => {
    if (!item) return
    
    const updateDirectoryField = (directoryItems: typeof componentStates, itemField?: { name: string } | null) => {
      if (!itemField?.name || directoryItems.length === 0) {
        return null
      }
      const found = directoryItems.find((item) => item.name === itemField.name)
      return found?.id ?? null
    }

    const initialFields: ApplicationComponentDirectoryFields = {
      stateId: updateDirectoryField(componentStates, item.state) ?? null,
      licenseTypeId: null, // TODO: add to item type when API supports it
      architectureStyleId: null,
      criticalLevelId: null,
      failoverTypeId: null,
      recoveryTimeId: null,
      redundancyTypeId: null,
      monitoringLevelId: null,
      scalingTypeId: null,
    }
    
    directoryFieldsBaselineRef.current = initialFields
    setDirectoryFields(initialFields)
  }, [item, componentStates])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false
    
    // Check basic fields
    const basicFieldsChanged = JSON.stringify(normalize(draft)) !== JSON.stringify(baselineRef.current)
    
    // Check directory fields
    const directoryFieldsChanged = directoryFieldsBaselineRef.current
      ? JSON.stringify(directoryFields) !== JSON.stringify(directoryFieldsBaselineRef.current)
      : false
    
    return basicFieldsChanged || directoryFieldsChanged
  }, [draft, normalize, directoryFields])

  const isDraftValid = React.useMemo(() => {
    return Boolean(draft.code.trim()) && Boolean(draft.name.trim())
  }, [draft.code, draft.name])

  const goBack = React.useCallback(() => {
    router.push("/application/components")
  }, [router])

  const handleBack = React.useCallback(() => {
    if (isDirty) {
      setConfirmOpen(true)
      return
    }
    goBack()
  }, [isDirty, goBack])

  const handleSave = React.useCallback(async () => {
    if (!item) return
    if (!isDraftValid) {
      toast.error(tr("form.invalid", "Please fill required fields"))
      return
    }

    const normalized = normalize(draft)
    await updateItem({
      id: item.id,
      input: {
        code: normalized.code,
        name: normalized.name,
        description: normalized.description ? normalized.description : undefined,
      },
    }).unwrap()

    toast.success(tr("action.saved", "Saved"))
    baselineRef.current = normalize(draft)
    directoryFieldsBaselineRef.current = { ...directoryFields }
  }, [draft, directoryFields, isDraftValid, item, normalize, tr, updateItem])

  const handleDirectoryFieldChange = React.useCallback(
    (fieldName: keyof ApplicationComponentDirectoryFields, value: string | null) => {
      setDirectoryFields((prev) => ({ ...prev, [fieldName]: value }))
    },
    []
  )

  // Handler for opening add existing items sheet
  const handleOpenAddExistingSheet = React.useCallback((type: "system-software" | "data-objects" | "parent" | "child") => {
    setSheetType(type)
    setSheetSearchQuery("")
    setSheetSelectedItems(new Set())
    setSheetAvailableItems([])
    setSheetOpen(true)
    // TODO: Load available items based on type
  }, [])

  // Handler for toggling item selection in sheet
  const handleSheetToggleItem = React.useCallback((itemId: string) => {
    setSheetSelectedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }, [])

  // Handler for adding selected items
  const handleSheetAdd = React.useCallback(() => {
    if (!sheetType) return
    
    const itemsToAdd = sheetAvailableItems.filter((item) => sheetSelectedItems.has(item.id))
    console.log(`Adding ${sheetType}:`, itemsToAdd)
    // TODO: Add items via Redux mutation based on sheetType
    // After adding, refresh the appropriate table and close the sheet
    setSheetOpen(false)
  }, [sheetType, sheetAvailableItems, sheetSelectedItems])

  // Get sheet title and icon based on type
  const getSheetConfig = React.useCallback(() => {
    const tableKeyMap: Record<NonNullable<typeof sheetType>, string> = {
      "system-software": "technologies.system-software",
      "data-objects": "application.data-objects",
      "parent": "hierarchy.parent",
      "child": "hierarchy.children",
    }
    
    const tableKey = sheetType ? tableKeyMap[sheetType] : ""
    const titleKey = tableKey ? `${t('action.add')} ${t(tableKey)}` : ""
    
    switch (sheetType) {
      case "system-software":
        return {
          title: tr(titleKey, "Добавить системное ПО"),
          iconType: "system-software" as const,
        }
      case "data-objects":
        return {
          title: tr(titleKey, "Добавить объекты данных"),
          iconType: "application-data-object" as const,
        }
      case "parent":
        return {
          title: tr(titleKey, "Добавить родителей"),
          iconType: "application-component" as const,
        }
      case "child":
        return {
          title: tr(titleKey, "Добавить детей"),
          iconType: "application-component" as const,
        }
      default:
        return {
          title: "",
          iconType: "application-component" as const,
        }
    }
  }, [sheetType, tr])

  const sheetConfig = getSheetConfig()

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("item.action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("item.action.back", "Back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("application.component")}</h1>
        </div>
        <Card className="p-10">
          <div className="flex items-center justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        </Card>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("item.action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("item.action.back", "Back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("application.component")}</h1>
        </div>
        <Card className="p-6">
          <div className="text-muted-foreground">{(error as any)?.message ?? "Item not found."}</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("item.action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("item.action.back", "Back")}</TooltipContent>
          </Tooltip>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              {t("application.component")}: {item.name}
            </h1>
            <p className="text-muted-foreground text-sm">ID: {item.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                aria-label={tr("item.action.save", "Save")}
                onClick={() => void handleSave()}
                disabled={!isDirty || updateState.isLoading || !isDraftValid}
              >
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("item.action.save", "Save")}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="general">
            {tr("tabs.general", "Общие")}
          </TabsTrigger>
          <TabsTrigger value="description">
            {tr("tabs.description", "Description")}
          </TabsTrigger>
          <TabsTrigger value="hierarchy">
            {tr("tabs.hierarchy", "Структура")}
          </TabsTrigger>
          <TabsTrigger value="relations">
            {tr("tabs.relations", "Связи")}
          </TabsTrigger>
          <TabsTrigger value="application">
            {tr("tabs.application", "Приложение")}
          </TabsTrigger>
          <TabsTrigger value="technology">
            {tr("tabs.technology", "Технологии")}
          </TabsTrigger>
          <TabsTrigger value="schema">
            {tr("tabs.schema", "Схема")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="general" className="flex min-h-0 flex-1 flex-col mt-0">
          <div className="min-h-0 flex-1 overflow-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left area: 2/3 - General fields + State + Tables */}
              <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
                {/* General fields card - ужат по содержимому */}
                <Card className="flex-shrink-0 flex flex-col gap-4 p-6">
                  <BaseObjectItem
                    values={draft}
                    onChange={setDraft}
                    submitLabel={tr("item.action.save", "Save")}
                    hideActions
                    hideDescription
                    disabled={updateState.isLoading}
                    onSubmit={async (values) => {
                      try {
                        const normalized = normalize(values)
                        await updateItem({
                          id: item.id,
                          input: {
                            code: normalized.code,
                            name: normalized.name,
                            description: normalized.description ? normalized.description : undefined,
                          },
                        }).unwrap()
                        toast.success(tr("action.saved", "Saved"))
                        baselineRef.current = normalize(values)
                      } catch (e: any) {
                        toast.error(e?.message ?? tr("action.saveFailed", "Failed to save"))
                      }
                    }}
                  />
                  
                  {/* State field */}
                  <div className="grid gap-2">
                    <Label htmlFor="component-state">{tr("item.state", "Состояние")}</Label>
                    <Select
                      value={directoryFields.stateId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("stateId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                      <SelectTrigger id="component-state" className="w-full">
                        <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
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
                </Card>

                {/* System Software and Data Objects Tables */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
                  <SystemSoftwareTable
                    componentId={item.id}
                    onAddExisting={() => handleOpenAddExistingSheet("system-software")}
                  />
                  <DataObjectsTable
                    componentId={item.id}
                    onAddExisting={() => handleOpenAddExistingSheet("data-objects")}
                  />
                </div>
              </div>

              {/* Right area: 1/3 - Directory fields */}
              <Card className="lg:col-span-1 flex flex-col gap-4 p-6">
                
                {/* License Type */}
                <div className="grid gap-2">
                  <Label htmlFor="license-type">{tr("directory.license.type", "Тип лицензии")}</Label>
                    <Select
                      value={directoryFields.licenseTypeId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("licenseTypeId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="license-type" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
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

                {/* Architecture Style */}
                <div className="grid gap-2">
                  <Label htmlFor="architecture-style">{tr("directory.architecture.style", "Архитектурный стиль")}</Label>
                    <Select
                      value={directoryFields.architectureStyleId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("architectureStyleId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="architecture-style" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
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

                {/* Critical Level */}
                <div className="grid gap-2">
                  <Label htmlFor="critical-level">{tr("directory.critical.level", "Уровень критичности")}</Label>
                    <Select
                      value={directoryFields.criticalLevelId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("criticalLevelId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="critical-level" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
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

                {/* Failover Type */}
                <div className="grid gap-2">
                  <Label htmlFor="failover-type">{tr("directory.failover.type", "Тип отказоустойчивости")}</Label>
                    <Select
                      value={directoryFields.failoverTypeId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("failoverTypeId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="failover-type" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {failoverTypes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Recovery Time */}
                <div className="grid gap-2">
                  <Label htmlFor="recovery-time">{tr("directory.recovery.time", "Время восстановления")}</Label>
                    <Select
                      value={directoryFields.recoveryTimeId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("recoveryTimeId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="recovery-time" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {recoveryTimes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Redundancy Type */}
                <div className="grid gap-2">
                  <Label htmlFor="redundancy-type">{tr("directory.redundancy.type", "Тип избыточности")}</Label>
                    <Select
                      value={directoryFields.redundancyTypeId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("redundancyTypeId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="redundancy-type" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {redundancyTypes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Monitoring Level */}
                <div className="grid gap-2">
                  <Label htmlFor="monitoring-level">{tr("directory.monitoring.level", "Уровень мониторинга")}</Label>
                    <Select
                      value={directoryFields.monitoringLevelId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("monitoringLevelId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="monitoring-level" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {monitoringLevels.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Scaling Type */}
                <div className="grid gap-2">
                  <Label htmlFor="scaling-type">{tr("directory.scaling.type", "Тип масштабирования")}</Label>
                    <Select
                      value={directoryFields.scalingTypeId ?? ""}
                      onValueChange={(value) => handleDirectoryFieldChange("scalingTypeId", value || null)}
                      disabled={updateState.isLoading || !item}
                    >
                    <SelectTrigger id="scaling-type" className="w-full">
                      <SelectValue placeholder={tr("select.placeholder", "Выберите...")} />
                    </SelectTrigger>
                    <SelectContent>
                      {scalingTypes.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </div>
          </div>
          </TabsContent>

          <TabsContent value="description" className="flex min-h-0 flex-1 flex-col mt-0">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <MarkdownEditor
                key={item.id}
                value={draft.description}
                onChange={(markdown) => {
                  setDraft((prev) => ({ ...prev, description: markdown }))
                }}
                disabled={updateState.isLoading || !item}
                placeholder={tr("description.placeholder", "Enter description...")}
              />
            </Card>
          </TabsContent>

          <TabsContent value="hierarchy" className="flex min-h-0 flex-1 flex-col mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 flex-1">
              <ParentTable
                componentId={item.id}
                onAddExisting={() => handleOpenAddExistingSheet("parent")}
              />
              <ChildrenTable
                componentId={item.id}
                onAddExisting={() => handleOpenAddExistingSheet("child")}
              />
            </div>
          </TabsContent>

          <TabsContent value="relations" className="flex min-h-0 flex-1 flex-col mt-0">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
              <div className="font-medium">Functions</div>
              <div className="text-muted-foreground text-sm">
                Application functions linked to this component (таблица `ApplicationComponentFunctionMap`).
              </div>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Events</div>
              <div className="text-muted-foreground text-sm">
                Events linked to this component (таблица `ApplicationComponentEventMap`).
              </div>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Interfaces</div>
              <div className="text-muted-foreground text-sm">
                Provided/required interfaces (entity `ApplicationInterface`).
              </div>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Data objects</div>
              <div className="text-muted-foreground text-sm">
                Data objects used/served by this component (таблица `ApplicationComponentDataObjectMap`).
              </div>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Products</div>
              <div className="text-muted-foreground text-sm">
                Business products connected to this component (таблица `ApplicationComponentProductMap`).
              </div>
            </Card>
            <Card className="p-4">
              <div className="font-medium">System software</div>
              <div className="text-muted-foreground text-sm">
                System software requirements (таблица `ApplicationComponentSystemSoftwareMap`).
              </div>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Nodes</div>
              <div className="text-muted-foreground text-sm">
                Technology nodes where component is deployed (таблица `ApplicationComponentTechnologyNodeMap`).
              </div>
            </Card>
            <Card className="p-4">
              <div className="font-medium">Solutions</div>
              <div className="text-muted-foreground text-sm">
                Solutions using this component (таблица `SolutionApplicationComponentMap`).
              </div>
            </Card>
            </div>
          </TabsContent>

          <TabsContent value="application" className="flex min-h-0 flex-1 flex-col mt-0">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Application tab content</div>
            </Card>
          </TabsContent>

          <TabsContent value="technology" className="flex min-h-0 flex-1 flex-col mt-0">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Technology tab content</div>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="flex min-h-0 flex-1 flex-col mt-0">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Schema tab content</div>
            </Card>
          </TabsContent>
        </TabsContents>
      </Tabs>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tr("dialog.unsaved.title", "Unsaved changes")}</DialogTitle>
            <DialogDescription>
              {tr("dialog.unsaved.description", "Save your changes before leaving?")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              {tr("action.cancel", "Cancel")}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setConfirmOpen(false)
                goBack()
              }}
            >
              {tr("action.discard", "Don’t save")}
            </Button>
            <Button
              onClick={() => {
                void (async () => {
                  try {
                    await handleSave()
                    setConfirmOpen(false)
                    goBack()
                  } catch (e: any) {
                    toast.error(e?.message ?? tr("action.saveFailed", "Failed to save"))
                  }
                })()
              }}
              disabled={updateState.isLoading || !isDraftValid}
            >
              {tr("item.action.save", "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Existing Items Sheet */}
      {sheetType && (
        <AddExistingItemsSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          title={sheetConfig.title}
          iconType={sheetConfig.iconType}
          items={sheetAvailableItems}
          isLoading={sheetIsLoading}
          searchQuery={sheetSearchQuery}
          onSearchChange={setSheetSearchQuery}
          selectedItems={sheetSelectedItems}
          onToggleItem={handleSheetToggleItem}
          onAdd={handleSheetAdd}
        />
      )}
    </div>
  )
}


