import type { ReactNode } from "react";
import styles from "./charts.module.css";

export interface Bar {
  label: ReactNode;
  value: number;
  /** "accent" draws the bar in the section color; "muted" in gray for context. */
  tone?: "accent" | "muted";
  /** Draw as an outline: for hypothetical values ("if X had happened"). */
  hypothetical?: boolean;
}

/**
 * Horizontal bars, drawn in plain HTML so the labels stay readable at any width.
 * Bars are scaled from zero so lengths are honest.
 */
export default function BarCompare({
  bars,
  format,
}: {
  bars: Bar[];
  format: (value: number) => string;
}) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <ol className={styles.bars}>
      {bars.map((bar, i) => (
        <li
          key={i}
          className={styles.barRow}
          data-tone={bar.tone ?? "accent"}
          data-hypothetical={bar.hypothetical || undefined}
          style={{ "--bar-fraction": bar.value / max } as React.CSSProperties}
        >
          <span className={styles.barLabel}>{bar.label}</span>
          <span className={styles.barTrack}>
            <span className={styles.barFill} />
            <span className={styles.barValue}>{format(bar.value)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
