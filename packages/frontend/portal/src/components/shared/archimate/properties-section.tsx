"use client"

import {
  DEFAULT_PROPERTY_FIELD_CLASS,
  PropertyInputField,
  PropertySelectField,
  type SelectFieldOption,
} from "@/components/shared/archimate/property-fields"

type PropertiesInputField = {
  kind: "input"
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

type PropertiesSelectField = {
  kind: "select"
  id: string
  label: string
  value: string
  options: SelectFieldOption[]
  onValueChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export type PropertiesSectionField = PropertiesInputField | PropertiesSelectField

type PropertiesSectionProps = {
  title: string
  fields: PropertiesSectionField[]
  defaultFieldClassName?: string
}

export function PropertiesSection({
  title,
  fields,
  defaultFieldClassName = DEFAULT_PROPERTY_FIELD_CLASS,
}: PropertiesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>

      <div className="space-y-4 w-full min-w-0">
        {fields.map((field) => {
          const className = field.className ?? defaultFieldClassName

          if (field.kind === "input") {
            return (
              <PropertyInputField
                key={field.id}
                id={field.id}
                label={field.label}
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                disabled={field.disabled}
                readOnly={field.readOnly}
                type={field.type}
                className={className}
              />
            )
          }

          return (
            <PropertySelectField
              key={field.id}
              id={field.id}
              label={field.label}
              value={field.value}
              options={field.options}
              onValueChange={field.onValueChange}
              placeholder={field.placeholder}
              disabled={field.disabled}
              className={className}
            />
          )
        })}
      </div>
    </div>
  )
}
