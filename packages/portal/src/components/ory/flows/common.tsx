'use client'

import type { OryClientConfiguration, OryFlowComponentOverrides } from '@ory/elements-react'
import * as React from 'react'
import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTranslate } from '@tolgee/react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { OryInput } from '@/components/ory/ory-input'

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

export function normalizeAnchorHref(rawHref: string): string {
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

function OryShadcnInput(props: any) {
  // Render native inputs and rely on HTML form serialization by `name`.
  const { attributes, onClick } = props ?? {}
  const type = attributes?.type
  const name = attributes?.name as string | undefined
  const isDev = process.env.NODE_ENV !== 'production'

  const getDevDefaultValue = (fieldName?: string): string | undefined => {
    if (!isDev) return undefined
    switch (fieldName) {
      case 'traits.email':
        return 'alexandr.zelentsov@gmail.com'
      case 'traits.phone':
        return '+79998051081'
      case 'traits.name.first':
        return 'Александр'
      case 'traits.name.last':
        return 'Зеленцов'
      default:
        return undefined
    }
  }

  if (type === 'hidden') {
    return <input type="hidden" name={name} value={attributes?.value ?? ''} />
  }

  if (type === 'checkbox') {
    const attrVal = attributes?.value
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

function OryShadcnButton(props: any) {
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

function OryShadcnLabel(props: any) {
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
    <Link href={href} className={cn('text-sm underline-offset-4 hover:underline', className)} {...rest}>
      {text}
    </Link>
  )
}

export function OryNativeFormRoot({
  className,
  children,
  action,
  method,
  onFlow,
}: any & { onFlow?: (flow: any) => void }) {
  const router = useRouter()
  const lastSubmitRef = React.useRef<{ name: string; value: string } | null>(null)

  const normalizedAction = normalizeFormAction(action) ?? action
  const normalizedMethod = (method ?? 'POST') as string

  return (
    <form
      className={cn('grid gap-6', className)}
      action={normalizedAction}
      method={normalizedMethod}
      onClickCapture={(e) => {
        // Capture the last clicked submit control for browsers that don't support `SubmitEvent.submitter`.
        const target = e.target as Element | null
        if (!target) return
        const el = target.closest('button, input[type="submit"], input[type="image"]') as
          | HTMLButtonElement
          | HTMLInputElement
          | null
        if (!el) return
        const name = (el as any).name as string | undefined
        const value = (el as any).value as string | undefined
        if (name) {
          lastSubmitRef.current = { name, value: value ?? '' }
        }
      }}
      onSubmit={async (e) => {
        e.preventDefault()

        const form = e.currentTarget as HTMLFormElement
        const submitUrl = normalizedAction || form.action

        const submitter = (e.nativeEvent as SubmitEvent | undefined)?.submitter as
          | HTMLButtonElement
          | HTMLInputElement
          | null
          | undefined

        // Important: FormData(form) does NOT include the clicked submit button (method/screen).
        // Use FormData(form, submitter) when available, otherwise append manually.
        let formData: FormData
        try {
          formData = submitter ? new FormData(form, submitter) : new FormData(form)
        } catch {
          formData = new FormData(form)
        }

        // Ensure the clicked submit control is included even when `submitter` is missing.
        const submitName = (submitter && submitter.name) || lastSubmitRef.current?.name || undefined
        const submitValue = (submitter && submitter.value) || lastSubmitRef.current?.value || ''
        if (submitName) {
          formData.set(submitName, submitValue)
        }

        // Kratos browser flows expect application/x-www-form-urlencoded.
        const params = new URLSearchParams()
        for (const [k, v] of formData.entries()) {
          if (typeof v === 'string') params.append(k, v)
        }

        const res = await fetch(submitUrl, {
          method: normalizedMethod.toUpperCase(),
          body: params.toString(),
          credentials: 'include',
          redirect: 'manual',
          headers: {
            accept: 'application/json',
            'content-type': 'application/x-www-form-urlencoded',
          },
        })

        // Success/next-step flows often return 302 with Location.
        if (res.status >= 300 && res.status < 400) {
          const loc = res.headers.get('location')
          if (loc) {
            const href = normalizeAnchorHref(loc)
            window.location.assign(href)
            return
          }
          return
        }

        // Kratos returns the updated flow as JSON (200/4xx) when Accept: application/json
        const ct = res.headers.get('content-type') ?? ''
        if (ct.includes('application/json')) {
          try {
            const data: any = await res.json()
            // Successful login/registration can return 200 JSON (no redirect) but with session fields.
            // In that case force a full navigation so Server Components re-run and redirect properly.
            const looksLikeSuccess =
              Boolean(data?.session) ||
              Boolean(data?.session_token) ||
              Boolean(data?.session_token_exchange_code)
            if (looksLikeSuccess) {
              window.location.assign('/')
              return
            }

            if (data?.ui && typeof onFlow === 'function') {
              onFlow(data)
              return
            }
            // Unknown JSON response: refresh to re-fetch server state.
            router.refresh()
            return
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

export function AuthFlowHeading({
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
      <p className="text-muted-foreground text-balance">{t(subtitleKey, subtitleDefault)}</p>
    </div>
  )
}

export function withLocaleSdk(
  config: OryClientConfiguration,
  _locale?: string
): OryClientConfiguration {
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






