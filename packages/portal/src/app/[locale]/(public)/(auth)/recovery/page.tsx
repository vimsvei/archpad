import { Recovery } from '@ory/elements-react/theme'
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import {getRecoveryFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";
import {CardHeader} from "@/components/ui/card";

export default async function RecoveryPage(props: OryPageParams) {
  const flow = await getRecoveryFlow(config, props.searchParams)
  
  if (!flow) { return null }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthFormWrapper
          title="Recovery"
          subtitle="Enter your email to recover your account"
        >
          <Recovery
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
