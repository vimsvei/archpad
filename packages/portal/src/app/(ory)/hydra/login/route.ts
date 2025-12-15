import { NextResponse } from "next/server"
import { getServerSession } from "@ory/nextjs/app"

type HydraLoginRequest = {
  challenge: string
  requested_scope?: string[]
  subject?: string
  skip?: boolean
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const challenge = url.searchParams.get("login_challenge")
  if (!challenge) {
    return NextResponse.json({ error: "Missing login_challenge" }, { status: 400 })
  }

  const session = await getServerSession()
  if (!session) {
    const returnTo = `/hydra/login?login_challenge=${encodeURIComponent(challenge)}`
    return NextResponse.redirect(`/sign-in?return_to=${encodeURIComponent(returnTo)}`)
  }

  const subject = (session as any)?.identity?.id
  if (!subject) return NextResponse.json({ error: "Missing Kratos subject" }, { status: 500 })

  const hydraAdminUrl = process.env.HYDRA_ADMIN_URL ?? "http://hydra:4445"

  const getReq = await fetch(
    `${hydraAdminUrl}/oauth2/auth/requests/login?login_challenge=${encodeURIComponent(challenge)}`,
    { cache: "no-store" }
  )
  const loginReq = (await getReq.json()) as Partial<HydraLoginRequest> & { error?: any }
  if (!getReq.ok) {
    return NextResponse.json({ error: "Failed to get login request", details: loginReq }, { status: 500 })
  }

  const accept = await fetch(
    `${hydraAdminUrl}/oauth2/auth/requests/login/accept?login_challenge=${encodeURIComponent(challenge)}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ subject, remember: true, remember_for: 3600 }),
    }
  )
  const acceptJson = (await accept.json()) as { redirect_to?: string; error?: any }
  if (!accept.ok || !acceptJson.redirect_to) {
    return NextResponse.json({ error: "Failed to accept login", details: acceptJson }, { status: 500 })
  }

  return NextResponse.redirect(acceptJson.redirect_to)
}
