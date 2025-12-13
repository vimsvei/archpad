"use client"

import * as React from "react"

import type { DirectorySlug } from "@/components/directories/types"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { createDirectoryItem, deleteDirectoryItem, useDirectoryItems } from "@/components/directories/storage"
import { DirectoryDataTable } from "@/components/directories/directory-data-table"
import { DirectoryItemForm } from "@/components/directories/directory-item-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
  const meta = getDirectoryMeta(directorySlug)
  const items = useDirectoryItems(directorySlug)
  const [open, setOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{meta.title}</h1>
          {meta.description ? <p className="text-muted-foreground text-sm">{meta.description}</p> : null}
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button>Create</Button>
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Create item</SheetTitle>
              <SheetDescription>{meta.title}</SheetDescription>
            </SheetHeader>
            <div className="px-4 pb-4">
              <DirectoryItemForm
                submitLabel="Create"
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

      <Card className="p-4">
        <DirectoryDataTable
          directorySlug={directorySlug}
          data={items}
          onDelete={(id) => {
            const ok = window.confirm("Delete this item?")
            if (!ok) return
            deleteDirectoryItem(directorySlug, id)
          }}
        />
      </Card>
    </div>
  )
}

