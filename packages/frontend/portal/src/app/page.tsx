import { redirect } from "next/navigation"
import { cookies } from "next/headers"

export default async function RootPage() {
  const c = await cookies()
  if (c.get("archpad_session")?.value) {
    redirect("/dashboard")
  }

  redirect("/sign-in")
}
