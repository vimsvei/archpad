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

type DirectoryItemFormProps = {
  initialValues?: Partial<DirectoryItemFormValues>
  /** i18n prefix like "create.item" or "edit.item" */
  i18nPrefix: string
  submitLabel: string
  onSubmit: (values: DirectoryItemFormValues) => void
  onCancel?: () => void
}

export function DirectoryItemForm({
  initialValues,
  i18nPrefix,
  submitLabel,
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
  const [code, setCode] = React.useState(initialValues?.code ?? "")
  const [name, setName] = React.useState(initialValues?.name ?? "")
  const [description, setDescription] = React.useState(initialValues?.description ?? "")
  const [color, setColor] = React.useState(initialValues?.color ?? "")
  const [byDefault, setByDefault] = React.useState(Boolean(initialValues?.byDefault))
  const [touched, setTouched] = React.useState(false)

  const codeTrimmed = code.trim()
  const nameTrimmed = name.trim()
  const isValid = Boolean(codeTrimmed && nameTrimmed)

  const colorPickerValue = React.useMemo(() => {
    const m = color.trim().match(/^#([0-9a-fA-F]{6})$/)
    return m ? `#${m[1]!.toLowerCase()}` : "#000000"
  }, [color])

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        setTouched(true)
        if (!isValid) return
        onSubmit({
          code: codeTrimmed,
          name: nameTrimmed,
          description: description.trim(),
          color: color.trim(),
          byDefault,
        })
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="directory-code">{tr(`${i18nPrefix}.code`, "Code")}</Label>
        <Input
          id="directory-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-invalid={touched && !codeTrimmed ? true : undefined}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-name">{tr(`${i18nPrefix}.name`, "Name")}</Label>
        <Input
          id="directory-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={touched && !nameTrimmed ? true : undefined}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-description">{tr(`${i18nPrefix}.description`, "Description")}</Label>
        <Textarea
          id="directory-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-color">{tr(`${i18nPrefix}.color`, "Color")}</Label>
        <div className="flex items-center gap-2">
          <Input
            aria-label={tr(`${i18nPrefix}.color`, "Color")}
            type="color"
            value={colorPickerValue}
            onChange={(e) => setColor(e.target.value)}
            className="w-12 px-1"
          />
          <Input
            id="directory-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#RRGGBB"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="directory-by-default"
          checked={byDefault}
          onCheckedChange={(v) => setByDefault(Boolean(v))}
        />
        <Label htmlFor="directory-by-default">{tr(`${i18nPrefix}.by-default`, "By default")}</Label>
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            {tr("action.cancel", "Cancel")}
          </Button>
        ) : null}
        <Button type="submit" disabled={!isValid}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

