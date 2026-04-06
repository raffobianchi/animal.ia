# CLAUDE.md

## Project Overview

animal.ia is a pet insurance and health management web application. Built with Next.js 16, TypeScript, and Tailwind CSS 4, featuring multi-language support (Italian/English).

## Commands

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Add shadcn/ui components
npx shadcn@latest add <component-name>
```

## Architecture

### Routing & i18n

- Uses Next.js App Router with locale-based routing via `next-intl`
- Italian is the default locale, English uses `/en` prefix
- Locale layouts at `src/app/[locale]/layout.tsx` wrap pages with i18n provider
- Translation files in `/messages/en.json` and `/messages/it.json`
- Use `getTranslations()` for server components, `useTranslations()` for client

### Component Structure

- `src/components/ui/` — shadcn/ui base components
- `src/components/` — Feature components (Header, HeroSection, etc.)

### Styling

- Tailwind CSS 4 with custom CSS variables in `src/app/globals.css`
- Brand colors: giraffe yellow (#d4a843), sunset orange (#e08a4a), warm dark (#2d2418), cream (#fdf8f0)
- Use `cn()` from `src/lib/utils.ts` for conditional class merging

### Path Aliases

- `~/` maps to `./src/`
