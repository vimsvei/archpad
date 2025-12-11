'use client'

import {Login} from "@ory/elements-react/theme";
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import {getLoginFlow, OryPageParams} from "@ory/nextjs/app";
import config from "@/ory.config";

export default async function SignInPage(props: OryPageParams) {
  
  // const searchParams = useSearchParams()
  // const pathname = usePathname()
  // const flow = searchParams.get('flow')
  const flow = await getLoginFlow(config, props.searchParams)
  
  if (!flow) { return null }
  
  // Get base path without locale
  // const basePath = pathname.split('/').slice(2).join('/') || ''
  // const recoveryURL = basePath ? `/recovery` : '/recovery'
  // const signupURL = basePath ? `/sign-up` : '/sign-up'

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
              Card: {},
            }}
          />
        </AuthFormWrapper>
      </div>
    </div>
  )
}
