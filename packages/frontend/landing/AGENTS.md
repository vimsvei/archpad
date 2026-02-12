# AGENTS.md - ArchPad Landing

## 1) Scope
This document describes the current working rules for `packages/frontend/landing`.
Use it as the source of truth for architecture, content flow, naming, and quality checks.

## 2) Current stack (actual)
- Next.js 16.1.5 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Velite (Markdown content collections)
- shadcn/ui components
- Motion (`motion/react`)
- Lucide icons

Important conventions:
- In this codebase, router APIs are imported from `react-router`, but this is a local compatibility layer.
- Path alias in `tsconfig.json` maps `react-router` to `src/lib/react-router.tsx`.
- Do not use `react-router-dom`.
- For animations use `import { motion } from 'motion/react'`.

## 3) High-level structure
```text
packages/frontend/landing/
├── content/
│   ├── benefits/
│   ├── faq/
│   ├── features/
│   │   ├── 01-*.md ... 06-*.md
│   │   └── pages/                       # feature detail page content
│   ├── legal/
│   ├── text-blocks/
│   └── use-cases/
├── public/
│   └── images/
├── src/
│   ├── app/                             # Next app routes
│   ├── components/
│   │   ├── figma/
│   │   ├── pages/
│   │   ├── providers/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── styles/
│   ├── content.ts
│   └── content.d.ts
├── velite.config.ts
├── eslint.config.mjs
└── package.json
```

## 4) Content model (Velite)
Configured in `velite.config.ts` with these collections:
- `features`: `content/features/[0-9][0-9]-*.md`
- `featurePages`: `content/features/pages/*.md`
- `benefits`: `content/benefits/**/*.md`
- `useCases`: `content/use-cases/**/*.md`
- `faq`: `content/faq/**/*.md`
- `legalDocuments`: `content/legal/**/*.md`
- `textBlocks`: `content/text-blocks/**/*.md`

Rules:
- Prefer content edits in Markdown over hardcoded UI copy.
- Do not edit generated files in `.velite/`.
- Use `getMetadata/getMetadataValue` (text blocks) and `feature-pages` helpers for structured metadata reads.

## 5) Naming conventions
All React component filenames must be `kebab-case`.

Examples:
- `src/components/header.tsx`
- `src/components/use-cases.tsx`
- `src/components/pages/feature-page-template.tsx`
- `src/components/figma/image-with-fallback.tsx`

Notes:
- Exported component names remain PascalCase (`export function Header()` etc).
- New files in `components/`, `components/pages/`, `components/figma/` must follow `kebab-case`.

## 6) Routing conventions
Next routes live in `src/app/**/page.tsx` and compose UI from `src/components/pages/*`.

Current key routes:
- `/`
- `/pricing`
- `/register`
- `/contact`
- `/design-partner-program`
- `/privacy`
- `/terms`
- `/cookie-policy`
- `/coming-soon`
- `/features/centralized-repository`
- `/features/team-collaboration`
- `/features/automation`
- `/features/analytics`
- `/features/integrations`
- `/features/security`

## 7) Feature pages: single source of truth
Detailed feature pages are content-driven from:
- `content/features/pages/feature-*-page.md`

Implementation:
- Wrappers in `src/components/pages/feature-*.tsx`
- Shared renderer in `src/components/pages/feature-page-template.tsx`
- Data helpers in `src/lib/feature-pages.ts`

Do not duplicate these feature page texts in `text-blocks`.

## 8) Assets and media
- Use static assets from `public/images/*`.
- Do not use `figma:asset/...` imports.
- Keep consistent SVG usage in content frontmatter (`image`, `imageSrc`).

## 9) Quality tooling (enabled)
Configured in this package:
- ESLint flat config: `eslint.config.mjs`
- Prettier config: `.prettierrc`
- Prettier ignore: `.prettierignore`

`package.json` scripts:
- `pnpm --filter @archpad/landing lint`
- `pnpm --filter @archpad/landing lint:fix`
- `pnpm --filter @archpad/landing typecheck`
- `pnpm --filter @archpad/landing format`
- `pnpm --filter @archpad/landing format:check`
- `pnpm --filter @archpad/landing build`
- `pnpm --filter @archpad/landing dev`
- `pnpm --filter @archpad/landing velite`
- `pnpm --filter @archpad/landing velite:clean`

Version note:
- `prettier` is latest in this workspace line.
- `eslint` is pinned to latest compatible major with `eslint-config-next` (currently v9.x).

## 10) Coding rules
Do:
- Keep UI text and labels in content collections.
- Keep link paths absolute app routes (`/privacy`, `/terms`, etc), not filesystem paths.
- Keep component files in kebab-case.
- Reuse shared page templates/components for repeated layouts.

Do not:
- Hardcode large user-facing text blocks in page components when content exists.
- Reintroduce duplicate content sources for the same section/page.
- Edit `.velite` output manually.

## 11) Typical workflow
1. Change Markdown content in `content/*`.
2. Run `pnpm --filter @archpad/landing velite` (or `dev`/`build`, which also builds content where needed).
3. Run `pnpm --filter @archpad/landing lint`.
4. Run `pnpm --filter @archpad/landing format:check`.
5. Run `pnpm --filter @archpad/landing build`.

## 12) Pre-merge checklist
- Component filenames are kebab-case.
- No duplicate text source between component and content.
- Feature detail pages read from `content/features/pages`.
- `lint` passes.
- `format:check` passes.
- `build` passes.
