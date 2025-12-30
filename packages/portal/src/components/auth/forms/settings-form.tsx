"use client"

import * as React from "react"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FlowMessages } from "@/components/auth/kratos/flow-messages"
import { FlowDebug } from "@/components/auth/kratos/flow-debug"
import { KratosFormRoot } from "@/components/auth/kratos/native-form-root"
import { resolveFieldName } from "@/components/auth/kratos/field-resolver"
import {
  getCsrfToken,
  getFlowMessages,
  getFlowMeta,
  getInputFieldNamesByType,
  getNodeMessages,
  pickMethod,
} from "@/components/auth/kratos/flow-utils"

export function SettingsForm({ flow }: { flow: unknown }) {
  const { t } = useTranslate()

  const [flowState, setFlowState] = React.useState<unknown>(flow)
  React.useEffect(() => setFlowState(flow), [flow])

  const meta = React.useMemo(() => getFlowMeta(flowState), [flowState])
  const csrfToken = getCsrfToken(flowState)
  const available = meta.availableMethods

  // Typical Kratos settings methods include "profile" and "password".
  const [selectedMethod, setSelectedMethod] = React.useState<string>(() =>
    pickMethod(flowState, ["profile", "password"], available[0] ?? "profile")
  )
  React.useEffect(() => {
    setSelectedMethod((prev) => pickMethod(flowState, [prev, "profile", "password"], prev))
  }, [flowState])

  const method = pickMethod(flowState, [selectedMethod, "profile", "password"], selectedMethod)
  const globalErrors = getFlowMessages(flowState)

  const emailName = resolveFieldName(flowState, "settings", "email")
  const firstNameName = resolveFieldName(flowState, "settings", "firstName")
  const lastNameName = resolveFieldName(flowState, "settings", "lastName")
  const phoneName = resolveFieldName(flowState, "settings", "phone")

  const passwordFields = React.useMemo(() => {
    const names = getInputFieldNamesByType(flowState, "password")
    // If Kratos doesn't expose type=password nodes (unlikely), still try the common name.
    return names.length > 0 ? names : [resolveFieldName(flowState, "settings", "password")]
  }, [flowState])

  const showMethodSwitch = available.includes("profile") && available.includes("password")

  return (
    <div className="grid gap-6">
      <FlowMessages messages={globalErrors} />
      <FlowDebug flow={flowState} />

      {showMethodSwitch ? (
        <div className="flex gap-2">
          <Button
            type="button"
            variant={method === "profile" ? "default" : "outline"}
            onClick={() => setSelectedMethod("profile")}
          >
            {t("auth.settings.tab.profile")}
          </Button>
          <Button
            type="button"
            variant={method === "password" ? "default" : "outline"}
            onClick={() => setSelectedMethod("password")}
          >
            {t("auth.settings.tab.password")}
          </Button>
        </div>
      ) : null}

      <KratosFormRoot
        action={meta.action ?? undefined}
        method={meta.httpMethod ?? undefined}
        onFlow={setFlowState}
      >
        {csrfToken ? <input type="hidden" name="csrf_token" value={csrfToken} /> : null}
        <input type="hidden" name="method" value={method} />

        {method === "profile" ? (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor={emailName}>{t("auth.field.email")}</Label>
              <Input id={emailName} name={emailName} type="email" autoComplete="email" />
              <FlowMessages
                messages={getNodeMessages(flowState, emailName)}
                className="border border-destructive/20 bg-destructive/5"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={firstNameName}>{t("auth.field.first-name")}</Label>
              <Input id={firstNameName} name={firstNameName} type="text" autoComplete="given-name" />
              <FlowMessages
                messages={getNodeMessages(flowState, firstNameName)}
                className="border border-destructive/20 bg-destructive/5"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={lastNameName}>{t("auth.field.last-name")}</Label>
              <Input id={lastNameName} name={lastNameName} type="text" autoComplete="family-name" />
              <FlowMessages
                messages={getNodeMessages(flowState, lastNameName)}
                className="border border-destructive/20 bg-destructive/5"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={phoneName}>{t("auth.field.phone")}</Label>
              <Input id={phoneName} name={phoneName} type="tel" autoComplete="tel" />
              <FlowMessages
                messages={getNodeMessages(flowState, phoneName)}
                className="border border-destructive/20 bg-destructive/5"
              />
            </div>
          </div>
        ) : null}

        {method === "password" ? (
          <div className="grid gap-4">
            {passwordFields.map((fieldName) => {
              const label =
                fieldName.toLowerCase().includes("confirm") || fieldName.toLowerCase().includes("confirmation")
                  ? t("auth.field.password-confirm")
                  : t("auth.field.password")
              return (
                <div key={fieldName} className="grid gap-2">
                  <Label htmlFor={fieldName}>{label}</Label>
                  <Input id={fieldName} name={fieldName} type="password" autoComplete="new-password" />
                  <FlowMessages
                    messages={getNodeMessages(flowState, fieldName)}
                    className="border border-destructive/20 bg-destructive/5"
                  />
                </div>
              )
            })}
          </div>
        ) : null}

        <Button type="submit" className="w-fit">
          {t("auth.settings.save")}
        </Button>
      </KratosFormRoot>
    </div>
  )
}


