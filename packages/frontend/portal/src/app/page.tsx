import { redirect } from 'next/navigation'

import { DEFAULT_LANGUAGE } from '@/tolgee/shared'

export default function RootPage() {
  // All app routes live under /[locale]/..., so "/" must redirect to a locale.
  redirect(`/${DEFAULT_LANGUAGE}`)
}


