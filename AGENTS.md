# Repository Guidelines

## Project Structure & Module Organization

This is an Astro site based on the Fuwari theme. Core application code lives in `src/`: pages in `src/pages/`, layouts in `src/layouts/`, reusable UI in `src/components/`, shared constants in `src/constants/`, utilities in `src/utils/`, styles in `src/styles/`, and content schemas/posts in `src/content/`. Static public assets belong in `public/`; source images used by the app belong in `src/assets/`. Authoring notes live in `学习笔记/` and are synced into generated Markdown posts under `src/content/posts/` by `scripts/sync-xiaoyue-notes.mjs`. Build output is written to `dist/` and should not be edited manually.

## Build, Test, and Development Commands

Use the package manager declared in `package.json`: `pnpm@9.14.4`. Common commands:

- `pnpm install`: install dependencies.
- `pnpm dev`: sync notes, then start the Astro dev server.
- `pnpm sync:notes`: regenerate `src/content/posts/` from `学习笔记/`.
- `pnpm check`: run Astro diagnostics.
- `pnpm type-check`: run TypeScript checks with `tsc`.
- `pnpm build`: sync notes, build the site, and index `dist/` with Pagefind.
- `pnpm preview`: preview the production build locally.
- `pnpm new-post`: create a new post via `scripts/new-post.js`.

## Coding Style & Naming Conventions

Biome is the formatter and linter for source files. It uses tabs for indentation and double quotes for JavaScript/TypeScript. Run `pnpm format` for formatting and `pnpm lint` for lint fixes in `src/`. Keep component filenames descriptive and consistent with existing Astro/Svelte patterns. Prefer focused utilities in `src/utils/` over duplicating logic in pages or components.

## Testing Guidelines

There is no dedicated unit test suite configured. Treat `pnpm check`, `pnpm type-check`, and `pnpm build` as the required validation path before shipping. For content-only changes, also run `pnpm sync:notes` and inspect the generated page with `pnpm dev` when layout or frontmatter may be affected.

## Commit & Pull Request Guidelines

Recent history uses concise, imperative commit messages such as `Update note emphasis and refresh post dates`. `CONTRIBUTING.md` recommends Conventional Commits when possible; use formats like `fix: correct post metadata` or `docs: update note workflow`. Keep pull requests focused on one purpose, describe the user-visible change, list validation commands run, and include screenshots for visual or layout changes.

## Agent-Specific Instructions

Do not edit `dist/`, `node_modules/`, or generated posts directly unless the task explicitly requires it. Prefer changing source notes, scripts, components, or configuration, then regenerate outputs with the project commands.
