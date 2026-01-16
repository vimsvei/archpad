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

export function SignUpForm({ flow }: { flow: unknown }) {
  const { t } = useTranslate()
  const dispatch = useAppDispatch()
  const form = useAppSelector((s) => s.authForms.signUp)

  const [flowState, setFlowState] = React.useState<unknown>(flow)
  React.useEffect(() => setFlowState(flow), [flow])

  React.useEffect(() => {
    dispatch(authFormsActions.setActiveFlowId(getFlowId(flowState) ?? null))
    dispatch(authFormsActions.setFlowMeta(getFlowMeta(flowState)))
  }, [dispatch, flowState])

  const meta = React.useMemo(() => getFlowMeta(flowState), [flowState])
  const csrfToken = getCsrfToken(flowState)
  const method = pickMethod(flowState, [form.selectedMethod, "password"], "password")

  const emailName = resolveFieldName(flowState, "registration", "email")
  const passwordName = resolveFieldName(flowState, "registration", "password")
  const firstNameName = resolveFieldName(flowState, "registration", "firstName")
  const lastNameName = resolveFieldName(flowState, "registration", "lastName")
  const phoneName = resolveFieldName(flowState, "registration", "phone")
  const tosName = resolveFieldName(flowState, "registration", "acceptedTos")
  const showTos = hasNode(flowState, tosName)

  const globalErrors = getFlowMessages(flowState)
  const emailErrors = getNodeMessages(flowState, emailName)
  const passwordErrors = getNodeMessages(flowState, passwordName)
  const firstNameErrors = getNodeMessages(flowState, firstNameName)
  const lastNameErrors = getNodeMessages(flowState, lastNameName)
  const phoneErrors = getNodeMessages(flowState, phoneName)
  const tosErrors = getNodeMessages(flowState, tosName)

  return (
    <div className="grid gap-6">
      <FlowMessages messages={globalErrors} />
      <FlowDebug flow={flowState} />

      <KratosFormRoot
        action={meta.action ?? undefined}
        method={meta.httpMethod ?? undefined}
        onFlow={setFlowState}
        successRedirectTo="/sign-in"
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
              dispatch(authFormsActions.setSignUpEmail(e.target.value))
            }
            required
          />
          <FlowMessages messages={emailErrors} className="border border-destructive/20 bg-destructive/5" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={firstNameName}>{t("auth.field.first-name")}</Label>
          <Input
            id={firstNameName}
            name={firstNameName}
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) =>
              dispatch(authFormsActions.setSignUpFirstName(e.target.value))
            }
          />
          <FlowMessages
            messages={firstNameErrors}
            className="border border-destructive/20 bg-destructive/5"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={lastNameName}>{t("auth.field.last-name")}</Label>
          <Input
            id={lastNameName}
            name={lastNameName}
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) =>
              dispatch(authFormsActions.setSignUpLastName(e.target.value))
            }
          />
          <FlowMessages
            messages={lastNameErrors}
            className="border border-destructive/20 bg-destructive/5"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={phoneName}>{t("auth.field.phone")}</Label>
          <Input
            id={phoneName}
            name={phoneName}
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) =>
              dispatch(authFormsActions.setSignUpPhone(e.target.value))
            }
          />
          <FlowMessages messages={phoneErrors} className="border border-destructive/20 bg-destructive/5" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={passwordName}>{t("auth.field.password")}</Label>
          <Input
            id={passwordName}
            name={passwordName}
            type={form.showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.password}
            onChange={(e) =>
              dispatch(authFormsActions.setSignUpPassword(e.target.value))
            }
            required
          />
          <FlowMessages messages={passwordErrors} className="border border-destructive/20 bg-destructive/5" />
        </div>

        {showTos ? (
          <div className="flex items-start gap-3">
            {/* IMPORTANT: Use a native checkbox so it is included in HTML form submission. */}
            <input
              id={tosName}
              name={tosName}
              type="checkbox"
              value="true"
              checked={form.acceptedTos}
              onChange={(e) =>
                dispatch(
                  authFormsActions.setSignUpAcceptedTos(e.target.checked)
                )
              }
              className="h-4 w-4 rounded border border-input bg-transparent"
            />
            <div className="grid gap-1 leading-none">
              <Label htmlFor={tosName}>
                {t("auth.sign-up.accept-tos")}
              </Label>
              <FlowMessages
                messages={tosErrors}
                className="border border-destructive/20 bg-destructive/5"
              />
            </div>
          </div>
        ) : null}

        <Button type="submit" className="w-full">
          {t("auth.sign-up.submit")}
        </Button>
      </KratosFormRoot>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {t("auth.sign-up.footer.have-account")}
        </span>{" "}
        <Link href="/sign-in" className="underline underline-offset-4 hover:opacity-80">
          {t("auth.sign-up.footer.sign-in")}
        </Link>
      </div>
    </div>
  )
}


