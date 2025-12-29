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
import { UnsavedChangesDialog } from "./unsaved-changes-dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import {
  useGetApplicationComponentFullQuery,
  useUpdateApplicationComponentFullMutation,
} from "@/store/apis/application-component-api"
import type { RootState, AppDispatch } from "@/store/store"
import {
  reset,
  setSaving,
  setError,
  setSaveError,
  loadComponent,
  addFunction,
  addDataObject,
  addInterface,
  addEvent,
  updateBaseline,
  selectIsDirty,
  selectIsDraftValid,
} from "@/store/slices/application-component-edit-slice"
import { GeneralTab } from "./general-tab"
import { ClassificationTab } from "./classification-tab"
import { ApplicationTab } from "./application-tab"
import { TechnologyTab } from "./technology-tab"
import { FlowsTable } from "./flows-table"
import { AddExistingItemsSheet, type SelectableItem } from "@/components/shared/add-existing-items-sheet"
import { getSheetConfig, type SheetType } from "@/components/archimate/sheet-configs"
import { ArchimateObjectIcon } from "@/components/archimate/archimate-object-icon"
import { CreateNamedObjectSheet, type NamedObjectDraft } from "@/components/shared/create-named-object-sheet"
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
  const [updateComponentFull] = useUpdateApplicationComponentFullMutation()

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
        incomingFlows: [], // TODO: Load from GraphQL query
        outgoingFlows: [], // TODO: Load from GraphQL query
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

  // Check if dirty using selector
  const isDirty = useSelector(selectIsDirty)

  const isDraftValid = React.useMemo(() => {
    return Boolean(editState.code.trim()) && Boolean(editState.name.trim())
  }, [editState.code, editState.name])

  // Full save handler - saves all data including related items
  const handleSaveFull = React.useCallback(async () => {
    if (!isDraftValid) {
      const errorMsg = tr("form.invalid", "Please fill required fields")
      toast.error(errorMsg)
      dispatch(setSaveError(errorMsg))
      return
    }

    try {
      dispatch(setSaving(true))
      dispatch(setSaveError(null))

      // Create new items that were added to Redux but don't exist in DB yet
      // Temporary IDs start with "temp-", real UUIDs don't
      const isTempId = (id: string) => id.startsWith("temp-")
      
      const newDataObjects = editState.dataObjects.filter((d: any) => isTempId(d.id))
      const newFunctions = editState.functions.filter((f: any) => isTempId(f.id))
      const newInterfaces = editState.interfaces.filter((i: any) => isTempId(i.id))
      const newEvents = editState.events.filter((e: any) => isTempId(e.id))

      // Create all new items in parallel
      // Note: We need to know the type of each item to call the correct REST function
      // Since we can't store type in Redux, we create items based on which array they came from
      const [createdDataObjects, createdFunctions, createdInterfaces, createdEvents] = await Promise.all([
        Promise.all(newDataObjects.map((item) =>
          DataObjectRest.createDataObjectRest({
            code: item.code || undefined,
            name: item.name,
            description: item.description || undefined,
          })
        )),
        Promise.all(newFunctions.map((item) =>
          ApplicationFunctionRest.createApplicationFunctionRest({
            code: item.code || undefined,
            name: item.name,
            description: item.description || undefined,
          })
        )),
        Promise.all(newInterfaces.map((item) =>
          ApplicationInterfaceRest.createApplicationInterfaceRest({
            code: item.code || undefined,
            name: item.name,
            description: item.description || undefined,
            componentId: id, // Backend creates link automatically, but PUT will overwrite it
          })
        )),
        Promise.all(newEvents.map((item) =>
          ApplicationEventRest.createApplicationEventRest({
            code: item.code || undefined,
            name: item.name,
            description: item.description || undefined,
          })
        )),
      ])

      // Map temp IDs to real IDs
      const tempIdMap = new Map<string, string>()
      newDataObjects.forEach((item, idx) => {
        tempIdMap.set(item.id, createdDataObjects[idx].id)
      })
      newFunctions.forEach((item, idx) => {
        tempIdMap.set(item.id, createdFunctions[idx].id)
      })
      newInterfaces.forEach((item, idx) => {
        tempIdMap.set(item.id, createdInterfaces[idx].id)
      })
      newEvents.forEach((item, idx) => {
        tempIdMap.set(item.id, createdEvents[idx].id)
      })

      // Helper to resolve ID (real ID or temp ID mapping)
      const resolveId = (itemId: string) => tempIdMap.get(itemId) || itemId
      
      // Save full component with all related data via PUT using RTK Query mutation
      await updateComponentFull({
        id,
        input: {
          code: editState.code.trim(),
          name: editState.name.trim(),
          description: editState.description.trim() || undefined,
          stateId: editState.stateId ?? undefined,
          licenseTypeId: editState.directoryFields.licenseTypeId ?? undefined,
          architectureStyleId: editState.directoryFields.architectureStyleId ?? undefined,
          criticalLevelId: editState.directoryFields.criticalLevelId ?? undefined,
          failoverTypeId: editState.directoryFields.failoverTypeId ?? undefined,
          recoveryTimeId: editState.directoryFields.recoveryTimeId ?? undefined,
          redundancyTypeId: editState.directoryFields.redundancyTypeId ?? undefined,
          monitoringLevelId: editState.directoryFields.monitoringLevelId ?? undefined,
          scalingTypeId: editState.directoryFields.scalingTypeId ?? undefined,
          functionIds: editState.functions.map((f) => resolveId(f.id)),
          dataObjectIds: editState.dataObjects.map((d) => resolveId(d.id)),
          interfaceIds: editState.interfaces.map((i) => resolveId(i.id)),
          eventIds: editState.events.map((e) => resolveId(e.id)),
          systemSoftwareIds: editState.systemSoftware.map((s) => ({ id: resolveId(s.id), kind: s.kind })),
          technologyNodeIds: editState.technologyNodes.map((n) => resolveId(n.id)),
          technologyNetworkIds: editState.technologyNetworks.map((n) => resolveId(n.id)),
          parentIds: editState.parents.map((p) => resolveId(p.id)),
          childIds: editState.children.map((c) => resolveId(c.id)),
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
      throw e // Re-throw to allow caller to handle
    } finally {
      dispatch(setSaving(false))
    }
  }, [id, editState, isDraftValid, dispatch, tr, updateComponentFull])

  // Global save handler (alias for compatibility)
  const handleSave = handleSaveFull

  // Add existing items sheet state
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [sheetType, setSheetType] = React.useState<SheetType | null>(null)
  const [sheetSearchQuery, setSheetSearchQuery] = React.useState("")
  const [sheetSelectedItems, setSheetSelectedItems] = React.useState<Set<string>>(new Set())
  const [sheetAvailableItems, setSheetAvailableItems] = React.useState<SelectableItem[]>([])
  const [sheetIsLoading, setSheetIsLoading] = React.useState(false)

  // Create named-object sheet state (right sidebar)
  const [createSheetOpen, setCreateSheetOpen] = React.useState(false)
  const [createSheetType, setCreateSheetType] = React.useState<SheetType | null>(null)
  const [createSheetDraft, setCreateSheetDraft] = React.useState<NamedObjectDraft>({
    code: "",
    name: "",
    description: "",
  })


  // Dialog state for unsaved changes
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)
  const [pendingNavigation, setPendingNavigation] = React.useState<(() => void) | null>(null)

  const goBack = React.useCallback(() => {
    router.push("/application/components")
  }, [router])

  const handleBack = React.useCallback(() => {
    if (isDirty) {
      setPendingNavigation(() => goBack)
      setConfirmDialogOpen(true)
    } else {
      goBack()
    }
  }, [goBack, isDirty])

  // Handle dialog cancel
  const handleDialogCancel = React.useCallback(() => {
    setConfirmDialogOpen(false)
    setPendingNavigation(null)
  }, [])

  // Handle dialog save
  const handleDialogSave = React.useCallback(async () => {
    try {
      await handleSaveFull()
      // After successful save, proceed with navigation
      if (pendingNavigation) {
        setConfirmDialogOpen(false)
        pendingNavigation()
        setPendingNavigation(null)
      }
    } catch {
      // Error already handled in handleSaveFull
      // Don't close dialog on error
    }
  }, [handleSaveFull, pendingNavigation])

  // Intercept link clicks - optimized with early returns and memoized
  const handleLinkClick = React.useCallback((e: MouseEvent) => {
    if (!isDirty || confirmDialogOpen) return

    // Early return if not a link click - check nodeName first for better performance
    const target = e.target as HTMLElement
    if (target.nodeName !== 'A' && !target.closest) return
    
    const link = target.closest?.('a[href]') as HTMLAnchorElement | null
    if (!link) return

    const href = link.getAttribute('href')
    if (!href) return

    // Don't intercept external links or anchors
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
      return
    }

    // Don't intercept if it's the current page
    const currentPath = window.location.pathname
    if (href === currentPath || href === `${currentPath}/`) {
      return
    }

    // Intercept navigation
    e.preventDefault()
    e.stopPropagation()
    
    setPendingNavigation(() => () => router.push(href))
    setConfirmDialogOpen(true)
  }, [isDirty, confirmDialogOpen, router])

  // Intercept navigation when dirty
  React.useEffect(() => {
    // Handle browser back/forward
    const handlePopState = () => {
      if (isDirty && !confirmDialogOpen) {
        window.history.pushState(null, "", window.location.href)
        setPendingNavigation(() => () => window.history.back())
        setConfirmDialogOpen(true)
      }
    }

    // Handle beforeunload (browser close/refresh)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("popstate", handlePopState)
    document.addEventListener("click", handleLinkClick, true) // Use capture phase

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
      document.removeEventListener("click", handleLinkClick, true)
    }
  }, [isDirty, confirmDialogOpen, handleLinkClick])


  const handleOpenCreateSheet = React.useCallback((type: SheetType) => {
    const config = getSheetConfig(type)
    if (!config?.canCreate) {
      console.warn(`Cannot create items of type "${type}" - canCreate is not enabled`)
      return
    }
    setCreateSheetType(type)
    setCreateSheetDraft({ code: "", name: "", description: "" })
    setCreateSheetOpen(true)
  }, [])

  const createSheetConfig = React.useMemo(() => {
    if (!createSheetType) return { title: "" }
    
    const config = getSheetConfig(createSheetType)
    if (!config) return { title: "" }
    
    const titleKey = `${t("action.create")} ${t(config.tableKey)}`
    const title = tr(titleKey, titleKey) // No fallback - show translation key if translation missing
    return { title }
  }, [createSheetType, t, tr])

  const handleCreateNamedObject = React.useCallback(() => {
    if (!createSheetType) return

    const config = getSheetConfig(createSheetType)
    if (!config?.canCreate) {
      toast.error(tr("action.notAllowed", "This action is not allowed"))
      return
    }

    const code = createSheetDraft.code.trim()
    const name = createSheetDraft.name.trim()
    const description = createSheetDraft.description.trim()
    if (!name) {
      toast.error(tr("action.validationFailed", "Fill required fields"))
      return
    }

    // Generate temporary ID for new item (will be created on save)
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const tempItem = {
      id: tempId,
      code: code || "",
      name,
      description: description || undefined,
    }

    // Add to Redux state only - item will be created on backend when component is saved via PUT
    if (createSheetType === "data-objects") {
      dispatch(addDataObject(tempItem))
    } else if (createSheetType === "functions") {
      dispatch(addFunction(tempItem))
    } else if (createSheetType === "interfaces") {
      dispatch(addInterface(tempItem))
    } else if (createSheetType === "events") {
      dispatch(addEvent(tempItem))
    }

    toast.success(tr("action.created", "Created"))
    setCreateSheetOpen(false)
  }, [createSheetDraft, createSheetType, dispatch, tr])

  // Handler for opening add existing items sheet
  const handleOpenAddExistingSheet = React.useCallback((type: SheetType) => {
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
  const sheetConfig = React.useMemo(() => {
    if (!sheetType) return { title: "", icon: undefined }
    
    const config = getSheetConfig(sheetType)
    if (!config) return { title: "", icon: undefined }
    
    const titleKey = `${t('action.add')} ${t(config.tableKey)}`
    const title = tr(titleKey, titleKey) // No fallback - show translation key if translation missing
    
    return {
      title,
      icon: config.icon,
    }
  }, [sheetType, t, tr])

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
              disabled={!isDirty || !isDraftValid || editState.isSaving}
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
              componentName={editState.name}
              onAddExistingSystemSoftware={() => handleOpenAddExistingSheet("system-software")}
              onAddExistingNode={() => handleOpenAddExistingSheet("node")}
              onAddExistingNetwork={() => handleOpenAddExistingSheet("network")}
            />
          </TabsContent>

          <TabsContent value="flows" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <FlowsTable
              componentId={id}
              componentName={editState.name}
              onCreate={() => {
                // TODO: Implement flow creation
                toast.info(t("action.notImplemented", "Feature not implemented yet"))
              }}
            />
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
          icon={sheetConfig.icon}
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
          isSubmitting={false}
          draft={createSheetDraft}
          onDraftChange={setCreateSheetDraft}
          onSubmit={handleCreateNamedObject}
        />
      )}

      {/* Unsaved Changes Confirmation Dialog */}
      <UnsavedChangesDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        componentName={editState.name}
        isSaving={editState.isSaving}
        isValid={isDraftValid}
        onCancel={handleDialogCancel}
        onSave={handleDialogSave}
      />

      {/* Full Page Loader during save */}
      {editState.isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Spinner className="h-6 w-6" />
              <span className="text-lg">{tr("action.saving", "Сохранение...")}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}


