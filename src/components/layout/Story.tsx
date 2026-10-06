import type { ReactNode } from "react";
import styles from "./Story.module.css";

/**
 * A "hero" section: a big headline and some prose next to a graphic.
 *
 *   <Story tone="good" headline="We got a new train">
 *     <StoryText>…prose…</StoryText>
 *     <StoryGraphic>…chart…</StoryGraphic>
 *   </Story>
 *
 * On wide screens the text and graphic sit side by side (alternating sides from
 * one Story to the next); on narrow screens they stack, text first.
 */
export function Story({
  headline,
  tone = "good",
  children,
}: {
  headline: ReactNode;
  /** "good" uses the brand color, "bad" the warning color. Charts inside follow suit. */
  tone?: "good" | "bad";
  children: ReactNode;
}) {
  return (
    <section className={styles.story} data-tone={tone}>
      <h3 className={styles.headline}>{headline}</h3>
      {children}
    </section>
  );
}

export function StoryText({ children }: { children: ReactNode }) {
  return <div className={styles.text}>{children}</div>;
}

export function StoryGraphic({ children }: { children: ReactNode }) {
  return <div className={styles.graphic}>{children}</div>;
}

/**
 * A big number with a short label, for leading a Story with its key figure.
 *
 *   <Stat value="+76%">median rent since 2014</Stat>
 */
export function Stat({ value, children }: { value: ReactNode; children: ReactNode }) {
  return (
    <p className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{children}</span>
    </p>
  );
}
