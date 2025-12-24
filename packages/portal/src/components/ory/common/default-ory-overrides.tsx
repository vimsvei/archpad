'use client'

import type { OryFlowComponentOverrides } from '@ory/elements-react'

import { cn } from '@/lib/utils'
import { FragmentCardRoot } from './fragment-card-root'
import { OryShadcnInput } from './ory-shadcn-input'
import { OryShadcnButton } from './ory-shadcn-button'
import { OryShadcnLabel } from './ory-shadcn-label'
import { OryShadcnAnchor } from './ory-shadcn-anchor'
import { OryNativeFormRoot } from './ory-native-form-root'

export const defaultOryOverrides: OryFlowComponentOverrides = {
  // We already wrap pages in our own Card layout (AuthFormWrapper),
  // so we strip Ory's card wrappers to avoid nested cards.
  Card: {
    Root: FragmentCardRoot,
    // Hide Ory's default header (we render our own Tolgee heading above the flow).
    Header: FragmentCardRoot,
    Content: FragmentCardRoot,
    // Disable Ory's default footer to avoid absolute localhost links.
    // We render our own localized footer links in each flow component.
    Footer: FragmentCardRoot,
  },
  Node: {
    Input: OryShadcnInput,
    Button: OryShadcnButton,
    Label: OryShadcnLabel,
    Anchor: OryShadcnAnchor,
  },
  Form: {
    Root: (props: any) => <OryNativeFormRoot {...props} />,
    Group: ({ className, children, ...rest }: any) => (
      <div className={cn('grid gap-4', className)} {...rest}>
        {children}
      </div>
    ),
  },
}

