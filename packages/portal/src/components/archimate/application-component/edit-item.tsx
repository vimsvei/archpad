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
import type { BaseObjectValues } from "@/components/shared/base-object/base-object-types"
import {
  useGetApplicationComponentQuery,
  useUpdateApplicationComponentMutation,
} from "@/store/apis/application-component-api"
import type { ApplicationComponentDirectoryFields } from "@/@types/application-component"
import { GeneralTab } from "./general-tab"
import { ApplicationTab } from "./application-tab"
import { TechnologyTab } from "./technology-tab"
import { AddExistingItemsSheet, type SelectableItem } from "@/components/shared/add-existing-items-sheet"
import { ArchimateObjectIcon } from "@/components/shared/base-object/archimate-object-icon"

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
  const [sheetType, setSheetType] = React.useState<"system-software" | "data-objects" | "parent" | "child" | "functions" | "interfaces" | "events" | null>(null)
  const [sheetSearchQuery, setSheetSearchQuery] = React.useState("")
  const [sheetSelectedItems, setSheetSelectedItems] = React.useState<Set<string>>(new Set())
  const [sheetAvailableItems, setSheetAvailableItems] = React.useState<SelectableItem[]>([])
  const [sheetIsLoading, setSheetIsLoading] = React.useState(false)

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

    const initialFields: ApplicationComponentDirectoryFields = {
      stateId: null, // Will be set by GeneralTab when componentStates are loaded
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
  }, [item])

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
  const handleOpenAddExistingSheet = React.useCallback((type: "system-software" | "data-objects" | "parent" | "child" | "functions" | "interfaces" | "events") => {
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

  if (isLoading || isFetching) {
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
          <div className="text-muted-foreground">{(error as any)?.message ?? "Item not found."}</div>
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
                {t("application.component")}: {item.name}
              </h1>
              <p className="text-muted-foreground text-sm">ID: {item.id}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                aria-label={tr("action.save", "Save")}
                onClick={() => void handleSave()}
                disabled={!isDirty || updateState.isLoading || !isDraftValid}
              >
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.save", "Save")}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="flex min-h-0 flex-1 flex-col">
        <TabsList className="relative w-fit">
          <TabsTrigger value="general">
            {tr("tab.general", "General")}
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
          <TabsContent value="general" className="flex min-h-0 flex-1 flex-col mt-4">
            {item && (
              <GeneralTab
                item={item}
                draft={draft}
                setDraft={setDraft}
                directoryFields={directoryFields}
                onDirectoryFieldChange={handleDirectoryFieldChange}
                normalize={normalize}
                baselineRef={baselineRef}
                tr={tr}
                isSaving={updateState.isLoading}
              />
            )}
          </TabsContent>

          <TabsContent value="application" className="flex min-h-0 flex-1 flex-col mt-4">
            {item && (
              <ApplicationTab
                componentId={item.id}
                onAddExistingParent={() => handleOpenAddExistingSheet("parent")}
                onAddExistingChild={() => handleOpenAddExistingSheet("child")}
                onAddExistingDataObjects={() => handleOpenAddExistingSheet("data-objects")}
                onAddExistingFunctions={() => handleOpenAddExistingSheet("functions")}
                onAddExistingInterfaces={() => handleOpenAddExistingSheet("interfaces")}
                onAddExistingEvents={() => handleOpenAddExistingSheet("events")}
              />
            )}
          </TabsContent>

          <TabsContent value="technology" className="flex min-h-0 flex-1 flex-col mt-4">
            {item && (
              <TechnologyTab
                componentId={item.id}
                onAddExistingSystemSoftware={() => handleOpenAddExistingSheet("system-software")}
              />
            )}
          </TabsContent>

          <TabsContent value="flows" className="flex min-h-0 flex-1 flex-col mt-4">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Flows tab content</div>
            </Card>
          </TabsContent>
          
          <TabsContent value="solutions" className="flex min-h-0 flex-1 flex-col mt-4">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Solutions tab content</div>
            </Card>
          </TabsContent>

          <TabsContent value="schemas" className="flex min-h-0 flex-1 flex-col mt-4">
            <Card className="flex min-h-0 flex-1 flex-col p-6">
              <div className="text-muted-foreground">Schemas tab content</div>
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
              {tr("action.save", "Save")}
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


