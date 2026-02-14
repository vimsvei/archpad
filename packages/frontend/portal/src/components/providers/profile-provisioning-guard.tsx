"use client"

import { useTranslate } from "@tolgee/react"
import { useAuth } from "@/components/providers/auth-provider"
import { Button } from "@/components/ui/button"

export function ProfileProvisioningGuard() {
  const { t } = useTranslate()
  const { user, isLoading, refresh } = useAuth()

  if (isLoading || !user) return null
  if (user.profile) return null

  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
      <div className="font-semibold">{t("auth.profile-pending.title")}</div>
      <div className="text-sm text-amber-800">
        {t("auth.profile-pending.subtitle")}
      </div>
      <div className="mt-3">
        <Button variant="secondary" size="sm" onClick={() => void refresh()}>
          {t("auth.profile-pending.refresh")}
        </Button>
      </div>
    </div>
  )
}
