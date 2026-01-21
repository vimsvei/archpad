import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { VerifyForm } from '@/components/auth/forms/verify-form'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function VerifyPage(props: any) {
  noStore()
  
  return (
    <AuthFormWrapper
      titleKey="auth.verification.title"
      title="Verification"
      subtitleKey="auth.verification.subtitle"
      subtitle="Confirm your email to activate your account"
    >
      <VerifyForm />
    </AuthFormWrapper>
  )
}
