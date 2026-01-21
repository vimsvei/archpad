import { redirect } from 'next/navigation'
import { cookies } from "next/headers"

type LocaleRootPageProps = {
  params: Promise<{ locale: string }>
}

export default async function LocaleRootPage({ params }: LocaleRootPageProps) {
  await params

  const c = await cookies()
  if (c.get("archpad_session")?.value) {
    redirect(`/dashboard`)
  }

  redirect(`/sign-in`)
}
