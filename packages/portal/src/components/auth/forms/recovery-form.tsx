"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FlowMessages } from "@/components/auth/kratos/flow-messages"
import { FlowDebug } from "@/components/auth/kratos/flow-debug"
import {
  getCsrfToken,
  getFlowId,
  getFlowMessages,
  getFlowMeta,
  getNodeMessages,
  hasNode,
  pickMethod,
} from "@/components/auth/kratos/flow-utils"
import { resolveFieldName } from "@/components/auth/kratos/field-resolver"
import { KratosFormRoot } from "@/components/auth/kratos/native-form-root"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { authFormsActions } from "@/store/slices/auth-forms-slice"

export function RecoveryForm({ flow }: { flow: unknown }) {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const form = useAppSelector((s) => s.authForms.recovery)

  const [flowState, setFlowState] = React.useState<unknown>(flow)
  React.useEffect(() => setFlowState(flow), [flow])

  React.useEffect(() => {
    dispatch(authFormsActions.setActiveFlowId(getFlowId(flowState) ?? null))
    dispatch(authFormsActions.setFlowMeta(getFlowMeta(flowState)))
  }, [dispatch, flowState])

  const meta = React.useMemo(() => getFlowMeta(flowState), [flowState])
  const csrfToken = getCsrfToken(flowState)
  const method = pickMethod(flowState, [form.selectedMethod, "code", "link"], "code")

  const emailName = resolveFieldName(flowState, "recovery", "email")
  const codeName = resolveFieldName(flowState, "recovery", "code")
  const showCode = hasNode(flowState, codeName) || hasNode(flowState, "code")

  React.useEffect(() => {
    dispatch(
      authFormsActions.setRecoveryStep(showCode ? "enter_code" : "enter_email")
    )
  }, [dispatch, showCode])

  const globalErrors = getFlowMessages(flowState)
  const emailErrors = getNodeMessages(flowState, emailName)
  const codeErrors = getNodeMessages(flowState, codeName)

  return (
    <div className="grid gap-6">
      <FlowMessages messages={globalErrors} />
      <FlowDebug flow={flowState} />

      <KratosFormRoot
        action={meta.action ?? undefined}
        method={meta.httpMethod ?? undefined}
        onFlow={setFlowState}
      >
        {csrfToken ? <input type="hidden" name="csrf_token" value={csrfToken} /> : null}
        <input type="hidden" name="method" value={method} />

        <div className="grid gap-2">
          <Label htmlFor={emailName}>{t("auth.field.email")}</Label>
          <Input
            id={emailName}
            name={emailName}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) =>
              dispatch(authFormsActions.setRecoveryEmail(e.target.value))
            }
            required
          />
          <FlowMessages messages={emailErrors} className="border border-destructive/20 bg-destructive/5" />
        </div>

        {showCode ? (
          <div className="grid gap-2">
            <Label htmlFor="code">{t("auth.recovery.code")}</Label>
            <Input
              id={codeName}
              name={codeName}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={form.code}
              onChange={(e) =>
                dispatch(authFormsActions.setRecoveryCode(e.target.value))
              }
            />
            <FlowMessages messages={codeErrors} className="border border-destructive/20 bg-destructive/5" />
          </div>
        ) : null}

        <Button type="submit" className="w-full">
          {showCode
            ? t("auth.common.submit-confirm")
            : t("auth.common.submit-send-code")}
        </Button>
      </KratosFormRoot>

      <div className="text-center text-sm">
        <Link href="/sign-in" className="underline underline-offset-4 hover:opacity-80">
          {t("auth.common.back-to-sign-in")}
        </Link>
      </div>
    </div>
  )
}


