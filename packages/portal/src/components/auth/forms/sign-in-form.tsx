"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/providers/auth-provider"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { authFormsActions } from "@/store/slices/auth-forms-slice"

export function SignInForm() {
  const { t } = useTranslate()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const dispatch = useAppDispatch()
  const form = useAppSelector((s) => s.authForms.signIn)

  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const returnTo = searchParams?.get("return_to") ?? "/dashboard"

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const result = await login({ email: form.email, password: form.password })
      if (!result.ok) {
        setError(result.message)
        return
      }
      router.push(returnTo)
      router.refresh()
    } catch (e: unknown) {
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

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{t("auth.field.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => dispatch(authFormsActions.setSignInEmail(e.target.value))}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{t("auth.field.password")}</Label>
          <Input
            id="password"
            name="password"
            type={form.showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => dispatch(authFormsActions.setSignInPassword(e.target.value))}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? t("auth.sign-in.submit") : t("auth.sign-in.submit")}
        </Button>
      </form>

      <div className="grid gap-2 text-center text-sm">
        <Link href="/recovery" className="underline underline-offset-4 hover:opacity-80">
          {t("auth.sign-in.forgot")}
        </Link>
        <div>
          <span className="text-muted-foreground">{t("auth.sign-in.footer.no-account")}</span>{" "}
          <Link href="/sign-up" className="underline underline-offset-4 hover:opacity-80">
            {t("auth.sign-in.footer.sign-up")}
          </Link>
        </div>
      </div>
    </div>
  )
}
