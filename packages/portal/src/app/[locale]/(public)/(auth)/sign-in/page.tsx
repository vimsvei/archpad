import { AuthFormWrapper } from '@/components/wrappers/auth-form-wrapper'
import { SignInForm } from '@/components/auth/forms/sign-in-form'
import { getLoginFlow, getServerSession, OryPageParams } from '@ory/nextjs/app'
import config from "../../../../../../ory.config";
import { unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SignInPage(props: OryPageParams) {
  noStore()

  const searchParams = await (props as any).searchParams

  // If user already has a valid session, Kratos will refuse login submissions (400)
  // unless `?refresh=true`. Redirect to the app instead.
  const refresh = (searchParams as any)?.refresh
  const session = await getServerSession()
  if (session && refresh !== 'true') {
    redirect('/dashboard')
  }

  const flow = await getLoginFlow(config, searchParams)
  
  if (!flow) {
    return null
  }

  return (
    <AuthFormWrapper
      titleKey="auth.sign-in.title"
      title="Sign in"
      subtitleKey="auth.sign-in.subtitle"
      subtitle="Sign in with your email and password"
    >
      <SignInForm flow={flow} />
    </AuthFormWrapper>
  )
}
