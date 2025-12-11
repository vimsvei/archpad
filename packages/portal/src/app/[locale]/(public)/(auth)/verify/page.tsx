import { Verification } from '@ory/elements-react/theme'
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import {getVerificationFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";
import {CardHeader} from "@/components/ui/card";

export default async function VerifyPage(props: OryPageParams) {
  const flow = await getVerificationFlow(config, props.searchParams)
  
  if (!flow) { return null }
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthFormWrapper
          title="Verification"
          subtitle="Verify your email address"
        >
          <Verification
            flow={flow}
            config={config}
            components={{
              Card: {
                Header: CardHeader,
              },
            }}
          
          />
        </AuthFormWrapper>
      </div>
    </div>
  )
}
