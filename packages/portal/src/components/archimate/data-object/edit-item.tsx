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
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/animate/tabs"
import type { RootState, AppDispatch } from "@/store/store"
import {
  reset,
  setSaving,
  setError,
  setSaveError,
  loadDataObject,
  updateBaseline,
  selectIsDirty,
  selectIsDraftValid,
} from "@/store/slices/data-object-edit-slice"
import {
  useGetDataObjectFullQuery,
  useUpdateDataObjectMutation,
} from "@/store/apis/data-object-api"
import { UnsavedChangesDialog } from "./unsaved-changes-dialog"
import { GeneralTab } from "./general-tab"
import { AttributesTab } from "./attributes-tab"
import { ComponentsTable } from "./components-table"
import { FunctionsTable } from "./functions-table"
import { ArchimateObjectIcon } from "@/components/archimate/archimate-object-icon"

type EditItemProps = {
  id: string
}

export function EditItem({ id }: EditItemProps) {
  const { t } = useTranslate()
  const tr = useTr()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const editState = useSelector((s: RootState) => s.dataObjectEdit)
  const isDirty = useSelector(selectIsDirty)
  const isDraftValid = useSelector(selectIsDraftValid)

  const [updateDataObject] = useUpdateDataObjectMutation()

  const { data: fullData, error: queryError, isLoading, isFetching } = useGetDataObjectFullQuery(
    { id },
    { refetchOnMountOrArgChange: true }
  )

  React.useEffect(() => {
    if (!fullData) return
    dispatch(
      loadDataObject({
        code: fullData.code,
        name: fullData.name,
        description: fullData.description ?? "",
        components: fullData.components,
        functionUsages: fullData.functionUsages,
      })
    )
  }, [fullData, dispatch])

  React.useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  const handleSave = React.useCallback(async () => {
    if (!isDraftValid) {
      const msg = tr("form.invalid")
      toast.error(msg)
      dispatch(setSaveError(msg))
      return
    }

    try {
      dispatch(setSaving(true))
      dispatch(setSaveError(null))

      const code = editState.code.trim()
      const name = editState.name.trim()
      const description = editState.description.trim()

      await updateDataObject({
        id,
        input: {
          ...(code ? { code } : {}),
          ...(name ? { name } : {}),
          ...(description ? { description } : { description: undefined }),
        },
      }).unwrap()

      dispatch(updateBaseline())
      toast.success(tr("action.saved"))
    } catch (e: any) {
      const errorMessage = e?.message ?? tr("action.saveFailed")
      dispatch(setSaveError(errorMessage))
      toast.error(errorMessage)
      throw e
    } finally {
      dispatch(setSaving(false))
    }
  }, [dispatch, editState.code, editState.description, editState.name, id, isDraftValid, tr, updateDataObject])

  const [tab, setTab] = React.useState<string>("general")

  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false)
  const [pendingNavigation, setPendingNavigation] = React.useState<(() => void) | null>(null)

  const goBack = React.useCallback(() => {
    router.push("/application/data-objects")
  }, [router])

  const handleBack = React.useCallback(() => {
    if (isDirty) {
      setPendingNavigation(() => goBack)
      setConfirmDialogOpen(true)
    } else {
      goBack()
    }
  }, [goBack, isDirty])

  const handleDialogCancel = React.useCallback(() => {
    setConfirmDialogOpen(false)
    setPendingNavigation(null)
  }, [])

  const handleDialogSave = React.useCallback(async () => {
    try {
      await handleSave()
      if (pendingNavigation) {
        setConfirmDialogOpen(false)
        pendingNavigation()
        setPendingNavigation(null)
      }
    } catch {
      // keep dialog open on error
    }
  }, [handleSave, pendingNavigation])

  const handleLinkClick = React.useCallback(
    (e: MouseEvent) => {
      if (!isDirty || confirmDialogOpen) return
      const target = e.target as HTMLElement
      if (target.nodeName !== "A" && !target.closest) return
      const link = target.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link) return
      const href = link.getAttribute("href")
      if (!href) return
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("#")) return
      const currentPath = window.location.pathname
      if (href === currentPath || href === `${currentPath}/`) return
      e.preventDefault()
      e.stopPropagation()
      setPendingNavigation(() => () => router.push(href))
      setConfirmDialogOpen(true)
    },
    [isDirty, confirmDialogOpen, router]
  )

  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    document.addEventListener("click", handleLinkClick, true)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("click", handleLinkClick, true)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isDirty, handleLinkClick])

  if (isLoading || isFetching || editState.isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={tr("action.back")} onClick={handleBack}>
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("application.data-objects")}</h1>
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

  if (queryError || editState.error || (!fullData && !editState.baseline)) {
    const errorMessage = editState.error || (queryError as any)?.message || tr("error.notFound")
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={tr("action.back")} onClick={handleBack}>
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{t("application.data-objects")}</h1>
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
              <Button variant="ghost" size="icon" aria-label={tr("action.back")} onClick={handleBack}>
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center rounded-full bg-muted p-2 shrink-0">
              <ArchimateObjectIcon type="application-data-object" className="text-foreground" size={32} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">
                {t("application.data-objects")}: {editState.name || fullData?.name}
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
              onClick={() => void handleSave()}
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
          <TabsTrigger value="general">{tr("tab.general")}</TabsTrigger>
          <TabsTrigger value="attributes">Attributes</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="functions">Functions</TabsTrigger>
        </TabsList>

        <TabsContents className="flex min-h-0 flex-1 flex-col">
          <TabsContent value="general" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <GeneralTab isSaving={editState.isSaving} />
          </TabsContent>

          <TabsContent value="attributes" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <AttributesTab />
          </TabsContent>

          <TabsContent value="components" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <ComponentsTable />
          </TabsContent>

          <TabsContent value="functions" className="flex min-h-0 flex-1 flex-col mt-4 pb-4 h-full">
            <FunctionsTable />
          </TabsContent>
        </TabsContents>
      </Tabs>

      <UnsavedChangesDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        itemName={editState.name}
        isSaving={editState.isSaving}
        isValid={isDraftValid}
        onCancel={handleDialogCancel}
        onSave={handleDialogSave}
      />

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


