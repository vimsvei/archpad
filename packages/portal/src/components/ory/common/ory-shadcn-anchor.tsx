'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { normalizeAnchorHref, getNodeLabel } from './utils'

export function OryShadcnAnchor(props: any) {
  const { attributes, node, className, ...rest } = props ?? {}
  const hrefRaw = attributes?.href as string | undefined
  if (!hrefRaw) return null

  const href = normalizeAnchorHref(hrefRaw)
  const text =
    getNodeLabel(node) ??
    (typeof attributes?.title === 'string' ? attributes.title : undefined) ??
    href

  return (
    <Link href={href} className={cn('text-sm underline-offset-4 hover:underline', className)} {...rest}>
      {text}
    </Link>
  )
}

