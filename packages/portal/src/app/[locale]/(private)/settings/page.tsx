import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SettingsForm } from "@/components/auth/forms/settings-form"
import { redirect } from "next/navigation"
import { unstable_noStore as noStore } from "next/cache"
import { cookies } from "next/headers"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function SettingsPage(props: any) {
  noStore()

  const c = await cookies()
  if (!c.get("archpad_access_token")?.value) {
    redirect("/sign-in")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <SettingsForm />
      </CardContent>
    </Card>
  )
}


