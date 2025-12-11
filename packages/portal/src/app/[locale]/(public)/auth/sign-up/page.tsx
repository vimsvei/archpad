'use client'

import { Registration } from '@ory/elements-react/theme'
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import {getRegistrationFlow, OryPageParams} from "@ory/nextjs/app";
import config from "@/ory.config";

export default async function SignUpPage(props: OryPageParams) {
  const flow = await getRegistrationFlow(config, props.searchParams)
  
  if (!flow) { return null }
  
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthFormWrapper
          title="Sign Up"
          subtitle="Create a new account to get started"
        >
          <Registration
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
