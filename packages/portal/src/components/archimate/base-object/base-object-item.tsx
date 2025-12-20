"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import type { BaseObjectValues } from "@/components/archimate/base-object/base-object-types"

type BaseObjectItemProps = {
  values: BaseObjectValues
  onChange: (values: BaseObjectValues) => void
  submitLabel?: string
  disabled?: boolean
  hideActions?: boolean
  onSubmit: (values: BaseObjectValues) => void | Promise<void>
}

export function BaseObjectItem({
  values,
  onChange,
  submitLabel,
  disabled,
  hideActions,
  onSubmit,
}: BaseObjectItemProps) {
  const { t } = useTranslate()

  const [touched, setTouched] = React.useState(false)
  const codeTrimmed = values.code.trim()
  const nameTrimmed = values.name.trim()
  const isValid = Boolean(codeTrimmed) && Boolean(nameTrimmed)

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
          description: values.description.trim(),
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="base-object-edit-code">{t("table.code")}</Label>
        <Input
          id="base-object-edit-code"
          value={values.code}
          onChange={(e) => onChange({ ...values, code: e.target.value })}
          aria-invalid={touched && !codeTrimmed ? true : undefined}
          autoComplete="off"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="base-object-edit-name">{t("table.name")}</Label>
        <Input
          id="base-object-edit-name"
          value={values.name}
          onChange={(e) => onChange({ ...values, name: e.target.value })}
          aria-invalid={touched && !nameTrimmed ? true : undefined}
          autoComplete="off"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="base-object-edit-description">{t("table.description")}</Label>
        <Textarea
          id="base-object-edit-description"
          value={values.description}
          onChange={(e) => onChange({ ...values, description: e.target.value })}
          disabled={disabled}
        />
      </div>

      {!hideActions ? (
        <div className="flex items-center justify-end gap-2">
          <Button type="submit" disabled={!isValid || disabled}>
            {submitLabel ?? t("action.save")}
          </Button>
        </div>
      ) : null}
    </form>
  )
}


