# CoMapeo Icons

A Nuxt 4 application for discovering and generating colour-adjusted icon assets that can be dropped straight into [CoMapeo](https://comapeo.app/) or [Mapeo](https://mapeo.app) configurations. The app searches Iconify by default, can fall back to The Noun Project API, provides on-the-fly translations, and exports ready-to-use SVG data URIs.

## Getting Started

1. Duplicate the example environment file:

   ```bash
   cp .env.example .env
   ```

   Iconify works without credentials. Add The Noun Project credentials only if you want Noun as a fallback provider.

2. Install dependencies and launch the development server:

   ```bash
   npm install
   npm run dev
   ```

3. Visit `http://localhost:3000` and start searching.

## Available Scripts

- `npm run dev` – start the Vite-powered Nuxt dev server
- `npm run build` – compile the production bundle
- `npm run preview` – serve the built Nitro output locally
- `npm run lint` – run ESLint, Stylelint and Prettier checks
- `npm run lintfix` – autofix supported lint issues and format files
- `npm run test` – execute the Playwright end-to-end suite (headless); it starts the dev server on port `4173`, so keep that port free
- `npm run test:headed` / `npm run test:ui` – run Playwright locally in headed or UI mode

## Environment

The application supports the following variables in `.env`:

- `ICON_PROVIDER_ORDER` _(optional)_ – comma-separated provider order; defaults to `iconify,noun`
- `ICONIFY_API_BASE_URL` _(optional)_ – Iconify API base URL; defaults to `https://api.iconify.design`
- `ICONIFY_PREFIXES` _(optional)_ – comma-separated Iconify collections searched by default
- `NOUN_KEY` _(optional)_ – The Noun Project consumer key, required only when using the Noun provider
- `NOUN_SECRET` _(optional)_ – The Noun Project consumer secret, required only when using the Noun provider
- `ICONS_TO_DOWNLOAD` _(optional)_ – number of icons to fetch per request; Iconify enforces a minimum search limit of 32

Restart the dev server whenever you update these values.

## Project Structure

- `pages/` – route-driven screens backed by the Nuxt router
- `components/` – shared Vue components used across pages
- `server/` – Nitro API endpoints and supporting utilities
- `libs/` – browser-side utilities (e.g. colour filter generator)
- `locales/` – JSON translation bundles consumed by `@nuxtjs/i18n`
- `public/` – static assets served directly without processing
- `tests/e2e/` – Playwright scenarios covering key user journeys
- `types/` – TypeScript shims for external libraries without typings

The project relies on Tailwind CSS for styling and Playwright for UI verification. See `package.json` for additional scripts and tooling.
