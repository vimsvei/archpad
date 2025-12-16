import { NextResponse } from "next/server"
import { getServerSession } from "@ory/nextjs/app"

type HydraConsentRequest = {
  challenge: string
  requested_scope: string[]
  requested_access_token_audience: string[]
  subject: string
  skip?: boolean
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const challenge = url.searchParams.get("consent_challenge")
  if (!challenge) {
    return NextResponse.json({ error: "Missing consent_challenge" }, { status: 400 })
  }

  const session = await getServerSession()
  if (!session) {
    const returnTo = `/hydra/consent?consent_challenge=${encodeURIComponent(challenge)}`
    return NextResponse.redirect(`/sign-in?return_to=${encodeURIComponent(returnTo)}`)
  }

  const hydraAdminUrl = process.env.HYDRA_ADMIN_URL ?? "http://hydra:4445"
  const getReq = await fetch(
    `${hydraAdminUrl}/oauth2/auth/requests/consent?consent_challenge=${encodeURIComponent(challenge)}`,
    { cache: "no-store" }
  )
  const consentReq = (await getReq.json()) as Partial<HydraConsentRequest> & { error?: any }
  if (!getReq.ok) {
    return NextResponse.json({ error: "Failed to get consent request", details: consentReq }, { status: 500 })
  }

  const grantScope = consentReq.requested_scope ?? []
  const audience = consentReq.requested_access_token_audience ?? []

  // Add identity metadata into Hydra session, so it becomes available in token introspection `ext`.
  // Oathkeeper can then forward X-Archpad-* / X-Hasura-* headers based on roles/tenants.
  const identity = (session as any)?.identity
  const metadataPublic = identity?.metadata_public ?? null

  const accept = await fetch(
    `${hydraAdminUrl}/oauth2/auth/requests/consent/accept?consent_challenge=${encodeURIComponent(challenge)}`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        grant_scope: grantScope,
        grant_access_token_audience: audience,
        session: {
          access_token: {
            identity: metadataPublic ? { metadata_public: metadataPublic } : undefined,
          },
          id_token: {
            identity: metadataPublic ? { metadata_public: metadataPublic } : undefined,
          },
        },
        remember: true,
        remember_for: 3600,
      }),
    }
  )
  const acceptJson = (await accept.json()) as { redirect_to?: string; error?: any }
  if (!accept.ok || !acceptJson.redirect_to) {
    return NextResponse.json({ error: "Failed to accept consent", details: acceptJson }, { status: 500 })
  }

  return NextResponse.redirect(acceptJson.redirect_to)
}
