'use client'

import type { OryClientConfiguration, OryFlowComponentOverrides } from '@ory/elements-react'
import { Registration } from '@ory/elements-react/theme'
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

export function OryRegistrationFlow({
  flow,
  config,
  components = defaultOryOverrides,
}: {
  flow: ComponentProps<typeof Registration>['flow']
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
        titleKey="auth.sign_up.title"
        titleDefault="Sign up"
        subtitleKey="auth.sign_up.subtitle"
        subtitleDefault="Create a new account to get started"
      />
      <Registration flow={flowState} config={configWithSdk} components={componentsWithFlow} />
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {t('auth.sign_up.footer.have_account', 'Already have an account?')}
        </span>{' '}
        <Link href="/sign-in" className="underline underline-offset-4 hover:opacity-80">
          {t('auth.sign_up.footer.sign_in', 'Sign in')}
        </Link>
      </div>
    </div>
  )
}




