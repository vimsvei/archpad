'use client'

import type { OryClientConfiguration, OryFlowComponentOverrides } from '@ory/elements-react'
import { Verification } from '@ory/elements-react/theme'
import * as React from 'react'
import type { ComponentProps } from 'react'
import { useParams } from 'next/navigation'

import {
  AuthFlowHeading,
  defaultOryOverrides,
  OryNativeFormRoot,
  withLocaleSdk,
} from '@/components/ory/flows/common'

export function OryVerificationFlow({
  flow,
  config,
  components = defaultOryOverrides,
}: {
  flow: ComponentProps<typeof Verification>['flow']
  config: OryClientConfiguration
  components?: OryFlowComponentOverrides
}) {
  const params = useParams<{ locale?: string }>()
  const locale = params?.locale
  const configWithSdk = withLocaleSdk(config, locale)

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
        titleKey="auth.verify.title"
        titleDefault="Verification"
        subtitleKey="auth.verify.subtitle"
        subtitleDefault="Verify your email address"
      />
      <Verification flow={flowState} config={configWithSdk} components={componentsWithFlow} />
    </div>
  )
}





