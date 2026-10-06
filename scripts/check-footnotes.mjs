#!/usr/bin/env node
/**
 * Sanity-checks the footnotes in the built home page. Runs automatically after
 * `npm run build`.
 *
 * Footnote numbers come from the order of entries in src/data/sources.tsx, so if
 * prose gets moved around the numbers can end up out of order (1, 2, 4, 3...).
 * This reads the prerendered HTML and reports:
 *
 *   - footnotes whose first citation is out of order (reorder sources.tsx),
 *   - sources that are never cited (cite them or delete them),
 *   - citations or backlinks that point at something that doesn't exist.
 *
 * Exits non-zero on problems so the build fails loudly.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HTML = path.join(ROOT, ".next", "server", "app", "index.html");

if (!existsSync(HTML)) {
  console.error(
    `check-footnotes: ${path.relative(ROOT, HTML)} not found; run \`next build\` first.`,
  );
  process.exit(1);
}

const html = readFileSync(HTML, "utf8");
const problems = [];

// Every footnote reference, in document order: <a href="#fn-x" id="fnref-x-1" role="doc-noteref" ...>
const refs = [...html.matchAll(/<a\b[^>]*role="doc-noteref"[^>]*>/g)].map(([tag]) => ({
  source: tag.match(/href="#fn-([^"]+)"/)?.[1],
  id: tag.match(/id="([^"]+)"/)?.[1],
}));

// Every footnote, in list order: <li id="fn-x">
const footnotes = [...html.matchAll(/<li\b[^>]*id="fn-([^"]+)"/g)].map((m) => m[1]);

const firstCited = [...new Set(refs.map((r) => r.source))];

for (const source of firstCited) {
  if (!footnotes.includes(source))
    problems.push(`Citation of "${source}" has no matching footnote.`);
}

for (const source of footnotes) {
  if (!firstCited.includes(source)) {
    problems.push(`"${source}" is in src/data/sources.tsx but never cited. Cite it or remove it.`);
  }
}

const citedInListOrder = footnotes.filter((s) => firstCited.includes(s));
if (citedInListOrder.join() !== firstCited.join()) {
  problems.push(
    "Footnotes are numbered out of order. Reorder the entries in src/data/sources.tsx to:\n" +
      firstCited.map((s) => `      ${s}`).join("\n"),
  );
}

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
for (const [tag] of html.matchAll(/<a\b[^>]*role="doc-backlink"[^>]*>/g)) {
  const target = tag.match(/href="#([^"]+)"/)?.[1];
  if (!target || !ids.has(target)) problems.push(`Backlink points to missing #${target}.`);
}

if (problems.length) {
  console.error("check-footnotes found problems:\n");
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(
  `check-footnotes: ${footnotes.length} footnotes, ${refs.length} citations, all in order.`,
);
