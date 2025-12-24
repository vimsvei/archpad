import type { OryClientConfiguration } from '@ory/elements-react'

export function withLocaleSdk(
  config: OryClientConfiguration,
  _locale?: string
): OryClientConfiguration {
  const anyConfig: any = config ?? {}
  return {
    ...anyConfig,
    sdk: {
      ...(anyConfig.sdk ?? {}),
      // Keep all Ory API calls on same-origin without locale prefix.
      // Middleware will rewrite to /[locale]/... internally.
      url: '',
      options: {
        ...(anyConfig.sdk?.options ?? {}),
        credentials: 'include',
      },
    },
  }
}

