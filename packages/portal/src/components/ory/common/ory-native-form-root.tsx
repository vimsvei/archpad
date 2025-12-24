'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { normalizeFormAction, normalizeAnchorHref } from './utils'

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

