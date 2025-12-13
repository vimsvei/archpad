"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/directories/ui/checkbox"

type DirectoryItemFormValues = {
  code: string
  name: string
  description: string
  color: string
  byDefault: boolean
}

type DirectoryItemFormProps = {
  initialValues?: Partial<DirectoryItemFormValues>
  submitLabel: string
  onSubmit: (values: DirectoryItemFormValues) => void
  onCancel?: () => void
}

export function DirectoryItemForm({
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}: DirectoryItemFormProps) {
  const [code, setCode] = React.useState(initialValues?.code ?? "")
  const [name, setName] = React.useState(initialValues?.name ?? "")
  const [description, setDescription] = React.useState(initialValues?.description ?? "")
  const [color, setColor] = React.useState(initialValues?.color ?? "")
  const [byDefault, setByDefault] = React.useState(Boolean(initialValues?.byDefault))
  const [touched, setTouched] = React.useState(false)

  const codeTrimmed = code.trim()
  const nameTrimmed = name.trim()
  const isValid = Boolean(codeTrimmed && nameTrimmed)

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
        <Label htmlFor="directory-code">Code</Label>
        <Input
          id="directory-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-invalid={touched && !codeTrimmed ? true : undefined}
          placeholder="CODE"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-name">Name</Label>
        <Input
          id="directory-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={touched && !nameTrimmed ? true : undefined}
          placeholder="Name"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-description">Description</Label>
        <Textarea
          id="directory-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="directory-color">Color</Label>
        <Input
          id="directory-color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="#RRGGBB or any css color"
          autoComplete="off"
        />
      </div>

      <div className="grid gap-2">
        <Label>Flags</Label>
        <Checkbox checked={byDefault} onChange={(e) => setByDefault(e.currentTarget.checked)} label="By default" />
      </div>

      <div className="flex items-center justify-end gap-2">
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" disabled={!isValid}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}

