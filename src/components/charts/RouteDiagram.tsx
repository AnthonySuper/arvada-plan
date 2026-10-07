import type { Station } from "@/data/g-line";
import styles from "./charts.module.css";

/**
 * A transit-map style diagram of a rail line, generated from a list of stations.
 * Highlighted stations get a filled dot and bold label.
 */
export default function RouteDiagram({
  name,
  stations,
  highlightLabel,
}: {
  /** e.g. "G Line" */
  name: string;
  stations: Station[];
  /** Small tag next to highlighted stations, e.g. "Arvada". */
  highlightLabel: string;
}) {
  return (
    <ol className={styles.route} aria-label={`${name} stations, from downtown Denver outward`}>
      {stations.map((station) => (
        <li key={station.name} data-highlight={station.inArvada || undefined}>
          <span className={styles.stationName}>{station.name}</span>
          {station.inArvada && <span className={styles.stationTag}>{highlightLabel}</span>}
        </li>
      ))}
    </ol>
  );
}
