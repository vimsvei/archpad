"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type UnsavedChangesDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  componentName: string
  isSaving: boolean
  isValid: boolean
  onCancel: () => void
  onSave: () => Promise<void>
}

export function UnsavedChangesDialog({
  open,
  onOpenChange,
  componentName,
  isSaving,
  isValid,
  onCancel,
  onSave,
}: UnsavedChangesDialogProps) {
  const { t } = useTranslate()

  const handleSave = React.useCallback(async () => {
    await onSave()
  }, [onSave])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("dialog.unsaved-changes.title")}</DialogTitle>
          <DialogDescription>
            {t("dialog.unsaved-changes.description", {
              component: componentName,
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
          >
            {t("action.cancel")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !isValid}
          >
            {isSaving ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                {t("action.saving")}
              </>
            ) : (
              t("action.save")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

