import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import { OryVerificationFlow } from '@/components/ory/ory-flows'
import {getVerificationFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";

export default async function VerifyPage(props: OryPageParams) {
  const flow = await getVerificationFlow(config, props.searchParams)
  
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
