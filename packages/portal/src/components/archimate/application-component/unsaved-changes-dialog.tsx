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

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )

  const handleSave = React.useCallback(async () => {
    await onSave()
  }, [onSave])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{tr("dialog.unsaved-changes.title", "Несохраненные изменения")}</DialogTitle>
          <DialogDescription>
            {t("dialog.unsaved-changes.description", {
              defaultValue: `У компонента "${componentName}" есть несохраненные изменения. Сохранить изменения перед выходом?`,
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
            {tr("action.cancel", "Отмена")}
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !isValid}
          >
            {isSaving ? (
              <>
                <Spinner className="h-4 w-4 mr-2" />
                {tr("action.saving", "Сохранение...")}
              </>
            ) : (
              tr("action.save", "Сохранить")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

