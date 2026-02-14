"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export type SelectFieldOption = {
  value: string
  label: string
}

export type DirectorySelectItem = {
  id: string
  name: string
}

export const DEFAULT_PROPERTY_FIELD_CLASS = "h-8 w-full min-w-0 border-border bg-background text-sm"

export function mapDirectoryItemsToSelectOptions(items: DirectorySelectItem[]): SelectFieldOption[] {
  return items.map((item) => ({ value: item.id, label: item.name }))
}

export type PropertyInputFieldProps = {
  id: string
  label: string
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  type?: string
  className?: string
}

export type PropertySelectFieldProps = {
  id: string
  label: string
  value: string
  options: SelectFieldOption[]
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function PropertyInputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  readOnly,
  type,
  className,
}: PropertyInputFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={className}
      />
    </div>
  )
}

export function PropertySelectField({
  id,
  label,
  value,
  options,
  onValueChange,
  placeholder,
  disabled,
  className,
}: PropertySelectFieldProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger id={id} className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
