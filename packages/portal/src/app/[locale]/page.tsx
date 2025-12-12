import { redirect } from 'next/navigation'
import { getServerSession } from '@ory/nextjs/app'

type LocaleRootPageProps = {
  params: Promise<{ locale: string }>
}

export default async function LocaleRootPage({ params }: LocaleRootPageProps) {
  const { locale } = await params

  const session = await getServerSession()
  if (session) {
    redirect(`/${locale}/dashboard`)
  }

  redirect(`/${locale}/sign-in`)
}
