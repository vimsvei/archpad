import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { OryVerificationFlow } from '@/components/ory'
import {getVerificationFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";
import { unstable_noStore as noStore } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function VerifyPage(props: OryPageParams) {
  noStore()
  const searchParams = await (props as any).searchParams
  const flow = await getVerificationFlow(config, searchParams)
  
  if (!flow) { return null }
  
  return (
    <AuthFormWrapper>
      <OryVerificationFlow
        flow={flow}
        config={config}
      />
    </AuthFormWrapper>
  )
}
