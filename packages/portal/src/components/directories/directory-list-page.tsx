"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import type { DirectorySlug } from "@/types/directories"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { deleteDirectoryItem } from "@/components/directories/storage"
import { useDirectoryItems } from "@/hooks/use-directory-items"
import { DirectoryDataTable } from "@/components/directories/directory-data-table"
import { DirectoryItemForm } from "@/components/directories/directory-item-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslate } from "@tolgee/react"
import { useApi } from "@/components/providers/api-provider"
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
  const api = useApi()
  const meta = getDirectoryMeta(directorySlug)
  const title = t(meta.titleKey)
  const localItems = useDirectoryItems(directorySlug)
  const [remoteItems, setRemoteItems] = React.useState(localItems)
  const [remoteError, setRemoteError] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false
    async function run() {
      if (!meta.kind) {
        setRemoteItems(localItems)
        return
      }
      try {
        setRemoteError(null)
        const data = await api.directories.fetchDirectoryItemsByKind(meta.kind)
        if (!cancelled) setRemoteItems(data)
      } catch (e: any) {
        if (!cancelled) {
          setRemoteError(e?.message ?? "Failed to load directory items")
          setRemoteItems(localItems)
        }
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [meta.kind, localItems])

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
            data={remoteItems}
            toolbarActions={
              <SheetTrigger asChild>
                <Button size="icon" aria-label={t("action.create")}>
                  <Plus />
                </Button>
              </SheetTrigger>
            }
            onDelete={(id) => {
              const ok = window.confirm("Delete this item?")
              if (!ok) return
              deleteDirectoryItem(directorySlug, id)
            }}
          />
          {remoteError ? (
            <div className="text-destructive mt-2 text-sm">{remoteError}</div>
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
              disabled={saving}
              onSubmit={async (values) => {
                if (!meta.kind) return
                setSaving(true)
                try {
                  setRemoteError(null)
                  await api.directories.createDirectoryItem(directorySlug, values)
                  const data = await api.directories.fetchDirectoryItemsByKind(meta.kind)
                  setRemoteItems(data)
                  setOpen(false)
                } catch (e: any) {
                  setRemoteError(e?.message ?? "Failed to create directory item")
                } finally {
                  setSaving(false)
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

