# AGENTS.md - Archpad Monorepo

## 1) Scope
This file provides shared rules for work across the repository.
Package-specific rules may exist (e.g., `packages/frontend/landing/AGENTS.md`) and take precedence for those areas.

## 2) Repo layout (high level)
```text
packages/
  frontend/
    landing/   # Next.js landing
    portal/    # Next.js portal
  backend/
    apps/
      auth-service/
      tenant-service/
infra/
  timeweb/     # GitOps manifests
```

## 3) Common rules
- Prefer editing source files, not build artifacts (`dist`, `.next`, `.velite`).
- Avoid logging raw PII (email, name, IP). Use hashes/masking where possible.
- Keep correlation/request IDs flowing via `X-Request-Id` headers.
- Use idempotent operations for cross-service calls when required by business logic.

## 4) Frontend: Portal (`packages/frontend/portal`)
- Next.js App Router.
- Translations are in `packages/frontend/portal/messages/*.json` (Tolgee).
  - Add new keys for UI copy; use `useTranslate()` in client components.
- Auth flows call `/api/auth/*` routes which proxy to auth-service.
- Do not place user-facing text into generated `.next` output.

## 5) Frontend: Landing (`packages/frontend/landing`)
- Follow `packages/frontend/landing/AGENTS.md` for detailed rules.
- Turnstile keys are injected at runtime (Vault -> k8s Secret -> env).
- `/api/lead` is a Next API route that validates JSON, size limits, and Turnstile.

## 6) Backend: auth-service (`packages/backend/apps/auth-service`)
- NestJS + MikroORM, schema managed by `SchemaInitializer` (no manual migrations here).
- External auth is via Keycloak; use `KeycloakService`.
- Tenant provisioning goes through `TenantServiceClient` and should be idempotent.
- Use `LoggerService` and mask sensitive data.

## 7) Backend: tenant-service (`packages/backend/apps/tenant-service`)
- Internal endpoints under `/internal`.
- Idempotency key is `keycloakId` for profile provisioning.
- Tenant/workspace defaults are read from Vault (`TENANT_DEFAULT_CODE`, `WORKSPACE_DEFAULT_CODE`).

## 8) Infra / GitOps (`infra/timeweb`)
- All cluster changes should be done via GitOps manifests here.
- Traefik routing uses `IngressRoute` + `Middleware`.
- Cluster config path: `infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml`.

## 9) Typical checks
- Landing: `pnpm --filter @archpad/landing lint`
- Portal: `pnpm --filter @archpad/portal lint` (may fail due to existing issues)
