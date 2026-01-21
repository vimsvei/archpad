import { redirect } from 'next/navigation'
import { cookies } from "next/headers"

type LocaleRootPageProps = {
  params: Promise<{ locale: string }>
}

export default async function LocaleRootPage({ params }: LocaleRootPageProps) {
  const { locale } = await params

  const c = await cookies()
  if (c.get("archpad_access_token")?.value) {
    redirect(`/dashboard`)
  }

  redirect(`/sign-in`)
}
