"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export type NamedObjectDraft = {
  code: string
  name: string
  description: string
}

type CreateNamedObjectSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  isSubmitting?: boolean
  draft: NamedObjectDraft
  onDraftChange: (draft: NamedObjectDraft) => void
  onSubmit: () => void
}

export function CreateNamedObjectSheet({
  open,
  onOpenChange,
  title,
  description,
  isSubmitting = false,
  draft,
  onDraftChange,
  onSubmit,
}: CreateNamedObjectSheetProps) {
  const { t } = useTranslate()

  // Only name is required; code is optional (can be auto-generated on submit).
  const canSubmit = draft.name.trim()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>
            {description ?? t("action.create.description", "Fill fields and create")}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 flex-1 min-h-0 pt-4 px-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">{t("item.code", "Code")}</label>
            <Input
              value={draft.code}
              onChange={(e) => onDraftChange({ ...draft, code: e.target.value })}
              placeholder={t("item.code.placeholder", "Code (optional)")}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">{t("item.name", "Name")}</label>
            <Input
              value={draft.name}
              onChange={(e) => onDraftChange({ ...draft, name: e.target.value })}
              placeholder={t("item.name", "Name")}
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">{t("item.description", "Description")}</label>
            <Textarea
              rows={3}
              className="resize-none"
              value={draft.description}
              onChange={(e) => onDraftChange({ ...draft, description: e.target.value })}
              placeholder={t("item.description", "Description")}
            />
          </div>
        </div>

        <SheetFooter className="flex-row justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            {t("action.cancel", "Cancel")}
          </Button>
          <Button onClick={onSubmit} disabled={!canSubmit || isSubmitting}>
            {t("action.create", "Create")}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}


