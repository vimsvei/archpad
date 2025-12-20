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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ApplicationComponentForm, type ApplicationComponentFormValues } from "@/components/archimate/application-component/application-component-form"
import {
  useGetApplicationComponentQuery,
  useUpdateApplicationComponentMutation,
} from "@/store/apis/application-component-api"

type ApplicationComponentEditPageProps = {
  id: string
}

export function ApplicationComponentEditPage({ id }: ApplicationComponentEditPageProps) {
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

  const normalize = React.useCallback((v: ApplicationComponentFormValues) => {
    return {
      code: v.code.trim(),
      name: v.name.trim(),
      description: v.description.trim(),
    }
  }, [])

  const baselineRef = React.useRef<ReturnType<typeof normalize> | null>(null)
  const [draft, setDraft] = React.useState<ApplicationComponentFormValues>({
    code: "",
    name: "",
    description: "",
  })

  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [tab, setTab] = React.useState<"general" | "relations">("general")

  React.useEffect(() => {
    if (!item) return
    const initial: ApplicationComponentFormValues = {
      code: item.code ?? "",
      name: item.name ?? "",
      description: item.description ?? "",
    }
    baselineRef.current = normalize(initial)
    setDraft(initial)
  }, [item, normalize])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false
    return JSON.stringify(normalize(draft)) !== JSON.stringify(baselineRef.current)
  }, [draft, normalize])

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
  }, [draft, isDraftValid, item, normalize, tr, updateItem])

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

      <div className="flex items-center gap-2 border-b pb-2">
        <Button
          type="button"
          variant={tab === "general" ? "default" : "ghost"}
          onClick={() => setTab("general")}
        >
          {tr("tabs.general", "Общие")}
        </Button>
        <Button
          type="button"
          variant={tab === "relations" ? "default" : "ghost"}
          onClick={() => setTab("relations")}
        >
          {tr("tabs.relations", "Связи")}
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {tab === "general" ? (
          <Card className="flex min-h-0 flex-1 flex-col p-6">
            <div className="min-h-0 flex-1 overflow-auto">
              <ApplicationComponentForm
                values={draft}
                onChange={setDraft}
                submitLabel={tr("item.action.save", "Save")}
                hideActions
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
            </div>
          </Card>
        ) : (
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
        )}
      </div>

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
    </div>
  )
}


