"use client"

import * as React from "react"
import Link from "next/link"

import type { DirectorySlug } from "@/components/directories/types"
import { getDirectoryMeta } from "@/components/directories/directory-meta"
import { deleteDirectoryItem, updateDirectoryItem, useDirectoryItems } from "@/components/directories/storage"
import { DirectoryItemForm } from "@/components/directories/directory-item-form"
import { DirectoryRelationsTable } from "@/components/directories/directory-relations-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type DirectoryEditPageProps = {
  directorySlug: DirectorySlug
  id: string
}

export function DirectoryEditPage({ directorySlug, id }: DirectoryEditPageProps) {
  const meta = getDirectoryMeta(directorySlug)
  const items = useDirectoryItems(directorySlug)
  const item = React.useMemo(() => items.find((x) => x.id === id) ?? null, [items, id])

  if (!item) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{meta.title}</h1>
          <Button asChild variant="outline">
            <Link href={`/directories/${directorySlug}`}>Back</Link>
          </Button>
        </div>
        <Card className="p-6">
          <div className="text-muted-foreground">Item not found.</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">
            {meta.title}: {item.name}
          </h1>
          <p className="text-muted-foreground text-sm">ID: {item.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/directories/${directorySlug}`}>Back</Link>
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              const ok = window.confirm("Delete this item?")
              if (!ok) return
              deleteDirectoryItem(directorySlug, item.id)
              window.location.href = `/directories/${directorySlug}`
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <DirectoryItemForm
          initialValues={{
            code: item.code,
            name: item.name,
            description: item.description ?? "",
            color: item.color ?? "",
            byDefault: item.byDefault,
          }}
          submitLabel="Save"
          onSubmit={(values) => {
            updateDirectoryItem(directorySlug, item.id, values)
          }}
        />
      </Card>

      <DirectoryRelationsTable sourceDirectorySlug={directorySlug} sourceItemId={item.id} />
    </div>
  )
}

