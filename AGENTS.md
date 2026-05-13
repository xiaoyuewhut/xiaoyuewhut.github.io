# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro-backed static site based on the Fuwari theme. Source content lives in `学习笔记/` and is synced into `src/content/posts/` by `scripts/sync-xiaoyue-notes.mjs`. Shared site logic lives under `src/`, and the production build is generated to `dist/`.

## Build, Test, and Development Commands
- `npm install`: install the dependency set from `package-lock.json`.
- `npm run dev`: start the local Astro dev server for iterative editing.
- `npm run build`: produce the production bundle in `dist/`; use this as the main smoke test.
- `npm run preview`: serve the built output locally to verify the production result.

## Deployment Workflow
- Treat `学习笔记/` as the only source of truth for content edits.
- The working branch is `source`; pushing `source` triggers `.github/workflows/deploy.yml`.
- The repository must have `Settings > Pages > Build and deployment > Source` set to `GitHub Actions`.
- The deploy workflow builds the Astro site and publishes the `dist/` artifact through GitHub Pages actions.
- Do not manually edit `main` for content updates unless the user explicitly asks for a hotfix on the deployed static branch.
- For article publishing requests, update `学习笔记/`, ensure `npm run build` passes locally when feasible, then commit and push `source`.

## Coding Style & Naming Conventions
Use 2-space indentation in HTML, CSS, and JavaScript. Follow the existing style in `src/` and `scripts/sync-xiaoyue-notes.mjs`: ES modules, `const`/`let`, semicolons, and small focused helpers. Keep CSS class names descriptive and kebab-case. When adding content, prefer lower-case slugs and preserve `学习笔记/` as the source of truth.

## Testing Guidelines
There is no automated test suite configured yet. Until one exists, treat `npm run build` as the required smoke test and manually verify changed pages in both the dev server and `npm run preview`. If you add scripted tests later, place them beside the feature they cover or in a small `tests/` directory and name them after the page or module under test.

## Commit & Pull Request Guidelines
The current history is minimal and inconsistent (`rebuild site from scratch`, `1`, `2`). Use clear, imperative commit subjects instead, for example `Refine post archive layout` or `Add studio section copy`. Pull requests should include a short summary, the pages touched, screenshots for visible UI changes, and confirmation that `npm run build` completed successfully.

## Content & Asset Notes
Keep `学习笔记/` synchronized with `src/content/posts/` via `scripts/sync-xiaoyue-notes.mjs`. Reuse the shared Astro components and styles before introducing page-specific assets so the site stays lightweight and easy to maintain.
