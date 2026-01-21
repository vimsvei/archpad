"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { useAuthSession } from "@/hooks/use-auth-session"

export function SettingsForm() {
  const { t } = useTranslate()
  const { session } = useAuthSession()
  const [message, setMessage] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [isBusy, setIsBusy] = React.useState(false)

  const sessionObj = typeof session === "object" && session !== null ? (session as Record<string, any>) : null
  const email = typeof sessionObj?.email === "string" ? sessionObj.email : ""

  const sendRecovery = async () => {
    setError(null)
    setMessage(null)
    setIsBusy(true)
    try {
      const res = await fetch("/api/auth/recovery", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed to send email")
      setMessage("Email sent (if account exists).")
    } catch (e: any) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setIsBusy(false)
    }
  }

  const sendVerify = async () => {
    setError(null)
    setMessage(null)
    setIsBusy(true)
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed to send email")
      setMessage("Email sent (if account exists).")
    } catch (e: any) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setIsBusy(false)
    }
  }

  return (
    <div className="grid gap-4">
      {email ? (
        <div className="text-sm text-muted-foreground">
          {t("auth.field.email")}: <span className="font-medium text-foreground">{email}</span>
        </div>
      ) : null}

      {message ? <div className="rounded-md border px-3 py-2 text-sm">{message}</div> : null}
      {error ? (
        <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={sendRecovery} disabled={!email || isBusy}>
          {t("auth.settings.tab.password")}
        </Button>
        <Button type="button" variant="outline" onClick={sendVerify} disabled={!email || isBusy}>
          {t("auth.verification.title")}
        </Button>
      </div>
    </div>
  )
}


