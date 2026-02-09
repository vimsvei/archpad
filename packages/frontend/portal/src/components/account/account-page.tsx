"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"
import { toast } from "sonner"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ProfileForm, type ProfileFormValues } from "@/components/account/profile-form"
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/apis/profile-api"
import { useAuth } from "@/components/providers/auth-provider"

export function AccountPage() {
  const { t } = useTranslate()
  const router = useRouter()
  const { refresh: refreshAuth } = useAuth()
  const {
    data: profile,
    error,
    isLoading,
    isFetching,
  } = useGetProfileQuery(undefined, { refetchOnMountOrArgChange: true })

  const [updateProfile, updateState] = useUpdateProfileMutation()

  const [draft, setDraft] = React.useState<ProfileFormValues>({
    middleName: "",
    position: "",
    department: "",
  })

  const baselineRef = React.useRef<ProfileFormValues | null>(null)

  React.useEffect(() => {
    if (!profile?.profile) return
    const p = profile.profile
    const initial: ProfileFormValues = {
      middleName: p.middleName ?? "",
      position: p.position ?? "",
      department: p.department ?? "",
    }
    baselineRef.current = initial
    setDraft(initial)
  }, [profile?.profile])

  const isDirty = React.useMemo(() => {
    if (!baselineRef.current) return false
    return (
      draft.middleName !== baselineRef.current.middleName ||
      draft.position !== baselineRef.current.position ||
      draft.department !== baselineRef.current.department
    )
  }, [draft])

  const handleSave = React.useCallback(async () => {
    if (!isDirty) return
    try {
      await updateProfile({
        middleName: draft.middleName.trim() || undefined,
        position: draft.position.trim() || undefined,
        department: draft.department.trim() || undefined,
      }).unwrap()
      baselineRef.current = draft
      await refreshAuth()
      toast.success(t("action.saved"))
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : t("action.save.failed"))
    }
  }, [draft, isDirty, refreshAuth, t, updateProfile])

  if (isLoading || isFetching) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{t("profile.title")}</h1>
        <Card className="flex min-h-[200px] items-center justify-center p-10">
          <Spinner className="h-6 w-6" />
        </Card>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">{t("profile.title")}</h1>
        <Card className="p-6">
          <p className="text-muted-foreground">
            {(error as { message?: string })?.message ?? t("profile.not-found")}
          </p>
          <Button variant="outline" className="mt-4" onClick={() => router.push("/sign-in")}>
            {t("action.signIn")}
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-semibold">{t("profile.title")}</h1>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                aria-label={t("action.save")}
                onClick={() => void handleSave()}
                disabled={!isDirty || updateState.isLoading}
              >
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{t("action.save")}</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <Card className="flex flex-col p-6">
        <ProfileForm
          profile={profile}
          values={draft}
          onChange={setDraft}
          disabled={updateState.isLoading}
        />
      </Card>
    </div>
  )
}
