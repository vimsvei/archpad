"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import type { DirectorySlug } from "@/components/directories/types"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { createDirectoryItem, deleteDirectoryItem, useDirectoryItems } from "@/components/directories/storage"
import { DirectoryDataTable } from "@/components/directories/directory-data-table"
import { DirectoryItemForm } from "@/components/directories/directory-item-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslate } from "@tolgee/react"
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
  const items = useDirectoryItems(directorySlug)
  const [open, setOpen] = React.useState(false)

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
            data={items}
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
              onSubmit={(values) => {
                createDirectoryItem(directorySlug, values)
                setOpen(false)
              }}
              onCancel={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

