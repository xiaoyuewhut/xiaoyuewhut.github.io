# Fuwari Notes Site

This repository is now an Astro site based on the Fuwari theme.

## Content Source

- `学习笔记/` is the source of truth for notes.
- `scripts/sync-xiaoyue-notes.mjs` syncs those notes into `src/content/posts/`.
- `src/content/posts/` is generated content and can be rebuilt at any time.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

Useful content command:

```bash
npm run sync:notes
```

## Workflow

1. Add or update Markdown files under `学习笔记/`.
2. Run `npm run dev` or `npm run sync:notes`.
3. Verify the generated site locally.
4. Run `npm run build` before shipping changes.

## Notes

- The site keeps the Fuwari theme structure in `src/`.
- Production output is written to `dist/`.
- The configured site URL is `https://xiaoyuewhut.github.io/`.
