import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { SignInForm } from '@/components/auth/forms/sign-in-form'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SignInPage() {
  noStore()

  // If user already has a session cookie, redirect to the app.
  const c = await cookies()
  if (c.get("archpad_session")?.value) {
    redirect('/dashboard')
  }

  return (
    <AuthFormWrapper
      titleKey="auth.sign-in.title"
      title="Sign in"
      subtitleKey="auth.sign-in.subtitle"
      subtitle="Sign in with your email and password"
      footerSubmitButtonKey="auth.sign-in.submit"
    >
      <SignInForm />
    </AuthFormWrapper>
  )
}
