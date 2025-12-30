"use client"

import * as React from "react"
import Link from "next/link"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { authFormsActions } from "@/store/slices/auth-forms-slice"
import { FlowMessages } from "@/components/auth/kratos/flow-messages"
import { FlowDebug } from "@/components/auth/kratos/flow-debug"
import {
  getCsrfToken,
  getFlowId,
  getFlowMessages,
  getFlowMeta,
  getNodeMessages,
  pickMethod,
} from "@/components/auth/kratos/flow-utils"
import { resolveFieldName } from "@/components/auth/kratos/field-resolver"
import { KratosFormRoot } from "@/components/auth/kratos/native-form-root"

export function SignInForm({ flow }: { flow: unknown }) {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const form = useAppSelector((s) => s.authForms.signIn)

  const [flowState, setFlowState] = React.useState<unknown>(flow)
  React.useEffect(() => setFlowState(flow), [flow])

  React.useEffect(() => {
    dispatch(authFormsActions.setActiveFlowId(getFlowId(flowState) ?? null))
    dispatch(authFormsActions.setFlowMeta(getFlowMeta(flowState)))
  }, [dispatch, flowState])

  const meta = React.useMemo(() => getFlowMeta(flowState), [flowState])
  const csrfToken = getCsrfToken(flowState)
  const method = pickMethod(flowState, [form.selectedMethod, "password"], "password")

  const emailName = resolveFieldName(flowState, "login", "email")
  const passwordName = resolveFieldName(flowState, "login", "password")

  const globalErrors = getFlowMessages(flowState)
  const emailErrors = getNodeMessages(flowState, emailName)
  const passwordErrors = getNodeMessages(flowState, passwordName)

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
              dispatch(authFormsActions.setSignInEmail(e.target.value))
            }
            required
          />
          <FlowMessages messages={emailErrors} className="border border-destructive/20 bg-destructive/5" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={passwordName}>{t("auth.field.password")}</Label>
          <Input
            id={passwordName}
            name={passwordName}
            type={form.showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) =>
              dispatch(authFormsActions.setSignInPassword(e.target.value))
            }
            required
          />
          <FlowMessages messages={passwordErrors} className="border border-destructive/20 bg-destructive/5" />
        </div>

        <Button type="submit" className="w-full">
          {t("auth.sign-in.submit")}
        </Button>
      </KratosFormRoot>

      <div className="grid gap-2 text-center text-sm">
        <Link href="/recovery" className="underline underline-offset-4 hover:opacity-80">
          {t("auth.sign-in.forgot")}
        </Link>
        <div>
          <span className="text-muted-foreground">
            {t("auth.sign-in.footer.no-account")}
          </span>{" "}
          <Link href="/sign-up" className="underline underline-offset-4 hover:opacity-80">
            {t("auth.sign-in.footer.sign-up")}
          </Link>
        </div>
      </div>
    </div>
  )
}


