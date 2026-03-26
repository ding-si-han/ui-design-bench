# AGENTS.md

## Cursor Cloud specific instructions

### Overview
Single Next.js 16 app (App Router + Tailwind CSS v4 + TypeScript) — a gallery comparing AI-generated landing pages across 6 models × 2 conditions × 5 iterations. No backend, no database, no env vars required.

### Quick reference
- **Dev server:** `npm run dev` (port 3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint` — pre-existing lint errors exist in AI-generated variant source files under `src/variants/`; these are expected and not introduced by agent changes.
- **Tests:** `npm run test:routes` (Playwright route tests, auto-starts dev server on port 3100). Install browsers first with `npx playwright install --with-deps chromium`.
- **Package manager:** npm (`package-lock.json` present)

### Non-obvious notes
- The sub-project directories (`with-frontend-design-skill/` and `without-frontend-design-skill/` at repo root) are archived source materials — they are **not** run independently. Their code is imported into the unified gallery via variant modules under `src/variants/`.
- Playwright tests auto-start their own dev server on port 3100, so you don't need `npm run dev` running separately when running tests.
- 2 of 74 Playwright route tests have pre-existing failures (heading text mismatch and a navigation element not found on the home page). These are not regressions.
