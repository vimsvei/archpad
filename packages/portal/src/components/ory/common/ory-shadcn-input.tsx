'use client'

import { OryInput } from '@/components/ory/common/ory-input'
import { getDevDefaultValue } from './dev-defaults'

export function OryShadcnInput(props: any) {
  // Render native inputs and rely on HTML form serialization by `name`.
  const { attributes, onClick } = props ?? {}
  const type = attributes?.type
  const name = attributes?.name as string | undefined

  if (type === 'hidden') {
    return <input type="hidden" name={name} value={attributes?.value ?? ''} />
  }

  if (type === 'checkbox') {
    const attrVal = attributes?.value
    const isDev = process.env.NODE_ENV !== 'production'
    const defaultChecked =
      typeof attrVal === 'boolean'
        ? attrVal
        : isDev && name === 'traits.accepted_tos'
          ? true
          : Boolean(attrVal)

    return (
      <input
        id={name}
        name={name}
        type="checkbox"
        value="true"
        defaultChecked={defaultChecked}
        disabled={attributes?.disabled}
        required={attributes?.required}
        onClick={onClick}
        className="h-4 w-4 rounded border border-input bg-transparent"
      />
    )
  }

  return (
    <OryInput
      id={name}
      name={name}
      type={type}
      defaultValue={
        typeof attributes?.value === 'string' && attributes.value.length > 0
          ? attributes.value
          : (getDevDefaultValue(name) ?? (attributes?.value ?? ''))
      }
      required={attributes?.required}
      disabled={attributes?.disabled}
      autoComplete={attributes?.autocomplete}
      pattern={attributes?.pattern}
      inputMode={attributes?.inputmode}
      placeholder={attributes?.placeholder}
      onClick={onClick}
    />
  )
}

