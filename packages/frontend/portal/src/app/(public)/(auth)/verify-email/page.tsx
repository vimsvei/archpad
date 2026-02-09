"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslate } from "@tolgee/react"
import { Suspense } from "react"

import { AuthFormWrapper } from "@/components/wrappers/auth-form-wrapper"
import { Button } from "@/components/ui/button"

function VerifyEmailContent() {
  const { t } = useTranslate()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!token) {
      setStatus("error")
      setError("Missing verification link")
      return
    }

    let cancelled = false
    setStatus("loading")

    fetch("/api/auth/verify-email/confirm", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        if (cancelled) return
        const json = (await res.json().catch(() => ({}))) as { error?: string }
        if (res.ok) {
          setStatus("success")
          setTimeout(() => router.push("/sign-in?verified=1"), 2000)
        } else {
          setStatus("error")
          setError(typeof json?.error === "string" ? json.error : "Verification failed")
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error")
          setError("Verification failed")
        }
      })

    return () => {
      cancelled = true
    }
  }, [token, router])

  return (
    <AuthFormWrapper
      titleKey="auth.verification.title"
      title="Verification"
      subtitleKey="auth.verification.subtitle"
      subtitle="Confirm your email to activate your account"
    >
      <div className="grid gap-6">
        {status === "loading" && (
          <p className="text-muted-foreground text-center text-sm">
            Verifying your email...
          </p>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="rounded-md border border-green-500/20 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
              {t("auth.common.email-verified")}
            </div>
            <p className="text-muted-foreground text-center text-sm">
              Redirecting to sign in...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error ?? "Verification failed"}
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild variant="default" className="w-full">
                <Link href="/sign-in">{t("auth.common.back-to-sign-in")}</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/verify">{t("auth.verification.resend")}</Link>
              </Button>
            </div>
          </div>
        )}

        {status === "idle" && token && (
          <p className="text-muted-foreground text-center text-sm">Loading...</p>
        )}

        {status === "idle" && !token && (
          <div className="space-y-4">
            <p className="text-muted-foreground text-center text-sm">
              No verification token provided. Please use the link from your email.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/sign-in">{t("auth.common.back-to-sign-in")}</Link>
            </Button>
          </div>
        )}
      </div>
    </AuthFormWrapper>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <AuthFormWrapper title="Verification" subtitle="Confirm your email">
        <p className="text-muted-foreground text-center text-sm">Loading...</p>
      </AuthFormWrapper>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
