'use client'

import { Verification } from '@ory/elements-react'
import { AuthFormWrapper } from '@/components/auth/auth-form-wrapper'
import { useSearchParams } from 'next/navigation'
import { usePathname } from '@/navigation'

export default function VerifyPage() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const flow = searchParams.get('flow')
  
  // Get base path without locale
  const basePath = pathname.split('/').slice(2).join('/') || ''
  const loginURL = basePath ? `/sign-in` : '/sign-in'

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AuthFormWrapper
          title="Verification"
          subtitle="Verify your email address"
        >
          <Verification
            flow={flow || undefined}
            flowType="verification"
            additionalProps={{
              loginURL: loginURL,
            }}
          />
        </AuthFormWrapper>
      </div>
    </div>
  )
}
