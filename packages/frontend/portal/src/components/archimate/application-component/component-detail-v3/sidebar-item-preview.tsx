"use client"

import * as React from "react"
import Link from "next/link"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { MarkdownViewer } from "@/components/shared/markdown-viewer"
import type { RelationGroupItem } from "@/components/shared/archimate/relation-group"

export type SidebarItemPreviewProps = {
  t: (key: string) => string
  item: RelationGroupItem
  editPath: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * Read-only mini-form shown in the right drawer when "Просмотр" is selected.
 * Displays name, code, description. Cannot be edited.
 */
export function SidebarItemPreview({
  t,
  item,
  editPath,
  open,
  onOpenChange,
}: SidebarItemPreviewProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t("item.action.view")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 flex-1 min-h-0 pt-4 px-4 overflow-y-auto">
          <div className="grid gap-2">
            <Label className="text-xs text-muted-foreground">{t("table.name")}</Label>
            <div className="text-sm font-medium text-foreground">{item.name}</div>
          </div>
          <div className="grid gap-2">
            <Label className="text-xs text-muted-foreground">{t("table.code")}</Label>
            <div className="text-sm font-mono text-foreground">{item.code}</div>
          </div>
          {item.description && (
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">{t("item.description")}</Label>
              <div className="text-sm text-foreground prose prose-sm dark:prose-invert max-w-none">
                <MarkdownViewer content={item.description} />
              </div>
            </div>
          )}
        </div>
        <SheetFooter className="flex-row justify-end px-4 pb-4">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link href={editPath} className="flex items-center justify-center gap-2">
              <Pencil className="size-4" />
              {t("action.edit")}
            </Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
