import { sources, type Source, type SourceId } from "@/data/sources";
import { FOOTNOTES_HEADING_ID, footnoteId, footnoteNumber, referenceId } from "./registry";
import styles from "./footnotes.module.css";

/** The numbered list of every source in src/data/sources.tsx, for the bottom of the page. */
export default function Footnotes() {
  const entries = Object.entries(sources) as [SourceId, Source][];

  return (
    <section
      className={styles.footnotes}
      role="doc-endnotes"
      aria-labelledby={FOOTNOTES_HEADING_ID}
    >
      <h2 id={FOOTNOTES_HEADING_ID}>Sources</h2>
      <ol>
        {entries.map(([id, { note, links }]) => (
          <li key={id} id={footnoteId(id)}>
            {note && <p className={styles.note}>{note}</p>}
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <a
              className={styles.backlink}
              href={`#${referenceId(id, 1)}`}
              role="doc-backlink"
              aria-label={`Back to reference ${footnoteNumber(id)}`}
            >
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
