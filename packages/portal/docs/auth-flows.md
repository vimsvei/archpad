## Auth flows (Kratos + Oathkeeper + Hydra) — how UI pages are wired

This portal keeps the existing Ory stack intact:
- **Kratos**: self-service flows (login/registration/recovery/verification) + browser session cookie
- **Hydra**: OAuth2 code flow, produces an **opaque access token**
- **Oathkeeper**: protects upstream `/graphql/*` and `/rest/*` by **introspecting Hydra token**

### Why you sometimes see redirects to `/self-service/...`

Kratos browser flows use endpoints under `/self-service/*` and may respond with `302 Location: /self-service/...`.
In this portal those endpoints are **proxied** and **rewritten** so the user lands on nicer UI routes:

- **Kratos** redirects or expects submits to `/self-service/login?...`
- Next.js **middleware** (`src/proxy.ts`) rewrites:
  - `/self-service/*` → `/api/ory/self-service/*`
  - `/sessions/*` → `/api/ory/sessions/*`
- API proxy (`src/app/api/ory/self-service/[...path]/route.ts`) forwards to the real Kratos public URL and rewrites `Location`:
  - `/self-service/login` → `/sign-in`
  - `/self-service/registration` → `/sign-up`
  - `/self-service/recovery` → `/recovery`
  - `/self-service/verification` → `/verify`

### Where the UI lives

Auth pages are App Router routes:
- `src/app/[locale]/(public)/(auth)/sign-in/page.tsx`
- `src/app/[locale]/(public)/(auth)/sign-up/page.tsx`
- `src/app/[locale]/(public)/(auth)/recovery/page.tsx`
- `src/app/[locale]/(public)/(auth)/verify/page.tsx`

Each page fetches the server-side flow via `@ory/nextjs/app` and renders a **custom form** which submits to `flow.ui.action`.
The submit is handled by `src/components/auth/kratos/native-form-root.tsx` (`KratosFormRoot`):
- sends `application/x-www-form-urlencoded`
- includes cookies (`credentials: "include"`)
- handles `302 Location` (next-step redirects)
- consumes JSON error responses and updates flow state

### Debugging

In development, custom auth forms render a small **"Auth flow debug"** block showing:
- `flow.id`
- `flow.ui.action`
- `flow.ui.method`


