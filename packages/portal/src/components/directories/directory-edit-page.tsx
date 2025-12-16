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

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

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
    return Boolean(draft.code.trim() && draft.name.trim())
  }, [draft.code, draft.name])

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
      toast.error(tr("form.invalid", "Please fill required fields"))
      return
    }
    await updateItem({ slug: directorySlug, id: item.id, input: draft }).unwrap()
    toast.success(tr("action.saved", "Saved"))
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
                aria-label={tr("item.action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("item.action.back", "Back")}</TooltipContent>
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
                aria-label={tr("item.action.back", "Back")}
                onClick={handleBack}
              >
                <ArrowLeft />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("item.action.back", "Back")}</TooltipContent>
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
    <div className="flex flex-col gap-6">
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
                aria-label={tr("item.action.delete", "Delete")}
                onClick={() => {
                  const ok = window.confirm("Delete this item?")
                  if (!ok) return
                  void (async () => {
                    try {
                      await deleteItem({ slug: directorySlug, id: item.id }).unwrap()
                      toast.success(tr("action.deleted", "Deleted"))
                      goBack()
                    } catch (e: any) {
                      toast.error(e?.message ?? tr("action.deleteFailed", "Failed to delete"))
                    }
                  })()
                }}
                disabled={deleteState.isLoading}
              >
                <Trash2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{tr("item.action.delete", "Delete")}</TooltipContent>
          </Tooltip>

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

      <Card className="p-6">
        <DirectoryItemForm
          formId={formId}
          values={draft}
          onChange={setDraft}
          i18nPrefix="item"
          submitLabel={tr("item.action.save", "Save")}
          hideActions
          disabled={updateState.isLoading}
          onSubmit={async (values) => {
            try {
              await updateItem({ slug: directorySlug, id: item.id, input: values }).unwrap()
              toast.success(tr("action.saved", "Saved"))
              baselineRef.current = normalize(values)
            } catch (e: any) {
              toast.error(e?.message ?? tr("action.saveFailed", "Failed to save"))
            }
          }}
        />
      </Card>

      <DirectoryRelationsTable sourceDirectorySlug={directorySlug} sourceItemId={item.id} />

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

