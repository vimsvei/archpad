import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { OryRecoveryFlow } from '@/components/ory/ory-flows'
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
    <AuthFormWrapper>
      <OryRecoveryFlow
        flow={flow}
        config={config}
      />
    </AuthFormWrapper>
  )
}
