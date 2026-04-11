# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

Current primary web artifact is `artifacts/halefsoler-brand`, a React/Vite personal brand site for `halefsoler.io`. It is a single-page personal brand homepage inspired by premium AI/product company marketing pages and includes personal positioning, startups, metrics, projects, course promotion, blog/newsletter, social links, and a newsletter subscription form.

## Branding

- **Logo mark**: `/HS` in JetBrains Mono (monospace), the slash `/` is green (#00D9A3), "HS" is white
- **Primary Green**: `#00D9A3` — CTAs, key moments, primary buttons
- **Tech Purple**: `#7C3AED` — accents, gradients, accent color
- **Deep Navy**: `#0F172A` — backgrounds (dark mode default), headlines
- **Soft Gray**: `#94A3B8` — body text, supporting elements
- **Fonts**: Inter (sans), Instrument Serif (display/headings), JetBrains Mono (mono/logo)
- **Style**: Glassmorphism cards, gradient orbs (green/purple), Lucide icons at 1.5px stroke
- **Always dark mode** (`defaultTheme="dark"` in ThemeProvider)
- **Language**: Portuguese (pt-BR)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend artifact**: React + Vite (`artifacts/halefsoler-brand`)
- **Personal brand API**: `/api/brand-home`, `/api/newsletter`
- **Newsletter persistence**: PostgreSQL table `newsletter_subscribers`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
