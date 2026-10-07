import { cache } from "react";
import { sources, type SourceId } from "@/data/sources";

/*
 * Footnote numbers come from the order of `sources` in src/data/sources.tsx,
 * NOT from render order. React renders large pages in chunks, so the order in
 * which <Cite /> components run isn't the order they appear on the page.
 *
 * `npm run build` runs scripts/check-footnotes.mjs afterwards, which reads the
 * built HTML and tells you if sources.tsx is out of order or has unused entries.
 */

const sourceOrder = Object.keys(sources) as SourceId[];

export const footnoteNumber = (source: SourceId) => sourceOrder.indexOf(source) + 1;
export const footnoteId = (source: SourceId) => `fn-${source}`;
export const referenceId = (source: SourceId, nth: number) => `fnref-${source}-${nth}`;
export const FOOTNOTES_HEADING_ID = "footnotes-heading";

/** Per-request count of how many times each source has been cited, for unique anchor ids. */
const getCitationCounts = cache(() => new Map<SourceId, number>());

/** Records a citation and returns a unique id for its anchor. */
export function nextReferenceId(source: SourceId): string {
  const counts = getCitationCounts();
  const nth = (counts.get(source) ?? 0) + 1;
  counts.set(source, nth);
  return referenceId(source, nth);
}
