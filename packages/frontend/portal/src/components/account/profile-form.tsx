"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FullProfile } from "@/services/profile.service"

export type ProfileFormValues = {
  middleName: string
  position: string
  department: string
}

export type ProfileFormProps = {
  profile: FullProfile | null
  values: ProfileFormValues
  onChange: (values: ProfileFormValues) => void
  disabled?: boolean
}

export function ProfileForm({
  profile,
  values,
  onChange,
  disabled,
}: ProfileFormProps) {
  const { t } = useTranslate()

  const p = profile?.profile

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: Логин | Email */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label className="text-muted-foreground">{t("profile.field.login")}</Label>
          <Input value={profile?.preferred_username ?? ""} readOnly disabled className="bg-muted" />
        </div>
        <div className="grid gap-2">
          <Label className="text-muted-foreground">{t("profile.field.email")}</Label>
          <Input value={profile?.email ?? ""} readOnly disabled className="bg-muted" />
        </div>
      </div>

      {/* Row 2: Фамилия | Имя */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label className="text-muted-foreground">{t("profile.field.family-name")}</Label>
          <Input value={profile?.family_name ?? ""} readOnly disabled className="bg-muted" />
        </div>
        <div className="grid gap-2">
          <Label className="text-muted-foreground">{t("profile.field.given-name")}</Label>
          <Input value={profile?.given_name ?? ""} readOnly disabled className="bg-muted" />
        </div>
      </div>

      {/* Row 3: Отчество | Код */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="profile-middleName">{t("profile.field.middle-name")}</Label>
          <Input
            id="profile-middleName"
            value={values.middleName}
            onChange={(e) => onChange({ ...values, middleName: e.target.value })}
            disabled={disabled}
          />
        </div>
        <div className="grid gap-2">
          <Label className="text-muted-foreground">{t("profile.field.code")}</Label>
          <Input
            value={`${p?.code ?? ""}${p?.id ? (p?.code ? ` (${p.id})` : p.id) : ""}`}
            readOnly
            disabled
            className="bg-muted"
          />
        </div>
      </div>

      {/* Editable: tenant profile fields */}
      <div className="grid gap-2">
        <Label htmlFor="profile-position">{t("profile.field.position")}</Label>
        <Input
          id="profile-position"
          value={values.position}
          onChange={(e) => onChange({ ...values, position: e.target.value })}
          disabled={disabled}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-department">{t("profile.field.department")}</Label>
        <Input
          id="profile-department"
          value={values.department}
          onChange={(e) => onChange({ ...values, department: e.target.value })}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
