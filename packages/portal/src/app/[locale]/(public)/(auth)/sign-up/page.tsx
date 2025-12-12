import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import { OryRegistrationFlow } from '@/components/ory/ory-flows'
import {getRegistrationFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";

export default async function SignUpPage(props: OryPageParams) {
  const flow = await getRegistrationFlow(config, props.searchParams)
  
  if (!flow) { return null }
  
  return (
    <AuthFormWrapper>
      <OryRegistrationFlow
        flow={flow}
        config={config}
      />
    </AuthFormWrapper>
  )
}
