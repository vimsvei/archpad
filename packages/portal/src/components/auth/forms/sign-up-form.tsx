"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useTranslate } from "@tolgee/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PhoneInput } from "@/components/ui/phone-input"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { authFormsActions } from "@/store/slices/auth-forms-slice"

export function SignUpForm() {
  const { t } = useTranslate()
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useAppDispatch()
  const form = useAppSelector((s) => s.authForms.signUp)

  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const returnTo = searchParams?.get("return_to") ?? "/dashboard"

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        }),
      })
      const json = (await res.json().catch(() => null)) as any
      if (!res.ok) {
        setError(typeof json?.message === "string" ? json.message : "Registration failed")
        return
      }
      // After registration we redirect to sign-in (and preserve return_to if user came from a private page).
      router.push(`/sign-in?return_to=${encodeURIComponent(returnTo)}`)
      router.refresh()
    } catch (e: any) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-6">
      {error ? (
        <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{t("auth.field.email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => dispatch(authFormsActions.setSignUpEmail(e.target.value))}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="firstName">{t("auth.field.first-name")}</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => dispatch(authFormsActions.setSignUpFirstName(e.target.value))}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">{t("auth.field.last-name")}</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => dispatch(authFormsActions.setSignUpLastName(e.target.value))}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">{t("auth.field.phone")}</Label>
          <PhoneInput
            defaultCountry="ru"
            preferredCountries={["ru", "us", "gb"]}
            value={form.phone}
            onChange={(phone) => dispatch(authFormsActions.setSignUpPhone(phone))}
            inputProps={{
              id: "phone",
              name: "phone",
              autoComplete: "tel",
              "aria-label": t("auth.field.phone"),
            }}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{t("auth.field.password")}</Label>
          <Input
            id="password"
            name="password"
            type={form.showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => dispatch(authFormsActions.setSignUpPassword(e.target.value))}
            required
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            id="acceptedTos"
            name="acceptedTos"
            type="checkbox"
            value="true"
            checked={form.acceptedTos}
            onChange={(e) => dispatch(authFormsActions.setSignUpAcceptedTos(e.target.checked))}
            className="h-4 w-4 rounded border border-input bg-transparent"
          />
          <div className="grid gap-1 leading-none">
            <Label htmlFor="acceptedTos">{t("auth.sign-up.accept-tos")}</Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting || !form.acceptedTos}>
          {t("auth.sign-up.submit")}
        </Button>
      </form>

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


