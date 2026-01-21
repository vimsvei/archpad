import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { RecoveryForm } from '@/components/auth/forms/recovery-form'
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RecoveryPage(props: any) {
  noStore()
  return (
    <AuthFormWrapper
      titleKey="auth.recovery.title"
      title="Recovery"
      subtitleKey="auth.recovery.subtitle"
      subtitle="Enter your email to recover your account"
    >
      <RecoveryForm />
    </AuthFormWrapper>
  )
}
