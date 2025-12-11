'use client'

import { Login } from '@ory/elements-react'
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import { useSearchParams } from 'next/navigation'
import { usePathname } from '@/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const flow = searchParams.get('flow')
  
  // Get base path without locale
  const basePath = pathname.split('/').slice(2).join('/') || ''
  const recoveryURL = basePath ? `/recovery` : '/recovery'
  const signupURL = basePath ? `/sign-up` : '/sign-up'

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthFormWrapper
          title="Sign In"
          subtitle="Enter your credentials to access your account"
        >
          <Login
            flow={flow || undefined}
            flowType="login"
            additionalProps={{
              forgotPasswordURL: recoveryURL,
              signupURL: signupURL,
            }}
          />
        </AuthFormWrapper>
      </div>
    </div>
  )
}
