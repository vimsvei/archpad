import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import { OryRecoveryFlow } from '@/components/ory/ory-flows'
import {getRecoveryFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";

export default async function RecoveryPage(props: OryPageParams) {
  const flow = await getRecoveryFlow(config, props.searchParams)
  
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
