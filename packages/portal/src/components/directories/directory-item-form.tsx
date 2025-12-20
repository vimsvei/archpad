"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

type DirectoryItemFormValues = {
  code: string
  name: string
  description: string
  color: string
  byDefault: boolean
}

export type { DirectoryItemFormValues }

type DirectoryItemFormProps = {
  formId?: string
  /**
   * Create-mode: use initialValues (uncontrolled, internal state).
   * Edit-mode: use values+onChange (controlled, external state).
   */
  initialValues?: Partial<DirectoryItemFormValues>
  values?: DirectoryItemFormValues
  onChange?: (values: DirectoryItemFormValues) => void
  /** i18n prefix like "create.item" or "edit.item" */
  i18nPrefix: string
  submitLabel: string
  disabled?: boolean
  hideActions?: boolean
  onSubmit: (values: DirectoryItemFormValues) => void | Promise<void>
  onCancel?: () => void
}

export function DirectoryItemForm({
  formId,
  initialValues,
  values,
  onChange,
  i18nPrefix,
  submitLabel,
  disabled,
  hideActions,
  onSubmit,
  onCancel,
}: DirectoryItemFormProps) {
  const { t } = useTranslate()

  const tr = React.useCallback(
    (key: string, fallback: string) => {
      const v = t(key)
      return v === key ? fallback : v
    },
    [t]
  )
  const isControlled = values !== undefined

  const [code, setCode] = React.useState(initialValues?.code ?? "")
  const [name, setName] = React.useState(initialValues?.name ?? "")
  const [description, setDescription] = React.useState(initialValues?.description ?? "")
  const [color, setColor] = React.useState(initialValues?.color ?? "")
  const [byDefault, setByDefault] = React.useState(Boolean(initialValues?.byDefault))
  const [touched, setTouched] = React.useState(false)

  // Uncontrolled mode only: allow initialValues update (e.g. when edit page loads async and uses uncontrolled mode).
  React.useEffect(() => {
    if (isControlled) return
    if (!initialValues) return
    setCode(initialValues.code ?? "")
    setName(initialValues.name ?? "")
    setDescription(initialValues.description ?? "")
    setColor(initialValues.color ?? "")
    setByDefault(Boolean(initialValues.byDefault))
    setTouched(false)
  }, [
    isControlled,
    initialValues?.code,
    initialValues?.name,
    initialValues?.description,
    initialValues?.color,
    initialValues?.byDefault,
  ])

  const current: DirectoryItemFormValues = isControlled
    ? (values as DirectoryItemFormValues)
    : { code, name, description, color, byDefault }

  const emitChange = React.useCallback(
    (next: DirectoryItemFormValues) => {
      if (!onChange) return
      onChange(next)
    },
    [onChange]
  )

  const codeTrimmed = current.code.trim()
  const nameTrimmed = current.name.trim()
  const isValid = Boolean(nameTrimmed)

  const colorPickerValue = React.useMemo(() => {
    const m = current.color.trim().match(/^#([0-9a-fA-F]{6})$/)
    return m ? `#${m[1]!.toLowerCase()}` : "#000000"
  }, [current.color])

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
          color: current.color.trim(),
          byDefault: current.byDefault,
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="directory-code">{tr(`${i18nPrefix}.code`, "Code")}</Label>
        <Input
          id="directory-code"
          value={current.code}
          onChange={(e) => {
            const next = e.target.value
            if (isControlled) emitChange({ ...current, code: next })
            else setCode(next)
          }}
          aria-invalid={undefined}
          autoComplete="off"
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-name">{tr(`${i18nPrefix}.name`, "Name")}</Label>
        <Input
          id="directory-name"
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
        <Label htmlFor="directory-description">{tr(`${i18nPrefix}.description`, "Description")}</Label>
        <Textarea
          id="directory-description"
          value={current.description}
          onChange={(e) => {
            const next = e.target.value
            if (isControlled) emitChange({ ...current, description: next })
            else setDescription(next)
          }}
          disabled={disabled}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-color">{tr(`${i18nPrefix}.color`, "Color")}</Label>
        <div className="flex items-center gap-2">
          <Input
            aria-label={tr(`${i18nPrefix}.color`, "Color")}
            type="color"
            value={colorPickerValue}
            onChange={(e) => {
              const next = e.target.value
              if (isControlled) emitChange({ ...current, color: next })
              else setColor(next)
            }}
            className="w-12 px-1"
            disabled={disabled}
          />
          <Input
            id="directory-color"
            value={current.color}
            onChange={(e) => {
              const next = e.target.value
              if (isControlled) emitChange({ ...current, color: next })
              else setColor(next)
            }}
            placeholder="#RRGGBB"
            autoComplete="off"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="directory-by-default"
          checked={current.byDefault}
          onCheckedChange={(v) => {
            const next = Boolean(v)
            if (isControlled) emitChange({ ...current, byDefault: next })
            else setByDefault(next)
          }}
          disabled={disabled}
        />
        <Label htmlFor="directory-by-default">{tr(`${i18nPrefix}.by-default`, "By default")}</Label>
      </div>

      {!hideActions ? (
        <div className="flex items-center justify-end gap-2">
          {onCancel ? (
            <Button type="button" variant="outline" onClick={onCancel} disabled={disabled}>
              {tr("action.cancel", "Cancel")}
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

