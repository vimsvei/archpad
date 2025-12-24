'use client'

import { useTranslate } from '@tolgee/react'

import { Button } from '@/components/ui/button'
import { getNodeLabel } from './utils'

export function OryShadcnButton(props: any) {
  const { t } = useTranslate()
  const { attributes, node } = props ?? {}
  const label = getNodeLabel(node) ?? attributes?.value ?? t('auth.continue', 'Continue')

  return (
    <Button
      type={attributes?.type ?? 'submit'}
      name={attributes?.name}
      value={attributes?.value}
      disabled={attributes?.disabled}
      className="w-full"
    >
      {label}
    </Button>
  )
}

