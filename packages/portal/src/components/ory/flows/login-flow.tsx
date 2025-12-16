'use client'

import type { OryClientConfiguration, OryFlowComponentOverrides } from '@ory/elements-react'
import { Login } from '@ory/elements-react/theme'
import * as React from 'react'
import type { ComponentProps } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslate } from '@tolgee/react'

import {
  AuthFlowHeading,
  defaultOryOverrides,
  OryNativeFormRoot,
  withLocaleSdk,
} from '@/components/ory/flows/common'

export function OryLoginFlow({
  flow,
  config,
  components = defaultOryOverrides,
}: {
  flow: ComponentProps<typeof Login>['flow']
  config: OryClientConfiguration
  components?: OryFlowComponentOverrides
}) {
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale
  const configWithSdk = withLocaleSdk(config, locale)
  const { t } = useTranslate()

  const [flowState, setFlowState] = React.useState(flow)
  React.useEffect(() => setFlowState(flow), [flow])

  const componentsWithFlow = React.useMemo(() => {
    return {
      ...components,
      Form: {
        ...(components as any)?.Form,
        Root: (props: any) => <OryNativeFormRoot {...props} onFlow={setFlowState} />,
      },
    } as any
  }, [components])

  return (
    <div className="grid gap-6">
      <AuthFlowHeading
        titleKey="auth.sign_in.title"
        titleDefault="Sign in"
        subtitleKey="auth.sign_in.subtitle"
        subtitleDefault="Sign in with your email and password"
      />
      <Login flow={flowState} config={configWithSdk} components={componentsWithFlow} />
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {t('auth.sign_in.footer.no_account', "Don't have an account?")}
        </span>{' '}
        <Link href="/sign-up" className="underline underline-offset-4 hover:opacity-80">
          {t('auth.sign_in.footer.sign_up', 'Sign up')}
        </Link>
      </div>
    </div>
  )
}







