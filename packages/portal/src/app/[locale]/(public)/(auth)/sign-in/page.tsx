import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import { OryLoginFlow } from '@/components/ory/ory-flows'
import {getLoginFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";

export default async function SignInPage(props: OryPageParams) {
  const flow = await getLoginFlow(config, props.searchParams)
  
  if (!flow) {
    return null
  }

  return (
    <AuthFormWrapper>
      <OryLoginFlow
        flow={flow}
        config={config}
      />
    </AuthFormWrapper>
  )
}
