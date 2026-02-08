"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"

import type { DirectorySlug } from "@/@types/directories"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { DirectoryItemForm, type DirectoryItemFormValues } from "@/components/directories/directory-item-form"
import { DirectoryRelationsTable } from "@/components/directories/directory-relations-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslate } from "@tolgee/react"
import { useTr } from "@/lib/i18n/use-tr"
import {
  useDeleteDirectoryItemMutation,
  useGetDirectoryItemQuery,
  useUpdateDirectoryItemMutation,
} from "@/store/apis/directory-api"

type DirectoryEditPageProps = {
  directorySlug: DirectorySlug
  id: string
}

export function DirectoryEditPage({ directorySlug, id }: DirectoryEditPageProps) {
  const { t } = useTranslate()
  const router = useRouter()
  const meta = getDirectoryMeta(directorySlug)
  const title = t(meta.titleKey)
  const {
    data: item,
    error,
    isLoading,
    isFetching,
  } = useGetDirectoryItemQuery({ slug: directorySlug, id }, { refetchOnMountOrArgChange: true })

  const [updateItem, updateState] = useUpdateDirectoryItemMutation()
  const [deleteItem, deleteState] = useDeleteDirectoryItemMutation()

  const tr = useTr()

  const backHref = `/directories/${directorySlug}`

  const normalize = React.useCallback((v: DirectoryItemFormValues) => {
    const color = v.color.trim()
    return {
      code: v.code.trim(),
      name: v.name.trim(),
      description: v.description.trim(),
      color: color ? color.toLowerCase() : "",
      byDefault: Boolean(v.byDefault),
    }
  }, [])

  const baselineRef = React.useRef<ReturnType<typeof normalize> | null>(null)
  const [draft, setDraft] = React.useState<DirectoryItemFormValues>({
    code: "",
    name: "",
    description: "",
    color: "",
    byDefault: false,
  })
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [tab, setTab] = React.useState<"general" | "relations">("general")

  React.useEffect(() => {
    if (!item) return
    const initial: DirectoryItemFormValues = {
      code: item.code ?? "",
      name: item.name ?? "",
      description: item.description ?? "",
      color: item.color ?? "",
      byDefault: Boolean(item.byDefault),
    }
    baselineRef.current = normalize(initial)
    setDraft(initial)
  }, [item, normalize])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false
    const cur = normalize(draft)
    return JSON.stringify(cur) !== JSON.stringify(baselineRef.current)
  }, [draft, normalize])

  const isDraftValid = React.useMemo(() => {
    return Boolean(draft.name.trim())
  }, [draft.name])

  const formId = `directory-edit-form-${directorySlug}-${id}`

  const goBack = React.useCallback(() => {
    router.push(backHref)
  }, [router, backHref])

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
      toast.error(tr("form.invalid"))
      return
    }
    const normalized = normalize(draft)
    await updateItem({
      slug: directorySlug,
      id: item.id,
      input: { ...normalized, code: normalized.code ? normalized.code : undefined },
    }).unwrap()
    toast.success(tr("action.saved"))
    // Update baseline so Back won't ask again.
    baselineRef.current = normalize(draft)
  }, [draft, directorySlug, isDraftValid, item, normalize, tr, updateItem])

  if (isLoading || isFetching) {
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
          <h1 className="text-2xl font-semibold">{title}</h1>
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
                aria-label={tr("action.back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
        <Card className="p-6">
          <div className="text-muted-foreground">
            {(error as any)?.message ?? "Item not found."}
          </div>
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
                aria-label={tr("action.back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.back")}</TooltipContent>
          </Tooltip>
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              {title}: {item.name}
            </h1>
            <p className="text-muted-foreground text-sm">ID: {item.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="text-destructive border-destructive/40 hover:bg-destructive/10"
                size="icon"
                aria-label={tr("action.delete")}
                onClick={() => {
                  const ok = window.confirm("Delete this item?")
                  if (!ok) return
                  void (async () => {
                    try {
                      await deleteItem({ slug: directorySlug, id: item.id }).unwrap()
                      toast.success(tr("action.deleted"))
                      goBack()
                    } catch (e: any) {
                      toast.error(e?.message ?? tr("action.delete.failed"))
                    }
                  })()
                }}
                disabled={deleteState.isLoading}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.delete")}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                aria-label={tr("action.save")}
                onClick={() => void handleSave()}
                disabled={!isDirty || updateState.isLoading || !isDraftValid}
              >
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("action.save")}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b pb-2">
        <Button
          type="button"
          variant={tab === "general" ? "default" : "ghost"}
          onClick={() => setTab("general")}
        >
          {tr("tabs.general")}
        </Button>
        <Button
          type="button"
          variant={tab === "relations" ? "default" : "ghost"}
          onClick={() => setTab("relations")}
        >
          {tr("tabs.relations")}
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        {tab === "general" ? (
          <Card className="flex min-h-0 flex-1 flex-col p-6">
            <div className="min-h-0 flex-1 overflow-auto">
              <DirectoryItemForm
                formId={formId}
                values={draft}
                onChange={setDraft}
                i18nPrefix="item"
                submitLabel={tr("action.save")}
                hideActions
                disabled={updateState.isLoading}
                onSubmit={async (values) => {
                  try {
                    const normalized = normalize(values)
                    await updateItem({
                      slug: directorySlug,
                      id: item.id,
                      input: { ...normalized, code: normalized.code ? normalized.code : undefined },
                    }).unwrap()
                    toast.success(tr("action.saved"))
                    baselineRef.current = normalize(values)
                  } catch (e: any) {
                    toast.error(e?.message ?? tr("action.save.failed"))
                  }
                }}
              />
            </div>
          </Card>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <DirectoryRelationsTable sourceDirectorySlug={directorySlug} sourceItemId={item.id} />
          </div>
        )}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tr("dialog.unsaved.title")}</DialogTitle>
            <DialogDescription>
              {tr("dialog.unsaved.description")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              {tr("action.cancel")}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setConfirmOpen(false)
                goBack()
              }}
            >
              {tr("action.discard")}
            </Button>
            <Button
              onClick={() => {
                void (async () => {
                  try {
                    await handleSave()
                    setConfirmOpen(false)
                    goBack()
                  } catch (e: any) {
                    toast.error(e?.message ?? tr("action.save.failed"))
                  }
                })()
              }}
              disabled={updateState.isLoading || !isDraftValid}
            >
              {tr("action.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

