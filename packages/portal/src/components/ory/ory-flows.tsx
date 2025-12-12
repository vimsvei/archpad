'use client'

import type { OryClientConfiguration, OryFlowComponentOverrides } from '@ory/elements-react'
import {
  Login,
  Recovery,
  Registration,
  Verification,
} from '@ory/elements-react/theme'
import type { ComponentProps, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslate } from '@tolgee/react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

// These components are CLIENT components. This is important because Ory Elements flow
// components are client components, and Next.js does not allow passing function
// components from Server Components to Client Components.

function FragmentCardRoot({ children }: PropsWithChildren) {
  return <>{children}</>
}

function getNodeLabel(node: any): string | undefined {
  const candidate =
    node?.meta?.label?.text ??
    node?.meta?.label?.context?.title ??
    node?.meta?.label?.context?.label

  return typeof candidate === 'string' ? candidate : undefined
}

function getFallbackLabel(
  attributes: any,
  t: (key: string, defaultValue?: string) => string
): string | undefined {
  const name = attributes?.name as string | undefined
  if (!name) return undefined

  // Never show labels for internal control fields.
  if (name === 'method' || name === 'csrf_token') return undefined

  if (name.includes('traits.email')) return t('auth.field.email', 'Email')
  if (name.includes('traits.username')) return t('auth.field.username', 'Username')
  if (name.toLowerCase().includes('password')) return t('auth.field.password', 'Password')

  // Generic fallback: last segment, prettified
  const raw = name.split('.').pop() ?? name
  const pretty = raw.replace(/_/g, ' ')
  return pretty ? pretty.charAt(0).toUpperCase() + pretty.slice(1) : undefined
}

function OryShadcnInput(props: any) {
  const { attributes } = props ?? {}
  const type = attributes?.type

  // Keep hidden inputs unstyled (csrf_token, method, etc.)
  if (type === 'hidden') {
    return (
      <input
        type="hidden"
        name={attributes?.name}
        value={attributes?.value ?? ''}
      />
    )
  }

  return (
    <Input
      id={attributes?.name}
      name={attributes?.name}
      type={type}
      defaultValue={attributes?.value ?? ''}
      required={attributes?.required}
      disabled={attributes?.disabled}
      autoComplete={
        attributes?.autocomplete ??
        (attributes?.name === 'identifier' ? 'username' : undefined)
      }
      pattern={attributes?.pattern}
      inputMode={attributes?.inputmode}
      placeholder={attributes?.placeholder}
    />
  )
}

function OryShadcnButton(props: any) {
  const { t } = useTranslate()
  const { attributes, node } = props ?? {}
  const label =
    getNodeLabel(node) ??
    attributes?.value ??
    t('auth.continue', 'Continue')

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

function OryShadcnLabel(props: any) {
  const { t } = useTranslate()
  const { attributes, node, children, className, ...rest } = props ?? {}
  const label = getNodeLabel(node)
  const fallbackLabel = !label ? getFallbackLabel(attributes, t) : undefined
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale

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

  // login-03-like layout: label on top, field below
  return (
    <div className={cn('grid gap-2', className)}>
      {label || fallbackLabel ? (
        <div className="flex items-center">
          <Label htmlFor={attributes?.name} {...rest}>
            {label ?? fallbackLabel}
          </Label>
          {isPasswordField && locale ? (
            <Link
              href={`/${locale}/recovery`}
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {forgotPasswordText}
            </Link>
          ) : null}
        </div>
      ) : null}
      {children}
    </div>
  )
}

function normalizeAnchorHref(rawHref: string): string {
  // Prevent hydration mismatches by rendering relative URLs,
  // even if Ory returns absolute URLs with different origins.
  if (!rawHref) return rawHref
  try {
    if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
      const u = new URL(rawHref)
      return `${u.pathname}${u.search}${u.hash}`
    }
  } catch {
    // keep as-is
  }
  return rawHref
}

