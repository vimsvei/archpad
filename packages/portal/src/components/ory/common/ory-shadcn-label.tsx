'use client'

import Link from 'next/link'
import { useTranslate } from '@tolgee/react'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { getNodeLabel, getFallbackLabel } from './utils'

export function OryShadcnLabel(props: any) {
  const { t } = useTranslate()
  const { attributes, node, children, className, ...rest } = props ?? {}
  const label = getNodeLabel(node)
  const fallbackLabel = !label ? getFallbackLabel(attributes, t) : undefined

  // This label wrapper is also used for hidden/internal nodes (e.g. `method`).
  // Render only children for those so we don't show stray "Method" labels.
  if (
    attributes?.type === 'hidden' ||
    attributes?.name === 'method' ||
    attributes?.name === 'csrf_token'
  ) {
    return <>{children}</>
  }

  const isPasswordField =
    attributes?.type === 'password' ||
    (typeof attributes?.name === 'string' && attributes.name.toLowerCase().includes('password'))

  const forgotPasswordText = t('auth.forgot_password', 'Forgot password?')

  return (
    <div className={cn('grid gap-2', className)}>
      {label || fallbackLabel ? (
        <div className="flex items-center">
          <Label htmlFor={attributes?.name} {...rest}>
            {label ?? fallbackLabel}
          </Label>
          {isPasswordField ? (
            <Link href="/recovery" className="ml-auto text-sm underline-offset-4 hover:underline">
              {forgotPasswordText}
            </Link>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  )
}

