"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export type ApplicationComponentFormValues = {
  code: string
  name: string
  description: string
}

type ApplicationComponentFormProps = {
  formId?: string
  initialValues?: Partial<ApplicationComponentFormValues>
  values?: ApplicationComponentFormValues
  onChange?: (values: ApplicationComponentFormValues) => void
  submitLabel: string
  disabled?: boolean
  hideActions?: boolean
  onSubmit: (values: ApplicationComponentFormValues) => void | Promise<void>
  onCancel?: () => void
}

export function ApplicationComponentForm({
  formId,
  initialValues,
  values,
  onChange,
  submitLabel,
  disabled,
  hideActions,
  onSubmit,
  onCancel,
}: ApplicationComponentFormProps) {
  const { t } = useTranslate()
  const isControlled = values !== undefined

  const [code, setCode] = React.useState(initialValues?.code ?? "")
  const [name, setName] = React.useState(initialValues?.name ?? "")
  const [description, setDescription] = React.useState(initialValues?.description ?? "")
  const [touched, setTouched] = React.useState(false)

  React.useEffect(() => {
    if (isControlled) return
    if (!initialValues) return
    setCode(initialValues.code ?? "")
    setName(initialValues.name ?? "")
    setDescription(initialValues.description ?? "")
    setTouched(false)
  }, [isControlled, initialValues?.code, initialValues?.name, initialValues?.description])

  const current: ApplicationComponentFormValues = isControlled
    ? (values as ApplicationComponentFormValues)
    : { code, name, description }

  const emitChange = React.useCallback(
    (next: ApplicationComponentFormValues) => {
      if (!onChange) return
      onChange(next)
    },
    [onChange]
  )

  const codeTrimmed = current.code.trim()
  const nameTrimmed = current.name.trim()
  const isValid = Boolean(codeTrimmed) && Boolean(nameTrimmed)

  return (
    <form
      id={formId}
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (disabled) return
        setTouched(true)
        if (!isValid) return
        void onSubmit({
          code: codeTrimmed,
          name: nameTrimmed,
          description: current.description.trim(),
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="app-component-code">{t("table.code")}</Label>
        <Input
          id="app-component-code"
          value={current.code}
          onChange={(e) => {
            const next = e.target.value
            if (isControlled) emitChange({ ...current, code: next })
            else setCode(next)
          }}
          aria-invalid={touched && !codeTrimmed ? true : undefined}
          autoComplete="off"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="app-component-name">{t("table.name")}</Label>
        <Input
          id="app-component-name"
          value={current.name}
          onChange={(e) => {
            const next = e.target.value
            if (isControlled) emitChange({ ...current, name: next })
            else setName(next)
          }}
          aria-invalid={touched && !nameTrimmed ? true : undefined}
          autoComplete="off"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="app-component-description">{t("table.description")}</Label>
        <Textarea
          id="app-component-description"
          value={current.description}
          onChange={(e) => {
            const next = e.target.value
            if (isControlled) emitChange({ ...current, description: next })
            else setDescription(next)
          }}
          disabled={disabled}
        />
      </div>

      {!hideActions ? (
        <div className="flex items-center justify-end gap-2">
          {onCancel ? (
            <Button type="button" variant="outline" onClick={onCancel} disabled={disabled}>
              {t("action.cancel")}
            </Button>
          ) : null}
          <Button type="submit" disabled={!isValid || disabled}>
            {submitLabel}
          </Button>
        </div>
      ) : null}
    </form>
  )
}


