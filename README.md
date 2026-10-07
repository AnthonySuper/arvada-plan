# arvadaplan.com

YIMBY Arvada's recommendations for Arvada's 2026–27 comprehensive plan. Next.js, rendered
entirely on the server; the page ships no client components of its own.

```bash
npm run dev     # http://localhost:3000. Yellow TODO boxes show up here, never in production.
npm run build   # also runs the footnote check (see below)
npm run deploy  # Cloudflare, via OpenNext
```

## Where things live

| What                                   | Where                                                            |
| -------------------------------------- | ---------------------------------------------------------------- |
| Prose for each part of the page        | `src/components/sections/*`                                      |
| Colors, spacing, fonts                 | `src/app/globals.css` (start with `--brand-hue`)                 |
| Every cited source                     | `src/data/sources.tsx`                                           |
| Census numbers (generated)             | `src/data/census.json`, read via `src/data/census.ts`            |
| Hand-entered facts (G Line, CPI, etc.) | `src/data/*.ts`                                                  |
| Charts, built from the data at render  | `src/components/charts/*`                                        |
| Link preview, title, description       | `src/data/site.ts`, `src/app/opengraph-image.tsx`                |
| Favicon / iPhone home-screen icon      | `src/app/icon.tsx`, `src/app/apple-icon.tsx` (logo in `assets/`) |

## Citing a source

1. Add an entry to `src/data/sources.tsx` (a `note` plus one or more `links`).
2. Put `<Cite source="yourId" />` right after the claim.

Footnote numbers follow the order of `sources.tsx`, so keep that file in page order. After
every build, `scripts/check-footnotes.mjs` reads the generated HTML and fails if the numbers
are out of order or a source is never cited. It tells you the correct order.

## Refreshing the Census data

```bash
npm run data:census
```

This downloads population estimates and American Community Survey tables straight from
www2.census.gov (no API key needed) and rewrites `src/data/census.json`. All the numbers in
the prose and charts update with it, so check the page reads right afterwards. To pull a new
ACS table, add it to `ACS_TABLES` in `scripts/fetch-census-data.mjs`.
