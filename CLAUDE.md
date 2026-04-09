# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

animal.ia is a pet insurance and health management web app for the Italian market. Built with Next.js 16, TypeScript, React 19, Tailwind CSS 4, and Prisma 7 (SQLite). Features multi-language support (Italian default, English).

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (use to verify changes)
npm run lint         # ESLint
npm run test         # Vitest (run all tests)
npm run test:watch   # Vitest in watch mode
npm run db:seed      # Seed database (tsx prisma/seed.ts)

# Database
npx prisma migrate dev --name <name>   # Create + apply migration
npx prisma generate                     # Regenerate client after schema changes

# Add shadcn/ui components
npx shadcn@latest add <component-name>
```

**Important:** After modifying `prisma/schema.prisma`, run `npx prisma generate` and restart the dev server — the running process caches the old generated client.

## Architecture

### Routing & i18n

- Next.js App Router with `next-intl` for locale routing
- Italian is the default locale (no URL prefix); English uses `/en` prefix
- Routing config: `src/i18n/routing.ts`, request config: `src/i18n/request.ts`
- Translation files: `/messages/it.json` and `/messages/en.json` (flat namespaced keys)
- Server components: `getTranslations()`, client components: `useTranslations()`
- Middleware (`src/middleware.ts`) handles locale detection/redirect

### Data Layer

- **Database:** Prisma 7 with Better-SQLite3 adapter, DB file at `./dev.db` (project root)
- **Client singleton:** `src/lib/db.ts` — global singleton prevents hot-reload connection issues
- **Generated client:** Output to `src/generated/prisma/` (not `node_modules`)
- **Queries** (`src/lib/queries.ts`): Server-only read functions, all auth-gated via `getCurrentUserId()`
- **Actions** (`src/lib/actions.ts`): Server actions (`"use server"`) for mutations, use `revalidatePath()` after writes
- **Auth** (`src/lib/auth.ts`): Mock auth — always resolves to `demo@animal.ia` user. `getCurrentUserId()` throws if user not found in DB (run `npm run db:seed` to fix)

### Key Models

User → Pet → Policy, Claim (with ClaimHistory), MedicalRecord, PetDocument. Plus standalone Veterinarian (with lat/lng coords, JSON specialties field).

### Page Patterns

- **Public pages** (home, blog, shop, vet, login, legal): Use `<Header />` + `<Footer />` wrapper
- **Dashboard pages** (`/dashboard/*`): Use dashboard layout (`src/app/[locale]/dashboard/layout.tsx`) with `<DashboardSidebar />`
- **Auth-gated pages:** Call `getCurrentUserId()` in server component, catch + `redirect()` to login with `?returnTo=` param
- **Metadata:** Each page exports `generateMetadata()` using `getTranslations()` from the `metadata.*` namespace

### Styling

- Tailwind CSS 4 with CSS variables in `src/app/globals.css`
- Brand colors: `--giraffe` (#f5b73d yellow), `--sunset` (#ff7a3d orange), `--warm` (#1a1410 dark), `--cream` (#fffaf0 light)
- Shared UI class constants in `src/lib/ui.ts`: `btnPrimary`, `btnGhost`, `btnAccent`, `card`, `inputBig`, `pageTitle`, etc.
- Use `cn()` from `src/lib/utils.ts` for conditional class merging
- shadcn/ui config: `base-nova` style, icon library: `lucide`

### Path Aliases

`~/` maps to `./src/` (e.g., `import { cn } from "~/lib/utils"`)

### Testing

- Vitest with globals enabled, path alias support in `vitest.config.ts`
- Test files colocated with source: `src/data/pricing.test.ts`

## Key Patterns

### Adding Localized Content

Add keys to both `/messages/en.json` and `/messages/it.json`. Use dot-notation namespaces (e.g., `vet.searchPlaceholder`). Access via `t('vet.searchPlaceholder')`.

### Adding a Prisma Model

1. Add model to `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name <name>`
3. Run `npx prisma generate`
4. Add seed data in `prisma/seed.ts` (include `deleteMany()` in wipe section)
5. Add query functions in `src/lib/queries.ts`, server actions in `src/lib/actions.ts`
6. **Restart dev server** after generate

### Mock Login Credentials

Email: `demo@animal.ia`, Password: `demo1234`
