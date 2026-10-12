# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Working with me

I'm a beginner preparing for a hackathon.

- Before making changes, tell me the plan in 2–3 bullets.
- After each change, explain what you changed and why in 2 sentences.
- Don't add new npm packages without asking me first.

## Status

Freshly scaffolded with `create-next-app`; `app/page.tsx` is still the template. No app logic, data layer, or tests exist yet.

## Commands

- `npm run dev` — dev server at http://localhost:3000 (Turbopack)
- `npm run build` — production build; also the main type-check/prerender check
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- No test runner is configured.

## Next.js version caveats

Next.js 16.4 / React 19.3 — newer than most training data. Version-matched docs live in `node_modules/next/dist/docs/` (`01-app/` for the App Router); consult them before using any Next.js API.

`next.config.ts` enables options that change how code must be written:

- **`cacheComponents: true`** — Cache Components mode. Caching is opt-in via the `"use cache"` directive; runtime APIs (`cookies()`, `headers()`, `searchParams`, `connection()`) and non-deterministic values (`Math.random()`, `Date.now()`, `crypto.randomUUID()`) must be deferred to request time and wrapped in `<Suspense>`, or the build errors. See `01-app/01-getting-started/08-caching.md`.
- **`partialPrefetching: true`** — `<Link>` prefetches only a route's static/cached App Shell; use `<Link prefetch={true}>` to prefetch URL-specific content. See `01-app/02-guides/adopting-partial-prefetching.md`.
- **`experimental.agentFeedback: true`** — `next dev` writes and restores a block in `AGENTS.md`. Commit `AGENTS.md` changes rather than reverting them. See `01-app/02-guides/ai-agents.md`.

## Structure and conventions

- App Router only (`app/`), no `src/` dir. Import alias `@/*` maps to the repo root.
- Layout and page props use the globally generated route-typed helpers (for example, `LayoutProps<"/">` in `app/layout.tsx`) rather than hand-written prop types.
- Tailwind CSS v4 is wired through the `@tailwindcss/turbopack` loader in `next.config.ts`. There is no `tailwind.config` or PostCSS config. Theme tokens are defined in `app/globals.css` via `@theme inline`, with dark mode driven by `prefers-color-scheme`.
- Fonts (Geist, Geist Mono) are loaded with `next/font/google` in `app/layout.tsx` and exposed as CSS variables.
