"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { authFormsActions } from "@/store/slices/auth-forms-slice"

export function VerifyForm() {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const form = useAppSelector((s) => s.authForms.verification)

  const [error, setError] = React.useState<string | null>(null)
  const [sent, setSent] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: form.email }),
      })
      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as any
        setError(typeof json?.message === "string" ? json.message : "Verification failed")
        return
      }
      setSent(true)
    } catch (e: any) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-6">
      {error ? (
        <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {sent ? (
        <div className="rounded-md border px-3 py-2 text-sm">
          {t("auth.common.submit-send-code")}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{t("auth.field.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => dispatch(authFormsActions.setVerificationEmail(e.target.value))}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {t("auth.common.submit-send-code")}
        </Button>
      </form>

      <div className="text-center text-sm">
        <Link href="/sign-in" className="underline underline-offset-4 hover:opacity-80">
          {t("auth.common.back-to-sign-in")}
        </Link>
      </div>
    </div>
  )
}


