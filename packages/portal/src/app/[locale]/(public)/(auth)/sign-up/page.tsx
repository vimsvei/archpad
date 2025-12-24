import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { OryRegistrationFlow } from '@/components/ory'
import { getRegistrationFlow, getServerSession, OryPageParams } from '@ory/nextjs/app'
import config from "../../../../../../ory.config";
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SignUpPage(props: OryPageParams) {
  noStore()

  const searchParams = await (props as any).searchParams

  // If already signed in, don't allow creating another account from this browser.
  const session = await getServerSession()
  if (session) {
    redirect('/dashboard')
  }

  const flow = await getRegistrationFlow(config, searchParams)
  
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
