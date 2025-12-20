"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import type { BaseObjectValues } from "@/components/archimate/base-object/base-object-types"

type BaseObjectNewItemProps = {
  submitLabel?: string
  requireCode?: boolean
  disabled?: boolean
  onSubmit: (values: BaseObjectValues) => void | Promise<void>
  onCancel?: () => void
}

export function BaseObjectNewItem({
  submitLabel,
  requireCode = true,
  disabled,
  onSubmit,
  onCancel,
}: BaseObjectNewItemProps) {
  const { t } = useTranslate()

  const [code, setCode] = React.useState("")
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [touched, setTouched] = React.useState(false)

  const codeTrimmed = code.trim()
  const nameTrimmed = name.trim()
  const isValid = (requireCode ? Boolean(codeTrimmed) : true) && Boolean(nameTrimmed)

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (disabled) return
        setTouched(true)
        if (!isValid) return
        void onSubmit({
          code: codeTrimmed,
          name: nameTrimmed,
          description: description.trim(),
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="base-object-code">{t("table.code")}</Label>
        <Input
          id="base-object-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-invalid={requireCode && touched && !codeTrimmed ? true : undefined}
          autoComplete="off"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="base-object-name">{t("table.name")}</Label>
        <Input
          id="base-object-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={touched && !nameTrimmed ? true : undefined}
          autoComplete="off"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="base-object-description">{t("table.description")}</Label>
        <Textarea
          id="base-object-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel} disabled={disabled}>
            {t("action.cancel")}
          </Button>
        ) : null}
        <Button type="submit" disabled={!isValid || disabled}>
          {submitLabel ?? t("action.create")}
        </Button>
      </div>
    </form>
  )
}


