"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslate } from "@tolgee/react"
import { Suspense } from "react"

import { AuthFormWrapper } from "@/components/wrappers/auth-form-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SetPasswordContent() {
  const { t } = useTranslate()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!token) {
      setStatus("error")
      setError(t("auth.set-password.missing-token"))
      return
    }
    if (password !== confirm) {
      setStatus("error")
      setError(t("auth.field.password-mismatch"))
      return
    }

    setStatus("loading")
    try {
      const res = await fetch("/api/auth/setup-password/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token, password }),
      })
      const json = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setStatus("error")
        setError(typeof json?.error === "string" ? json.error : t("auth.set-password.invalid-link"))
        return
      }
      setStatus("success")
      setTimeout(() => router.push("/sign-in?setup=1"), 2000)
    } catch {
      setStatus("error")
      setError(t("auth.set-password.invalid-link"))
    }
  }

  return (
    <AuthFormWrapper
      titleKey="auth.set-password.title"
      title="Set password"
      subtitleKey="auth.set-password.subtitle"
      subtitle="Create a password for your account"
      footerSubmitButtonKey="auth.set-password.submit"
    >
      <div className="grid gap-6">
        {status === "success" && (
          <div className="space-y-4">
            <div className="rounded-md border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
              {t("auth.common.password-updated")}
            </div>
            <p className="text-muted-foreground text-center text-sm">
              {t("auth.set-password.success")}
            </p>
          </div>
        )}

        {status !== "success" && (
          <form onSubmit={onSubmit} className="grid gap-4">
            {error ? (
              <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            ) : null}

            <div className="grid gap-2">
              <Label htmlFor="password">{t("auth.field.password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={status === "loading"}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm">{t("auth.field.password-confirm")}</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                disabled={status === "loading"}
              />
            </div>

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {t("auth.set-password.submit")}
            </Button>
          </form>
        )}

        {status !== "success" && (
          <div className="text-center text-sm">
            <Link href="/sign-in" className="underline underline-offset-4 hover:opacity-80">
              {t("auth.common.back-to-sign-in")}
            </Link>
          </div>
        )}
      </div>
    </AuthFormWrapper>
  )
}

export default function SetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthFormWrapper title="Set password" subtitle="Create a password for your account">
          <p className="text-muted-foreground text-center text-sm">Loading...</p>
        </AuthFormWrapper>
      }
    >
      <SetPasswordContent />
    </Suspense>
  )
}
