"use client"

import * as React from "react"
import { Plus, RefreshCcw } from "lucide-react"
import { toast } from "sonner"

import type { DirectorySlug } from "@/@types/directories"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { DirectoryDataTable } from "@/components/directories/directory-data-table"
import { DirectoryItemForm } from "@/components/directories/directory-item-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslate } from "@tolgee/react"
import {
  useDeleteDirectoryItemMutation,
  useGetDirectoryItemsQuery,
  useCreateDirectoryItemMutation,
} from "@/store/apis/directory-api"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type DirectoryListPageProps = {
  directorySlug: DirectorySlug
}

export function DirectoryListPage({ directorySlug }: DirectoryListPageProps) {
  const { t } = useTranslate()
  const meta = getDirectoryMeta(directorySlug)
  const title = t(meta.titleKey)
  const [open, setOpen] = React.useState(false)

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  const formatNowWithTz = React.useCallback(() => {
    try {
      return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }).format(new Date())
    } catch {
      return new Date().toString()
    }
  }, [])

  const {
    data: remoteItems,
    error: remoteError,
    refetch,
    isLoading,
    isFetching,
  } = useGetDirectoryItemsQuery(directorySlug)

  const [createItem, createState] = useCreateDirectoryItemMutation()
  const [deleteItem] = useDeleteDirectoryItemMutation()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <Card className="p-4">
          <DirectoryDataTable
            directorySlug={directorySlug}
            data={remoteItems ?? []}
            loading={isLoading || isFetching}
            toolbarActions={
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      aria-label={tr("action.refresh", "Refresh")}
                      onClick={() => void refetch()}
                      disabled={isFetching}
                    >
                      <RefreshCcw />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{tr("action.refresh", "Refresh")}</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                      <Button size="icon" aria-label={tr("action.create", "Create")}>
                        <Plus />
                      </Button>
                    </SheetTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{tr("action.create", "Create")}</TooltipContent>
                </Tooltip>
              </div>
            }
            onDelete={(id) => {
              const ok = window.confirm("Delete this item?")
              if (!ok) return
              void (async () => {
                try {
                  await deleteItem({ slug: directorySlug, id }).unwrap()
                  toast.success("Deleted")
                } catch (e: any) {
                  toast.error(e?.message ?? "Failed to delete")
                }
              })()
            }}
          />
          {remoteError ? (
            <div className="text-destructive mt-2 text-sm">
              {(remoteError as any)?.message ?? "Failed to load directory items"}
            </div>
          ) : null}
        </Card>

        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{t("create.item")}</SheetTitle>
            <SheetDescription>{title}</SheetDescription>
          </SheetHeader>
          <div className="px-4 pb-4">
            <DirectoryItemForm
              i18nPrefix="item"
              submitLabel={t("action.create")}
              disabled={createState.isLoading}
              onSubmit={async (values) => {
                try {
                  setOpen(false)
                  await createItem({ slug: directorySlug, input: values }).unwrap()
                  toast.success(`${tr("directory.item.created", "Created")} ${title}`, {
                    description: formatNowWithTz(),
                    className:
                      "border-emerald-600 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-50",
                  })
                } catch (e: any) {
                  setOpen(false)
                  toast.error(
                    `${tr(
                      "directory.item.error",
                      tr("ditectory.item.error", "Error")
                    )} ${title}`,
                    {
                      className:
                        "border-red-600 bg-red-50 text-red-950 dark:border-red-500 dark:bg-red-950 dark:text-red-50",
                    }
                  )
                } finally {
                  // Explicit refetch as requested (even though invalidation should update it automatically).
                  void refetch()
                }
              }}
              onCancel={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

