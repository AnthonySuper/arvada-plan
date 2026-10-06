import type { SourceId } from "@/data/sources";
import { FOOTNOTES_HEADING_ID, footnoteId, footnoteNumber, nextReferenceId } from "./registry";
import styles from "./footnotes.module.css";

/**
 * A footnote reference. Put it right after the claim it supports:
 *
 *   Rent went up 76%<Cite source="medianRent" />.
 *
 * The source must be defined in src/data/sources.tsx.
 */
export default function Cite({ source }: { source: SourceId }) {
  return (
    <sup className={styles.ref}>
      <a
        href={`#${footnoteId(source)}`}
        id={nextReferenceId(source)}
        role="doc-noteref"
        aria-describedby={FOOTNOTES_HEADING_ID}
      >
        {footnoteNumber(source)}
      </a>
    </sup>
  );
}
