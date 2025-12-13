'use client'

import type { OryClientConfiguration, OryFlowComponentOverrides } from '@ory/elements-react'
import {
  Login,
  Recovery,
  Registration,
  Verification,
} from '@ory/elements-react/theme'
import * as React from 'react'
import type { ComponentProps, PropsWithChildren } from 'react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTranslate } from '@tolgee/react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { OryInput } from '@/components/ory/ory-input'

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
  // Render native inputs and rely on HTML form serialization by `name`.
  const { attributes, onClick } = props ?? {}
  const type = attributes?.type
  const name = attributes?.name as string | undefined

  if (type === 'hidden') {
    return <input type="hidden" name={name} value={attributes?.value ?? ''} />
  }

  if (type === 'checkbox') {
    return (
      <input
        id={name}
        name={name}
        type="checkbox"
        value="true"
        defaultChecked={Boolean(attributes?.value)}
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
      defaultValue={attributes?.value ?? ''}
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
          {isPasswordField ? (
            <Link
              href={`/recovery`}
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

function normalizeFormAction(rawAction: string | undefined): string | undefined {
  if (!rawAction) return rawAction
  return normalizeAnchorHref(rawAction)
}

function rewriteHrefsDeep(node: React.ReactNode): React.ReactNode {
  if (node == null) return node

  if (Array.isArray(node)) {
    return node.map(rewriteHrefsDeep)
  }

  if (!React.isValidElement(node)) {
    return node
  }

  const props: any = node.props ?? {}
  const nextChildren = props.children ? rewriteHrefsDeep(props.children) : props.children

  // Normalize raw <a href="http://localhost:3000/..."> to "/..."
  if (node.type === 'a' && typeof props.href === 'string') {
    const href = normalizeAnchorHref(props.href)
    return React.cloneElement(node, { ...props, href, children: nextChildren })
  }

  // Recurse into children for all other elements.
  if (nextChildren !== props.children) {
    return React.cloneElement(node, { ...props, children: nextChildren })
  }

  return node
}

function OryCardFooterNormalizeLinks(props: any) {
  const { children, ...rest } = props ?? {}
  return <div {...rest}>{rewriteHrefsDeep(children)}</div>
}

function OryCardHeaderNormalizeLinks(props: any) {
  const { children, ...rest } = props ?? {}
  return <div {...rest}>{rewriteHrefsDeep(children)}</div>
}

function OryNativeFormRoot({ className, children, action, method }: any) {
  const router = useRouter()
  const pathname = usePathname()

  const normalizedAction = normalizeFormAction(action) ?? action
  const normalizedMethod = (method ?? 'POST') as string

  return (
    <form
      className={cn('grid gap-6', className)}
      action={normalizedAction}
      method={normalizedMethod}
      onSubmit={async (e) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const submitUrl = normalizedAction || form.action

        const res = await fetch(submitUrl, {
          method: normalizedMethod.toUpperCase(),
          body: new FormData(form),
          credentials: 'include',
        })

        // Success flows usually redirect (e.g. to /dashboard).
        if (res.redirected) {
          const u = new URL(res.url)
          router.replace(`${u.pathname}${u.search}${u.hash}`)
          return
        }

        // Error/next-step flows return JSON (updated flow) on 4xx.
        const ct = res.headers.get('content-type') ?? ''
        if (ct.includes('application/json')) {
          try {
            const data: any = await res.json()
            const flowId = data?.id
            if (flowId) {
              const u = new URL(window.location.href)
              u.pathname = pathname
              u.searchParams.set('flow', flowId)
              router.replace(`${u.pathname}${u.search}${u.hash}`)
              return
            }
          } catch {
            // ignore
          }
        }

        router.refresh()
      }}
    >
      {children}
    </form>
  )
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
    Header: OryCardHeaderNormalizeLinks,
    Content: FragmentCardRoot,
    Footer: OryCardFooterNormalizeLinks,
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
    Root: OryNativeFormRoot,
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

function withLocaleSdk(config: OryClientConfiguration, locale?: string): OryClientConfiguration {
  const anyConfig: any = config ?? {}
  return {
    ...anyConfig,
    sdk: {
      ...(anyConfig.sdk ?? {}),
      // Keep all Ory API calls on same-origin without locale prefix.
      // Middleware will rewrite to /[locale]/... internally.
      url: '',
      options: {
        ...(anyConfig.sdk?.options ?? {}),
        credentials: 'include',
      },
    },
  }
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
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale
  const configWithSdk = withLocaleSdk(config, locale)

  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.sign_in.title"
        titleDefault="Sign in"
        subtitleKey="auth.sign_in.subtitle"
        subtitleDefault="Sign in with your email and password"
      />
      <Login flow={flow} config={configWithSdk} components={components} />
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
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale
  const configWithSdk = withLocaleSdk(config, locale)

  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.sign_up.title"
        titleDefault="Sign up"
        subtitleKey="auth.sign_up.subtitle"
        subtitleDefault="Create a new account to get started"
      />
      <Registration flow={flow} config={configWithSdk} components={components} />
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
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale
  const configWithSdk = withLocaleSdk(config, locale)

  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.recovery.title"
        titleDefault="Recovery"
        subtitleKey="auth.recovery.subtitle"
        subtitleDefault="Enter your email to recover your account"
      />
      <Recovery flow={flow} config={configWithSdk} components={components} />
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
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale
  const configWithSdk = withLocaleSdk(config, locale)

  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.verify.title"
        titleDefault="Verification"
        subtitleKey="auth.verify.subtitle"
        subtitleDefault="Verify your email address"
      />
      <Verification flow={flow} config={configWithSdk} components={components} />
    </div>
  )
}

