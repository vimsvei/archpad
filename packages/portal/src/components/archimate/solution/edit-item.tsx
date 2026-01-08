"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"
import { useDispatch, useSelector } from "react-redux"
import { useTr } from "@/lib/i18n/use-tr"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { UnsavedChangesDialog } from "@/components/archimate/application-component/unsaved-changes-dialog"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import {
  useGetSolutionFullQuery,
  useGetSolutionsQuery,
  useUpdateSolutionFullMutation,
} from "@/store/apis/solution-api"
import {
  useCreateApplicationFunctionMutation,
  useGetApplicationFunctionsQuery,
} from "@/store/apis/application-function-api"
import {
  useCreateDataObjectMutation,
  useGetDataObjectsQuery,
} from "@/store/apis/data-object-api"
import {
  useGetApplicationComponentsQuery,
} from "@/store/apis/application-component-api"
// TODO: Add technology nodes and networks APIs when available
import type { RootState, AppDispatch } from "@/store/store"
import {
  reset,
  setSaving,
  setError,
  setSaveError,
  loadSolution,
  addComponent,
  addFunction,
  addDataObject,
  addFlow,
  addMotivation,
  addStakeholder,
  addTechnologyNode,
  addTechnologyNetwork,
  updateBaseline,
  selectIsDirty,
  selectIsDraftValid,
} from "@/store/slices/solution-edit-slice"
import { GeneralTab } from "./general-tab"
import { StakeholdersTab } from "./stakeholders-tab"
import { ADRTab } from "./adr-tab"
import { ApplicationsTab } from "./applications-tab"
import { TechnologyTab } from "./technology-tab"
import { FlowsTab } from "./flows-tab"
import { SchemasTab } from "./schemas-tab"
import { AddExistingItemsSheet, type SelectableItem } from "@/components/shared/add-existing-items-sheet"
import { getSheetConfig, type SheetType } from "@/components/shared/archimate/sheet-configs"
import { ArchimateObjectIcon } from "@/components/shared/archimate/archimate-object-icon"
import { CreateNamedObjectSheet, type NamedObjectDraft } from "@/components/shared/create-named-object-sheet"

type EditItemProps = {
  id: string
}

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs)
    return () => window.clearTimeout(t)
  }, [value, delayMs])
  return debounced
}

