# Repository Guidelines

## Project Structure & Module Organization

- `pages/` drives Nuxt 4 routing, while shared UI lives in `components/`; drop reusable logic in `libs/` and server handlers under `api/`.
- Static assets go in `public/`, processed styles or fonts in `assets/`, and localized strings in `locales/`; Tailwind config sits in `tailwind.config.ts`.
- End-to-end flows are in `tests/e2e/`, and persistent state belongs in `store/` modules or Nuxt composables.

## Build, Test, and Development Commands

- `npm install` (or `npm ci` in CI) aligns dependencies; repeat whenever `package-lock.json` changes.
- `npm run dev` serves the app at `http://localhost:3000`; use `npm run build && npm run start` to verify the production bundle.
- `npm run test`, `npm run test:headed`, and `npm run test:ui` execute the Playwright suite in headless, headed, or interactive modes.
- `npm run lint:js`, `npm run lint:style`, and `npm run lintfix` keep ESLint, Stylelint, and Prettier happy; run before pushing.

## Coding Style & Naming Conventions

- Prettier supplies two-space indentation, double quotes in templates, and semicolons; avoid manual formatting drift.
- Vue files prefer `<script setup lang="ts">`; name components in PascalCase, composables in camelCase, and route files in kebab-case.
- Tailwind utilities are the default styling tool—introduce scoped CSS only for reusable patterns that Tailwind cannot express.

## Testing Guidelines

- Specs in `tests/e2e/*.spec.ts` model complete user journeys; mirror that structure when adding scenarios.
- Keep artefacts (e.g., screenshots) in `tests/e2e/screenshots/` and name them after the scenario, following the existing `cachorro-search.png` example.
- Always run `npm run test` before a PR; if you touch locales or API routes, extend assertions to cover translated text and error states.

## Commit & Pull Request Guidelines

- Commitlint enforces Conventional Commits (`feat(search): add locale toggle`); scope names should mirror directories or domains.
- Break work into reviewable chunks, document environment or data changes in the PR body, and attach screenshots for UI updates.
- Confirm local lint/tests in the checklist and link any related issue to keep the release notes pipeline accurate.

## Environment & API Access

- Duplicate `.env.example` to `.env`, then add The Noun Project API credentials and any downstream endpoints; keep secrets out of git.
- Restart the dev server after updating env vars so Nuxt refreshes runtime config, and scrub tests of real access tokens.
