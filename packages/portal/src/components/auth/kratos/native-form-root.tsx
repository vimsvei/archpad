"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { normalizeAnchorHref, normalizeFormAction } from "./normalize"

/**
 * Lightweight form submitter for Kratos browser flows.
 *
 * - Submits as `application/x-www-form-urlencoded`
 * - Sends cookies (`credentials: include`)
 * - Handles `302 Location` (next step)
 * - Consumes JSON flow responses and calls `onFlow(updatedFlow)`
 *
 * This intentionally does NOT depend on `@ory/elements-react`.
 */
export function KratosFormRoot({
  className,
  children,
  action,
  method,
  onFlow,
  successRedirectTo,
}: {
  className?: string
  children: React.ReactNode
  action?: string
  method?: string
  onFlow?: (flow: unknown) => void
  /**
   * When a submission succeeds (Kratos may return 200 JSON with session fields),
   * force a full navigation to this path.
   *
   * Defaults to "/".
   */
  successRedirectTo?: string
}) {
  const router = useRouter()
  const lastSubmitRef = React.useRef<{ name: string; value: string } | null>(null)

  const normalizedAction = normalizeFormAction(action) ?? action
  const normalizedMethod = (method ?? "POST") as string

  return (
    <form
      className={cn("grid gap-6", className)}
      action={normalizedAction}
      method={normalizedMethod}
      onClickCapture={(e) => {
        // Capture last clicked submit control for browsers that don't support `SubmitEvent.submitter`.
        const target = e.target as Element | null
        if (!target) return
        const el = target.closest("button, input[type=\"submit\"], input[type=\"image\"]") as
          | HTMLButtonElement
          | HTMLInputElement
          | null
        if (!el) return
        const name = "name" in el ? el.name : undefined
        const value = "value" in el ? el.value : undefined
        if (name) lastSubmitRef.current = { name, value: value ?? "" }
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

        // FormData(form) does NOT include clicked submit button; include it when possible.
        let formData: FormData
        try {
          formData = submitter ? new FormData(form, submitter) : new FormData(form)
        } catch {
          formData = new FormData(form)
        }

        // Ensure clicked submit control is included even when `submitter` is missing.
        const submitName = (submitter && submitter.name) || lastSubmitRef.current?.name || undefined
        const submitValue = (submitter && submitter.value) || lastSubmitRef.current?.value || ""
        if (submitName) formData.set(submitName, submitValue)

        // Kratos browser flows expect application/x-www-form-urlencoded.
        const params = new URLSearchParams()
        for (const [k, v] of formData.entries()) {
          if (typeof v === "string") params.append(k, v)
        }

        const res = await fetch(submitUrl, {
          method: normalizedMethod.toUpperCase(),
          body: params.toString(),
          credentials: "include",
          redirect: "manual",
          headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded",
          },
        })

        // Success/next-step flows often return 302 with Location.
        if (res.status >= 300 && res.status < 400) {
          const loc = res.headers.get("location")
          if (loc) {
            window.location.assign(normalizeAnchorHref(loc))
            return
          }
          return
        }

        // Kratos returns updated flow as JSON (200/4xx) when Accept: application/json
        const ct = res.headers.get("content-type") ?? ""
        if (ct.includes("application/json")) {
          try {
            const data: unknown = await res.json()

            // Successful login/registration can return 200 JSON (no redirect) but with session fields.
            // Force full navigation so Server Components re-run and redirect properly.
            const o = typeof data === "object" && data !== null ? (data as Record<string, unknown>) : null
            const looksLikeSuccess =
              Boolean(o?.session) || Boolean(o?.session_token) || Boolean(o?.session_token_exchange_code)
            if (looksLikeSuccess) {
              window.location.assign(successRedirectTo ?? "/")
              return
            }

            if (o?.ui && typeof onFlow === "function") {
              onFlow(data)
              return
            }

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

/**
 * @deprecated Use `KratosFormRoot` instead.
 */
export const KratosNativeFormRoot = KratosFormRoot


