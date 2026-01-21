import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { SignUpForm } from '@/components/auth/forms/sign-up-form'
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from "next/headers"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SignUpPage() {
  noStore()

  const c = await cookies()
  if (c.get("archpad_session")?.value) {
    redirect('/dashboard')
  }
  
  return (
    <AuthFormWrapper
      titleKey="auth.sign-up.title"
      title="Sign up"
      subtitleKey="auth.sign-up.subtitle"
      subtitle="Create a new account to get started"
    >
      <SignUpForm />
    </AuthFormWrapper>
  )
}