function OryShadcnAnchor(props: any) {
  const { attributes, node, className, ...rest } = props ?? {}
  const hrefRaw = attributes?.href as string | undefined
  if (!hrefRaw) return null

  const href = normalizeAnchorHref(hrefRaw)
  const text =
    getNodeLabel(node) ??
    (typeof attributes?.title === 'string' ? attributes.title : undefined) ??
    href

  return (
    <Link
      href={href}
      className={cn('text-sm underline-offset-4 hover:underline', className)}
      {...rest}
    >
      {text}
    </Link>
  )
}

export const defaultOryOverrides: OryFlowComponentOverrides = {
  // We already wrap pages in our own Card layout (AuthFormWrapper),
  // so we strip Ory's card wrappers to avoid nested cards.
  Card: {
    Root: FragmentCardRoot,
    Header: FragmentCardRoot,
    Content: FragmentCardRoot,
  },
  // Apply our app UI components to Ory nodes.
  Node: {
    Input: OryShadcnInput,
    Button: OryShadcnButton,
    Label: OryShadcnLabel,
    Anchor: OryShadcnAnchor,
  },
  // Layout similar to shadcn login-03
  Form: {
    Root: ({ className, children, ...rest }: any) => (
      <form className={cn('grid gap-6', className)} {...rest}>
        {children}
      </form>
    ),
    Group: ({ className, children, ...rest }: any) => (
      <div className={cn('grid gap-4', className)} {...rest}>
        {children}
      </div>
    ),
  },
}

function AuthFlowHeading({
  titleKey,
  titleDefault,
  subtitleKey,
  subtitleDefault,
}: {
  titleKey: string
  titleDefault: string
  subtitleKey: string
  subtitleDefault: string
}) {
  const { t } = useTranslate()

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold">{t(titleKey, titleDefault)}</h1>
      <p className="text-muted-foreground text-balance">
        {t(subtitleKey, subtitleDefault)}
      </p>
    </div>
  )
}

export function OryLoginFlow({
  flow,
  config,
  components = defaultOryOverrides,
}: {
  flow: ComponentProps<typeof Login>['flow']
  config: OryClientConfiguration
  components?: OryFlowComponentOverrides
}) {
  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.sign_in.title"
        titleDefault="Sign in"
        subtitleKey="auth.sign_in.subtitle"
        subtitleDefault="Sign in with your email and password"
      />
      <Login flow={flow} config={config} components={components} />
    </div>
  )
}

export function OryRegistrationFlow({
  flow,
  config,
  components = defaultOryOverrides,
}: {
  flow: ComponentProps<typeof Registration>['flow']
  config: OryClientConfiguration
  components?: OryFlowComponentOverrides
}) {
  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.sign_up.title"
        titleDefault="Sign up"
        subtitleKey="auth.sign_up.subtitle"
        subtitleDefault="Create a new account to get started"
      />
      <Registration flow={flow} config={config} components={components} />
    </div>
  )
}

export function OryRecoveryFlow({
  flow,
  config,
  components = defaultOryOverrides,
}: {
  flow: ComponentProps<typeof Recovery>['flow']
  config: OryClientConfiguration
  components?: OryFlowComponentOverrides
}) {
  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.recovery.title"
        titleDefault="Recovery"
        subtitleKey="auth.recovery.subtitle"
        subtitleDefault="Enter your email to recover your account"
      />
      <Recovery flow={flow} config={config} components={components} />
    </div>
  )
}

export function OryVerificationFlow({
  flow,
  config,
  components = defaultOryOverrides,
}: {
  flow: ComponentProps<typeof Verification>['flow']
  config: OryClientConfiguration
  components?: OryFlowComponentOverrides
}) {
  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.verify.title"
        titleDefault="Verification"
        subtitleKey="auth.verify.subtitle"
        subtitleDefault="Verify your email address"
      />
      <Verification flow={flow} config={config} components={components} />
    </div>
  )
}

