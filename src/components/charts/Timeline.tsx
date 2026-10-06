import Cite from "@/components/footnotes/Cite";
import type { TimelineEvent } from "@/data/olde-town";
import styles from "./charts.module.css";

/** A vertical timeline generated from a list of dated events, each with a citation. */
export default function Timeline({ events, label }: { events: TimelineEvent[]; label: string }) {
  return (
    <ol className={styles.timeline} aria-label={label}>
      {events.map((event) => (
        <li key={event.date}>
          <time dateTime={event.date} className={styles.timelineYear}>
            {event.date.slice(0, 4)}
          </time>
          <span>
            {event.title}
            <Cite source={event.source} />
          </span>
        </li>
      ))}
    </ol>
  );
}
