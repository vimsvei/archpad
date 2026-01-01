import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "@/components/auth/forms/settings-form"
import { getServerSession, getSettingsFlow, type OryPageParams } from "@ory/nextjs/app"
import { redirect } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"

import config from "../../../../../ory.config"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function SettingsPage(props: OryPageParams) {
  noStore()

  const session = await getServerSession().catch(() => null)
  if (!session) {
    redirect("/sign-in")
  }

  type QueryParamsLike = Record<string, string | string[] | undefined>
  const searchParams = (props as unknown as { searchParams: QueryParamsLike }).searchParams
  const flow = await getSettingsFlow(config, searchParams)
  if (!flow) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <SettingsForm flow={flow} />
      </CardContent>
    </Card>
  )
}


