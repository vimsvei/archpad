"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"
import { useDispatch, useSelector } from "react-redux"

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
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import {
  useGetApplicationComponentFullQuery,
  useUpdateApplicationComponentMutation,
} from "@/store/apis/application-component-api"
import type { RootState, AppDispatch } from "@/store/store"
import {
  reset,
  setLoading,
  setSaving,
  setError,
  setSaveError,
  loadComponent,
  updateBasicFields,
  updateStateId,
  updateDirectoryField,
  addFunction,
  removeFunction,
  addDataObject,
  removeDataObject,
  addInterface,
  removeInterface,
  addEvent,
  removeEvent,
  addSystemSoftware,
  removeSystemSoftware,
  addTechnologyNode,
  removeTechnologyNode,
  addTechnologyNetwork,
  removeTechnologyNetwork,
  addParent,
  removeParent,
  addChild,
  removeChild,
  updateBaseline,
  selectIsDirty,
  selectIsDraftValid,
  selectBasicFields,
} from "@/store/slices/application-component-edit-slice"
import { GeneralTab } from "./general-tab"
import { ClassificationTab } from "./classification-tab"
import { ApplicationTab } from "./application-tab"
import { TechnologyTab } from "./technology-tab"
import { AddExistingItemsSheet, type SelectableItem } from "@/components/shared/add-existing-items-sheet"
import { ArchimateObjectIcon } from "@/components/shared/base-object/archimate-object-icon"
import { CreateNamedObjectSheet, type NamedObjectDraft } from "@/components/shared/create-named-object-sheet"
import * as ApplicationComponentRest from "@/services/application-component.rest"
import * as ApplicationInterfaceRest from "@/services/application-interface.rest"
import * as ApplicationFunctionRest from "@/services/application-function.rest"
import * as DataObjectRest from "@/services/data-object.rest"
import * as ApplicationEventRest from "@/services/application-event.rest"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  const { t } = useTranslate()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  // Redux state
  const editState = useSelector((state: RootState) => state.applicationComponentEdit)
  const [updateItem, updateState] = useUpdateApplicationComponentMutation()

  // Load full component data
  const { data: fullData, error: queryError, isLoading, isFetching } = useGetApplicationComponentFullQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )

  // Load component data into Redux store
  React.useEffect(() => {
    if (!fullData) return

    // Get stateId from state if available
    const stateId = fullData.state?.id ?? null

    // Map directory fields (TODO: add other fields when API supports them)
    const directoryFields = {
      stateId,
      licenseTypeId: null,
      architectureStyleId: null,
      criticalLevelId: null,
      failoverTypeId: null,
      recoveryTimeId: null,
      redundancyTypeId: null,
      monitoringLevelId: null,
      scalingTypeId: null,
    }

    dispatch(
      loadComponent({
        code: fullData.code,
        name: fullData.name,
        description: fullData.description ?? "",
        stateId,
        directoryFields,
        functions: fullData.functions,
        dataObjects: fullData.dataObjects,
        interfaces: fullData.interfaces,
        events: fullData.events,
        systemSoftware: fullData.systemSoftware,
        technologyNodes: fullData.technologyNodes,
        technologyNetworks: fullData.technologyNetworks,
        parents: fullData.parents,
        children: fullData.children,
      })
    )
  }, [fullData, dispatch])

  // Reset on unmount
  React.useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const [tab, setTab] = React.useState<string>("general")

  // Computed values from Redux state
  const draft: BaseObjectValues = {
    code: editState.code,
    name: editState.name,
    description: editState.description,
  }

  const directoryFields = editState.directoryFields

  // Check if dirty
  const isDirty = React.useMemo(() => {
    if (!editState.baseline) return false

    const basicChanged =
      editState.code !== editState.baseline.code ||
      editState.name !== editState.baseline.name ||
      editState.description !== editState.baseline.description ||
      editState.stateId !== editState.baseline.stateId

    const directoryChanged = Object.keys(editState.directoryFields).some(
      (key) =>
        editState.directoryFields[key as keyof typeof editState.directoryFields] !==
        editState.baseline.directoryFields[key as keyof typeof editState.directoryFields]
    )

    return basicChanged || directoryChanged
  }, [editState])

  const isDraftValid = React.useMemo(() => {
    return Boolean(editState.code.trim()) && Boolean(editState.name.trim())
  }, [editState.code, editState.name])

  // Global save handler with error handling
  const handleSave = React.useCallback(async () => {
    if (!isDraftValid) {
      const errorMsg = tr("form.invalid", "Please fill required fields")
      toast.error(errorMsg)
      dispatch(setSaveError(errorMsg))
      return
    }

    try {
      dispatch(setSaving(true))
      dispatch(setSaveError(null))
      
      await updateItem({
        id,
        input: {
          code: editState.code.trim(),
          name: editState.name.trim(),
          description: editState.description.trim() || undefined,
          stateId: editState.stateId ?? undefined,
          // TODO: Add other directory fields when API supports them
        },
      }).unwrap()

      toast.success(tr("action.saved", "Saved"))
      dispatch(updateBaseline())
      dispatch(setSaveError(null))
    } catch (e: any) {
      const errorMessage = e?.message ?? tr("action.saveFailed", "Failed to save")
      dispatch(setSaveError(errorMessage))
      toast.error(errorMessage)
      
      // Log error for debugging
      console.error("Failed to save component:", e)
    } finally {
      dispatch(setSaving(false))
    }
  }, [id, editState, isDraftValid, updateItem, dispatch, tr])

  // Add existing items sheet state
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [sheetType, setSheetType] = React.useState<"system-software" | "data-objects" | "parent" | "child" | "functions" | "interfaces" | "events" | "node" | "network" | null>(null)
  const [sheetSearchQuery, setSheetSearchQuery] = React.useState("")
  const [sheetSelectedItems, setSheetSelectedItems] = React.useState<Set<string>>(new Set())
  const [sheetAvailableItems, setSheetAvailableItems] = React.useState<SelectableItem[]>([])
  const [sheetIsLoading, setSheetIsLoading] = React.useState(false)

  // Create named-object sheet state (right sidebar)
  const [createSheetOpen, setCreateSheetOpen] = React.useState(false)
  const [createSheetType, setCreateSheetType] = React.useState<"data-objects" | "functions" | "interfaces" | "events" | null>(null)
  const [createSheetDraft, setCreateSheetDraft] = React.useState<NamedObjectDraft>({
    code: "",
    name: "",
    description: "",
  })
  const [createSheetIsSubmitting, setCreateSheetIsSubmitting] = React.useState(false)


  const goBack = React.useCallback(() => {
    router.push("/application/components")
  }, [router])

  const handleBack = React.useCallback(() => {
    goBack()
  }, [goBack])

  const handleDirectoryFieldChange = React.useCallback(
    (fieldName: keyof typeof editState.directoryFields, value: string | null) => {
      if (fieldName === "stateId") {
        dispatch(updateStateId(value))
      } else {
        dispatch(updateDirectoryField({ field: fieldName, value }))
      }
    },
    [dispatch]
  )

  // Refresh is now handled by Redux store updates, no need for tokens

  const handleOpenCreateSheet = React.useCallback((type: "data-objects" | "functions" | "interfaces" | "events") => {
    setCreateSheetType(type)
    setCreateSheetDraft({ code: "", name: "", description: "" })
    setCreateSheetOpen(true)
  }, [])

  const createSheetConfig = React.useMemo(() => {
    const tableKeyMap: Record<NonNullable<typeof createSheetType>, string> = {
      "data-objects": "application.data-objects",
      "functions": "application.functions",
      "interfaces": "application.interfaces",
      "events": "application.events",
    }
    const tableKey = createSheetType ? tableKeyMap[createSheetType] : ""
    const titleKey = tableKey ? `${t("action.create")} ${t(tableKey)}` : ""
    const title =
      createSheetType === "data-objects"
        ? tr(titleKey, "Создать объект данных")
        : createSheetType === "functions"
          ? tr(titleKey, "Создать функцию")
          : createSheetType === "interfaces"
            ? tr(titleKey, "Создать интерфейс")
            : createSheetType === "events"
              ? tr(titleKey, "Создать событие")
            : ""
    return { title }
  }, [createSheetType, t, tr])

  const handleCreateNamedObject = React.useCallback(() => {
    if (!item || !createSheetType) return

    void (async () => {
      const code = createSheetDraft.code.trim()
      const name = createSheetDraft.name.trim()
      const description = createSheetDraft.description.trim()
      if (!name) {
        toast.error(tr("action.validationFailed", "Fill required fields"))
        return
      }

      try {
        setCreateSheetIsSubmitting(true)

        if (createSheetType === "data-objects") {
          const created = await DataObjectRest.createDataObjectRest({
            code: code ? code : undefined,
            name,
            description: description ? description : undefined,
          })
          await ApplicationComponentRest.addApplicationComponentDataObjectRest(id, created.id)
          dispatch(
            addDataObject({
              id: created.id,
              code: created.code,
              name: created.name,
              description: created.description ?? undefined,
            })
          )
        } else if (createSheetType === "functions") {
          const created = await ApplicationFunctionRest.createApplicationFunctionRest({
            code: code ? code : undefined,
            name,
            description: description ? description : undefined,
          })
          await ApplicationComponentRest.addApplicationComponentFunctionRest(id, created.id)
          dispatch(
            addFunction({
              id: created.id,
              code: created.code,
              name: created.name,
              description: created.description ?? undefined,
            })
          )
        } else if (createSheetType === "interfaces") {
          const created = await ApplicationInterfaceRest.createApplicationInterfaceRest({
            code: code ? code : undefined,
            name,
            description: description ? description : undefined,
            componentId: id,
          })
          dispatch(
            addInterface({
              id: created.id,
              code: created.code,
              name: created.name,
              description: created.description ?? undefined,
            })
          )
        } else if (createSheetType === "events") {
          const created = await ApplicationEventRest.createApplicationEventRest({
            code: code ? code : undefined,
            name,
            description: description ? description : undefined,
          })
          await ApplicationComponentRest.addApplicationComponentEventRest(id, created.id)
          dispatch(
            addEvent({
              id: created.id,
              code: created.code,
              name: created.name,
              description: created.description ?? undefined,
            })
          )
        }

        toast.success(tr("action.created", "Created"))
        setCreateSheetOpen(false)
      } catch (e: any) {
        toast.error(e?.message ?? tr("action.createFailed", "Failed to create"))
      } finally {
        setCreateSheetIsSubmitting(false)
      }
    })()
  }, [createSheetDraft, createSheetType, id, dispatch, tr])

  // Handler for opening add existing items sheet
  const handleOpenAddExistingSheet = React.useCallback((type: "system-software" | "data-objects" | "parent" | "child" | "functions" | "interfaces" | "events" | "node" | "network") => {
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
      "functions": "application.functions",
      "interfaces": "application.interfaces",
      "events": "application.events",
      "node": "technologies.nodes",
      "network": "technologies.networks",
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
      case "functions":
        return {
          title: tr(titleKey, "Добавить функции"),
          iconType: "application-component" as const,
        }
      case "interfaces":
        return {
          title: tr(titleKey, "Добавить интерфейсы"),
          iconType: "application-component" as const,
        }
      case "events":
        return {
          title: tr(titleKey, "Добавить события"),
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

  // Show loading state
  if (isLoading || isFetching || editState.isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back", "Back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("application.component")}</h1>
        </div>
        <Card className="p-10">
          <div className="flex items-center justify-center gap-2">
            <Spinner className="h-6 w-6" />
            <span className="text-muted-foreground">{tr("loading", "Loading...")}</span>
          </div>
        </Card>
      </div>
    )
  }

  // Show error state
  if (queryError || editState.error || (!isLoading && !isFetching && !fullData && !editState.baseline)) {
    const errorMessage = editState.error || (queryError as any)?.message || tr("error.notFound", "Component not found")
    
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back", "Back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("application.component")}</h1>
        </div>
        <Card className="p-6">
          <div className="text-destructive font-medium mb-2">{tr("error.title", "Error")}</div>
          <div className="text-muted-foreground">{errorMessage}</div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              dispatch(setError(null))
              // Retry loading
              window.location.reload()
            }}
          >
            {tr("action.retry", "Retry")}
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-start justify-between gap-4 flex-shrink-0 mb-6">
        <div className="flex items-start gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back", "Back")}</TooltipContent>
          </Tooltip>
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center rounded-full bg-muted p-2 shrink-0">
              <ArchimateObjectIcon type="application-component" className="text-foreground" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">
                {t("application.component")}: {editState.name || fullData?.name}
              </h1>
              <p className="text-muted-foreground text-sm">ID: {id}</p>
            </div>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              aria-label={tr("action.save", "Save")}
              onClick={() => void handleSave()}
              disabled={!isDirty || updateState.isLoading || !isDraftValid || editState.isSaving}
              variant={editState.saveError ? "destructive" : "default"}
            >
              <Save />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tr("action.save", "Save")}</TooltipContent>
        </Tooltip>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="general">
            {tr("tab.general", "General")}
          </TabsTrigger>
          <TabsTrigger value="classification">
            {tr("tab.classification", "Classification")}
          </TabsTrigger>
          <TabsTrigger value="application">
            {tr("tab.application", "Application")}
          </TabsTrigger>
          <TabsTrigger value="technology">
            {tr("tab.technology", "Technology")}
          </TabsTrigger>
          <TabsTrigger value="flows">
            {tr("tab.flows", "Flows")}
          </TabsTrigger>
          <TabsTrigger value="solutions">
            {tr("tab.solutions", "Solutions")}
          </TabsTrigger>
          <TabsTrigger value="schemas">
            {tr("tab.schemas", "Schemas")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="general" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <GeneralTab
              tr={tr}
              isSaving={editState.isSaving}
            />
          </TabsContent>

          <TabsContent value="classification" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <ClassificationTab
              tr={tr}
              isSaving={editState.isSaving}
            />
          </TabsContent>

          <TabsContent value="application" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <ApplicationTab
              componentId={id}
              componentName={editState.name}
              onAddExistingParent={() => handleOpenAddExistingSheet("parent")}
              onAddExistingChild={() => handleOpenAddExistingSheet("child")}
              onAddExistingDataObjects={() => handleOpenAddExistingSheet("data-objects")}
              onAddExistingFunctions={() => handleOpenAddExistingSheet("functions")}
              onAddExistingInterfaces={() => handleOpenAddExistingSheet("interfaces")}
              onAddExistingEvents={() => handleOpenAddExistingSheet("events")}
              onCreateDataObjects={() => handleOpenCreateSheet("data-objects")}
              onCreateFunctions={() => handleOpenCreateSheet("functions")}
              onCreateInterfaces={() => handleOpenCreateSheet("interfaces")}
              onCreateEvents={() => handleOpenCreateSheet("events")}
            />
          </TabsContent>

          <TabsContent value="technology" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <TechnologyTab
              componentId={id}
              onAddExistingSystemSoftware={() => handleOpenAddExistingSheet("system-software")}
              onAddExistingNode={() => handleOpenAddExistingSheet("node")}
              onAddExistingNetwork={() => handleOpenAddExistingSheet("network")}
            />
          </TabsContent>

          <TabsContent value="flows" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Flows tab content</div>
            </Card>
          </TabsContent>
          
          <TabsContent value="solutions" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Solutions tab content</div>
            </Card>
          </TabsContent>

          <TabsContent value="schemas" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Schemas tab content</div>
            </Card>
          </TabsContent>
        </TabsContents>
      </Tabs>

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

      {/* Create Named Object Sheet */}
      {createSheetType && (
        <CreateNamedObjectSheet
          open={createSheetOpen}
          onOpenChange={setCreateSheetOpen}
          title={createSheetConfig.title}
          isSubmitting={createSheetIsSubmitting}
          draft={createSheetDraft}
          onDraftChange={setCreateSheetDraft}
          onSubmit={handleCreateNamedObject}
        />
      )}
    </div>
  )
}


