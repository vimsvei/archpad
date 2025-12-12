import {Login} from "@ory/elements-react/theme";
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import {getLoginFlow, OryPageParams} from "@ory/nextjs/app";
import config from "../../../../../../ory.config";
import {CardHeader} from "@/components/ui/card";

export default async function SignInPage(props: OryPageParams) {
  const flow = await getLoginFlow(config, props.searchParams)
  
  if (!flow) {
    return null
  }
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthFormWrapper
          title="Sign In"
          subtitle="Enter your credentials to access your account"
        >
          <Login
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
