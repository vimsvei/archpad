import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { RecoveryForm } from '@/components/auth/forms/recovery-form'
import {getRecoveryFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function RecoveryPage(props: OryPageParams) {
  noStore()
  const searchParams = await (props as any).searchParams
  const flow = await getRecoveryFlow(config, searchParams)
  
  if (!flow) { return null }
  return (
    <AuthFormWrapper
      titleKey="auth.recovery.title"
      title="Recovery"
      subtitleKey="auth.recovery.subtitle"
      subtitle="Enter your email to recover your account"
    >
      <RecoveryForm flow={flow} />
    </AuthFormWrapper>
  )
}