export function EditItem({ id }: EditItemProps) {
  const { t } = useTranslate()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const tr = useTr()

  // Redux state
  const editState = useSelector((state: RootState) => state.solutionEdit)
  const [updateSolutionFull] = useUpdateSolutionFullMutation()
  const [createDataObject] = useCreateDataObjectMutation()
  const [createApplicationFunction] = useCreateApplicationFunctionMutation()

  // Load full solution data
  const { data: fullData, error: queryError, isLoading, isFetching } = useGetSolutionFullQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )

  // Load solution data into Redux store
  React.useEffect(() => {
    if (!fullData) return

    dispatch(
      loadSolution({
        code: fullData.code,
        name: fullData.name,
        description: fullData.description ?? "",
        context: fullData.context ?? "",
        decision: fullData.decision ?? "",
        consequences: fullData.consequences ?? "",
        alternatives: fullData.alternatives ?? "",
        decisionStatus: fullData.decisionStatus ?? null,
        implementationStatus: fullData.implementationStatus ?? null,
        components: fullData.components,
        functions: fullData.functions,
        dataObjects: fullData.dataObjects,
        flows: fullData.flows.map((flow) => ({
          id: flow.id,
          code: flow.code,
          name: flow.name,
          description: flow.description ?? null,
          sourceComponent: flow.sourceComponent?.name ?? null,
          sourceFunction: null,
          targetComponent: flow.targetComponent?.name ?? null,
          targetFunction: null,
        })),
        motivations: fullData.motivations,
        stakeholders: (fullData.stakeholders || []).map((s) => ({
          id: `${id}-${s.stakeholderId}-${s.roleId}`,
          stakeholderId: s.stakeholderId,
          stakeholderName: s.stakeholderName,
          roleId: s.roleId,
          roleName: s.roleName,
        })),
        technologyNodes: fullData.technologyNodes,
        technologyNetworks: fullData.technologyNetworks,
      })
    )
  }, [fullData, dispatch, id])

  // Reset on unmount
  React.useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const [tab, setTab] = React.useState<string>("general")

  // Check if dirty using selector
  const isDirty = useSelector(selectIsDirty)
  const isDraftValid = useSelector(selectIsDraftValid)

  // Full save handler
  const handleSaveFull = React.useCallback(async () => {
    if (!isDraftValid) {
      const errorMsg = tr("form.invalid")
      toast.error(errorMsg)
      dispatch(setSaveError(errorMsg))
      return
    }

    try {
      dispatch(setSaving(true))
      dispatch(setSaveError(null))

      // Create new items that were added to Redux but don't exist in DB yet
      const isTempId = (id: string) => id.startsWith("temp-")
      
      const newDataObjects = editState.dataObjects.filter((d: any) => isTempId(d.id))
      const newFunctions = editState.functions.filter((f: any) => isTempId(f.id))

      // Create all new items in parallel
      const [createdDataObjects, createdFunctions] = await Promise.all([
        Promise.all(
          newDataObjects.map((item) =>
            createDataObject({
              input: {
                code: item.code || undefined,
                name: item.name,
                description: item.description || undefined,
              },
            }).unwrap()
          )
        ),
        Promise.all(
          newFunctions.map((item) =>
            createApplicationFunction({
              input: {
                code: item.code || undefined,
                name: item.name,
                description: item.description || undefined,
              },
            }).unwrap()
          )
        ),
      ])

      // Map temp IDs to real IDs
      const tempIdMap = new Map<string, string>()
      newDataObjects.forEach((item, idx) => {
        tempIdMap.set(item.id, createdDataObjects[idx].id)
      })
      newFunctions.forEach((item, idx) => {
        tempIdMap.set(item.id, createdFunctions[idx].id)
      })

      // Helper to resolve ID
      const resolveId = (itemId: string) => tempIdMap.get(itemId) || itemId
      
      // Save full solution with all related data via PUT
      await updateSolutionFull({
        id,
        input: {
          code: editState.code.trim(),
          name: editState.name.trim(),
          description: editState.description.trim() || undefined,
          context: editState.context.trim() || undefined,
          decision: editState.decision.trim() || undefined,
          consequences: editState.consequences.trim() || undefined,
          alternatives: editState.alternatives.trim() || undefined,
          decisionStatus: editState.decisionStatus || undefined,
          implementationStatus: editState.implementationStatus || undefined,
          componentIds: editState.components.map((c) => resolveId(c.id)),
          functionIds: editState.functions.map((f) => resolveId(f.id)),
          dataObjectIds: editState.dataObjects.map((d) => resolveId(d.id)),
          flowIds: editState.flows.map((f) => f.id),
          motivationIds: editState.motivations.map((m) => m.id),
          stakeholderIds: editState.stakeholders.map((s) => ({
            stakeholderId: s.stakeholderId,
            roleId: s.roleId,
          })),
          technologyNodeIds: editState.technologyNodes.map((n) => n.id),
          technologyNetworkIds: editState.technologyNetworks.map((n) => n.id),
        },
      }).unwrap()

      toast.success(tr("action.saved"))
      dispatch(updateBaseline())
      dispatch(setSaveError(null))
    } catch (e: any) {
      const errorMessage = e?.message ?? tr("action.save.failed")
      dispatch(setSaveError(errorMessage))
      toast.error(errorMessage)
      console.error("Failed to save solution:", e)
      throw e
    } finally {
      dispatch(setSaving(false))
    }
  }, [id, editState, isDraftValid, dispatch, tr, updateSolutionFull, createDataObject, createApplicationFunction])

  // Add existing items sheet state
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [sheetType, setSheetType] = React.useState<SheetType | null>(null)
  const [sheetSearchQuery, setSheetSearchQuery] = React.useState("")
  const [sheetSelectedItems, setSheetSelectedItems] = React.useState<Set<string>>(new Set())
  const [sheetPage, setSheetPage] = React.useState(1)
  const [sheetPageSize, setSheetPageSize] = React.useState<10 | 25 | 50 | 100>(25)

  const debouncedSheetSearch = useDebouncedValue(sheetSearchQuery, 300)
  const sheetSearch = debouncedSheetSearch.trim() ? debouncedSheetSearch.trim() : undefined

  const dataObjectsList = useGetDataObjectsQuery(
    { search: sheetSearch, page: sheetPage, pageSize: sheetPageSize },
    { skip: !sheetOpen || sheetType !== "data-objects" }
  )
  const functionsList = useGetApplicationFunctionsQuery(
    { search: sheetSearch, page: sheetPage, pageSize: sheetPageSize },
    { skip: !sheetOpen || sheetType !== "functions" }
  )
  const componentsList = useGetApplicationComponentsQuery(
    { search: sheetSearch, page: sheetPage, pageSize: sheetPageSize },
    { skip: !sheetOpen || (sheetType !== "parent" && sheetType !== "components") }
  )
  // TODO: Add technology nodes and networks queries when APIs are available
  const nodesList = { data: { items: [], pageCount: 1 }, isLoading: false, isFetching: false } as any
  const networksList = { data: { items: [], pageCount: 1 }, isLoading: false, isFetching: false } as any

  const sheetItems: SelectableItem[] = React.useMemo(() => {
    switch (sheetType) {
      case "data-objects":
        return (dataObjectsList.data?.items ?? []).map((d) => ({
          id: String(d.id),
          code: String(d.code ?? ""),
          name: String(d.name ?? ""),
          description: (d as any).description ?? null,
        }))
      case "functions":
        return (functionsList.data?.items ?? []).map((f) => ({
          id: String(f.id),
          code: String(f.code ?? ""),
          name: String(f.name ?? ""),
          description: (f as any).description ?? null,
        }))
      case "components":
      case "parent":
        // Map components - use same logic for both
        return (componentsList.data?.items ?? []).map((c: any) => ({
          id: String(c.id),
          code: String(c.code ?? ""),
          name: String(c.name ?? ""),
          description: c.description ?? null,
        }))
      case "node":
        return (nodesList.data?.items ?? []).map((n) => ({
          id: String(n.id),
          code: String(n.code ?? ""),
          name: String(n.name ?? ""),
          description: (n as any).description ?? null,
        }))
      case "network":
        return (networksList.data?.items ?? []).map((n) => ({
          id: String(n.id),
          code: String(n.code ?? ""),
          name: String(n.name ?? ""),
          description: (n as any).description ?? null,
        }))
      default:
        return []
    }
  }, [sheetType, dataObjectsList.data, functionsList.data, componentsList.data, nodesList.data, networksList.data])

  const sheetPageCount = React.useMemo(() => {
    switch (sheetType) {
      case "data-objects":
        return dataObjectsList.data?.pageCount ?? 1
      case "functions":
        return functionsList.data?.pageCount ?? 1
      case "components":
      case "parent":
        return componentsList.data?.pageCount ?? 1
      case "node":
        return nodesList.data?.pageCount ?? 1
      case "network":
        return networksList.data?.pageCount ?? 1
      default:
        return 1
    }
  }, [sheetType, dataObjectsList.data, functionsList.data, componentsList.data, nodesList.data, networksList.data])

  const sheetIsLoading = React.useMemo(() => {
    switch (sheetType) {
      case "data-objects":
        return Boolean(dataObjectsList.isLoading || dataObjectsList.isFetching)
      case "functions":
        return Boolean(functionsList.isLoading || functionsList.isFetching)
      case "components":
      case "parent":
        return Boolean(componentsList.isLoading || componentsList.isFetching)
      case "node":
        return Boolean(nodesList.isLoading || nodesList.isFetching)
      case "network":
        return Boolean(networksList.isLoading || networksList.isFetching)
      default:
        return false
    }
  }, [sheetType, dataObjectsList, functionsList, componentsList, nodesList, networksList])

  // Create named-object sheet state
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
    router.push("/solutions")
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
      if (pendingNavigation) {
        setConfirmDialogOpen(false)
        pendingNavigation()
        setPendingNavigation(null)
      }
    } catch {
      // Error already handled in handleSaveFull
    }
  }, [handleSaveFull, pendingNavigation])

  // Intercept navigation when dirty
  React.useEffect(() => {
    const handlePopState = () => {
      if (isDirty && !confirmDialogOpen) {
        window.history.pushState(null, "", window.location.href)
        setPendingNavigation(() => () => window.history.back())
        setConfirmDialogOpen(true)
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [isDirty, confirmDialogOpen])

  const handleOpenCreateSheet = React.useCallback((type: SheetType) => {
    const config = getSheetConfig(type)
    if (!config?.canCreate) {
      console.warn(`Cannot create items of type "${type}"`)
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
    const title = tr(titleKey)
    return { title }
  }, [createSheetType, t, tr])

  const handleCreateNamedObject = React.useCallback(() => {
    if (!createSheetType) return

    const config = getSheetConfig(createSheetType)
    if (!config?.canCreate) {
      toast.error(tr("action.not-allowed"))
      return
    }

    const code = createSheetDraft.code.trim()
    const name = createSheetDraft.name.trim()
    const description = createSheetDraft.description.trim()
    if (!name) {
      toast.error(tr("action.validation.failed"))
      return
    }

    // Generate temporary ID for new item
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const tempItem = {
      id: tempId,
      code: code || "",
      name,
      description: description || undefined,
    }

    // Add to Redux state only
    if (createSheetType === "data-objects") {
      dispatch(addDataObject(tempItem))
    } else if (createSheetType === "functions") {
      dispatch(addFunction(tempItem))
    }

    toast.success(tr("action.created"))
    setCreateSheetOpen(false)
  }, [createSheetDraft, createSheetType, dispatch, tr])

  // Handler for opening add existing items sheet
  const handleOpenAddExistingSheet = React.useCallback((type: SheetType) => {
    setSheetType(type)
    setSheetSearchQuery("")
    setSheetSelectedItems(new Set())
    setSheetPage(1)
    setSheetPageSize(25)
    setSheetOpen(true)
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
    
    const itemsToAdd = sheetItems.filter((item) => sheetSelectedItems.has(item.id))
    if (itemsToAdd.length === 0) return

    if (sheetType === "data-objects") {
      itemsToAdd.forEach((item) => dispatch(addDataObject(item)))
    } else if (sheetType === "functions") {
      itemsToAdd.forEach((item) => dispatch(addFunction(item)))
    } else if (sheetType === "components" || sheetType === "parent") {
      itemsToAdd.forEach((item) => dispatch(addComponent(item)))
    } else if (sheetType === "node") {
      itemsToAdd.forEach((item) => dispatch(addTechnologyNode(item)))
    } else if (sheetType === "network") {
      itemsToAdd.forEach((item) => dispatch(addTechnologyNetwork(item)))
    }

    toast.success(tr("action.added"))
    setSheetOpen(false)
  }, [sheetType, sheetItems, sheetSelectedItems, dispatch, tr])

  // Get sheet title and icon based on type
  const sheetConfig = React.useMemo(() => {
    if (!sheetType) return { title: "", icon: undefined }
    const config = getSheetConfig(sheetType)
    if (!config) return { title: "", icon: undefined }
    const titleKey = `${t('action.add')} ${t(config.tableKey)}`
    const title = tr(titleKey)
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
                aria-label={tr("action.back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("solution.solution")}</h1>
        </div>
        <Card className="p-10">
          <div className="flex items-center justify-center gap-2">
            <Spinner className="h-6 w-6" />
            <span className="text-muted-foreground">{tr("loading")}</span>
          </div>
        </Card>
      </div>
    )
  }

  // Show error state
  if (queryError || editState.error || (!isLoading && !isFetching && !fullData && !editState.baseline)) {
    const errorMessage = editState.error || (queryError as any)?.message || tr("error.not-found")
    
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={tr("action.back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("solution.solution")}</h1>
        </div>
        <Card className="p-6">
          <div className="text-destructive font-medium mb-2">{tr("error.title")}</div>
          <div className="text-muted-foreground">{errorMessage}</div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              dispatch(setError(null))
              window.location.reload()
            }}
          >
            {tr("action.retry")}
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
                aria-label={tr("action.back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>
          <div className="flex items-start gap-3">
            <div className="grid place-items-center rounded-full bg-muted shrink-0 size-12">
              <ArchimateObjectIcon type="solution" className="text-foreground" size={28} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">
                {t("solution.solution")}: {editState.name || fullData?.name}
              </h1>
              <p className="text-muted-foreground text-sm">ID: {id}</p>
            </div>
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              aria-label={tr("action.save")}
              onClick={() => void handleSaveFull()}
              disabled={!isDirty || !isDraftValid || editState.isSaving}
              variant={editState.saveError ? "destructive" : "default"}
            >
              <Save />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">{tr("action.save")}</TooltipContent>
        </Tooltip>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="general">
            {tr("tab.general")}
          </TabsTrigger>
          <TabsTrigger value="stakeholders">
            {tr("tab.stakeholders")}
          </TabsTrigger>
          <TabsTrigger value="adr">
            {tr("tab.adr")}
          </TabsTrigger>
          <TabsTrigger value="applications">
            {tr("tab.applications")}
          </TabsTrigger>
          <TabsTrigger value="technology">
            {tr("tab.technology")}
          </TabsTrigger>
          <TabsTrigger value="flows">
            {tr("tab.flows")}
          </TabsTrigger>
          <TabsTrigger value="schemas">
            {tr("tab.schemas")}
          </TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="general" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <GeneralTab
              tr={tr}
              isSaving={editState.isSaving}
            />
          </TabsContent>

          <TabsContent value="stakeholders" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <StakeholdersTab
              solutionId={id}
              solutionName={editState.name}
            />
          </TabsContent>

          <TabsContent value="adr" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <ADRTab
              tr={tr}
              isSaving={editState.isSaving}
            />
          </TabsContent>

          <TabsContent value="applications" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <ApplicationsTab
              solutionId={id}
              solutionName={editState.name}
              onAddExistingComponent={() => handleOpenAddExistingSheet("parent")}
              onAddExistingFunction={() => handleOpenAddExistingSheet("functions")}
              onAddExistingDataObject={() => handleOpenAddExistingSheet("data-objects")}
              onCreateComponent={() => {
                // TODO: Create component - use existing create flow
                toast.info(t("action.not-implemented"))
              }}
              onCreateFunction={() => handleOpenCreateSheet("functions")}
              onCreateDataObject={() => handleOpenCreateSheet("data-objects")}
            />
          </TabsContent>

          <TabsContent value="technology" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <TechnologyTab
              solutionId={id}
              solutionName={editState.name}
              onAddExistingNode={() => handleOpenAddExistingSheet("node")}
              onAddExistingNetwork={() => handleOpenAddExistingSheet("network")}
            />
          </TabsContent>

          <TabsContent value="flows" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <FlowsTab
              solutionId={id}
              solutionName={editState.name}
              onAddExistingFlow={() => handleOpenAddExistingSheet("flows")}
              onCreateFlow={() => {
                // TODO: Create flow - use existing create flow
                toast.info(t("action.not-implemented"))
              }}
            />
          </TabsContent>

          <TabsContent value="schemas" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <SchemasTab
              solutionId={id}
              solutionName={editState.name}
            />
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
          items={sheetItems}
          isLoading={sheetIsLoading}
          searchQuery={sheetSearchQuery}
          onSearchChange={(q) => {
            setSheetSearchQuery(q)
            setSheetPage(1)
          }}
          selectedItems={sheetSelectedItems}
          onToggleItem={handleSheetToggleItem}
          onAdd={handleSheetAdd}
          pagination={{
            page: sheetPage,
            pageCount: sheetPageCount,
            onPageChange: setSheetPage,
            pageSize: sheetPageSize,
            onPageSizeChange: (s) => {
              setSheetPageSize(s)
              setSheetPage(1)
            },
          }}
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
              <span className="text-lg">{tr("action.saving")}</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}