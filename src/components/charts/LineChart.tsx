import type { Observation } from "@/data/census";
import { linearScale, niceTicks } from "@/lib/scale";
import styles from "./charts.module.css";

export interface LineSeries {
  label: string;
  points: Observation[];
  /** Any CSS color. Defaults to the current section's accent color. */
  color?: string;
  /** Shade the margin of error (needs `moe` on the points). */
  showBand?: boolean;
}

export interface LineAnnotation {
  year: number;
  label: string;
}

interface Props {
  /** Unique on the page; used to wire up accessible labels. */
  id: string;
  /** Short accessible name for the graphic, e.g. "Arvada population, 2010 to 2025". */
  title: string;
  /** One-sentence summary of what the chart shows, read by screen readers. */
  description: string;
  series: LineSeries[];
  /** Formats values for axis ticks, end labels, and tooltips. */
  format: (value: number) => string;
  /** Force the y-axis to start at zero. Off by default: lines don't need a zero baseline. */
  includeZero?: boolean;
  /** Vertical marker lines, e.g. the year of the last plan. */
  annotations?: LineAnnotation[];
  /** Approximate number of y-axis ticks. */
  yTickCount?: number;
}

// SVG coordinate space. The chart scales to its container; these are just proportions.
const WIDTH = 440;
const HEIGHT = 270;
const MARGIN = { top: 24, right: 60, bottom: 28, left: 56 };

/** Splits a series wherever years are missing, so gaps are drawn differently. */
function segments(points: Observation[]): Observation[][] {
  const out: Observation[][] = [];
  for (const p of points) {
    const last = out.at(-1)?.at(-1);
    if (last && p.year - last.year === 1) out.at(-1)!.push(p);
    else out.push([p]);
  }
  return out;
}

const pathFrom = (coords: [number, number][]) =>
  coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join("");

export default function LineChart({
  id,
  title,
  description,
  series,
  format,
  includeZero = false,
  annotations = [],
  yTickCount = 4,
}: Props) {
  const all = series.flatMap((s) =>
    s.points.flatMap((p) => (s.showBand && p.moe ? [p.value - p.moe, p.value + p.moe] : [p.value])),
  );
  const years = series.flatMap((s) => s.points.map((p) => p.year));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const { domain: yDomain, ticks: yTicks } = niceTicks(
    includeZero ? 0 : Math.min(...all),
    Math.max(...all),
    yTickCount,
  );
  const x = linearScale([minYear, maxYear], [MARGIN.left, WIDTH - MARGIN.right]);
  const y = linearScale(yDomain, [HEIGHT - MARGIN.bottom, MARGIN.top]);

  const yearSpan = maxYear - minYear;
  const xStep = yearSpan > 10 ? 5 : yearSpan > 5 ? 2 : 1;
  const xTicks: number[] = [];
  for (let yr = Math.ceil(minYear / xStep) * xStep; yr <= maxYear; yr += xStep) xTicks.push(yr);

  const titleId = `${id}-title`;
  const descId = `${id}-desc`;

  return (
    <div className={styles.chart}>
      {series.length > 1 && (
        <ul className={styles.legend}>
          {series.map((s) => (
            <li key={s.label}>
              <span className={styles.legendLine} style={{ background: s.color }} aria-hidden />
              {s.label}
            </li>
          ))}
        </ul>
      )}
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={styles.svg}
      >
        <title id={titleId}>{title}</title>
        <desc id={descId}>{description}</desc>

        {/* Grid & y-axis */}
        <g className={styles.grid}>
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={MARGIN.left} x2={WIDTH - MARGIN.right} y1={y(t)} y2={y(t)} />
              <text x={MARGIN.left - 8} y={y(t)} textAnchor="end" dominantBaseline="middle">
                {format(t)}
              </text>
            </g>
          ))}
        </g>

        {/* x-axis */}
        <g className={styles.axis}>
          <line
            x1={MARGIN.left}
            x2={WIDTH - MARGIN.right}
            y1={HEIGHT - MARGIN.bottom}
            y2={HEIGHT - MARGIN.bottom}
          />
          {xTicks.map((yr) => (
            <text key={yr} x={x(yr)} y={HEIGHT - MARGIN.bottom + 18} textAnchor="middle">
              {yr}
            </text>
          ))}
        </g>

        {/* Annotations */}
        {annotations.map((a) => (
          <g key={a.year} className={styles.annotation}>
            <line x1={x(a.year)} x2={x(a.year)} y1={MARGIN.top - 6} y2={HEIGHT - MARGIN.bottom} />
            <text x={x(a.year)} y={MARGIN.top - 10} textAnchor="middle">
              {a.label}
            </text>
          </g>
        ))}

        {series.map((s) => {
          const color = s.color ?? "var(--color-accent)";
          const segs = segments(s.points);
          const first = s.points[0];
          const last = s.points[s.points.length - 1];
          return (
            <g key={s.label} style={{ color }}>
              {/* Margin-of-error band */}
              {s.showBand &&
                segs.map((seg) => (
                  <path
                    key={`band-${seg[0].year}`}
                    className={styles.band}
                    d={
                      pathFrom(seg.map((p) => [x(p.year), y(p.value + (p.moe ?? 0))])) +
                      pathFrom(
                        [...seg].reverse().map((p) => [x(p.year), y(p.value - (p.moe ?? 0))]),
                      ).replace(/^M/, "L") +
                      "Z"
                    }
                  />
                ))}

              {/* Dotted connectors across years with no data */}
              {segs.slice(1).map((seg, i) => {
                const prev = segs[i][segs[i].length - 1];
                return (
                  <path
                    key={`gap-${seg[0].year}`}
                    className={styles.gap}
                    d={pathFrom([
                      [x(prev.year), y(prev.value)],
                      [x(seg[0].year), y(seg[0].value)],
                    ])}
                  />
                );
              })}

              {segs.map((seg) => (
                <path
                  key={`line-${seg[0].year}`}
                  className={styles.line}
                  d={pathFrom(seg.map((p) => [x(p.year), y(p.value)]))}
                />
              ))}

              {/* Start and end markers, plus an end label */}
              {[first, last].map((p) => (
                <circle
                  key={p.year}
                  className={styles.endDot}
                  cx={x(p.year)}
                  cy={y(p.value)}
                  r={4}
                />
              ))}
              <text
                className={styles.endLabel}
                x={x(last.year) + 8}
                y={y(last.value)}
                dominantBaseline="middle"
              >
                {format(last.value)}
              </text>

              {/* Hover targets: a native tooltip on every point, no JavaScript needed */}
              {s.points.map((p) => (
                <g key={`hit-${p.year}`} className={styles.point}>
                  <circle cx={x(p.year)} cy={y(p.value)} r={10} className={styles.hit} />
                  <circle cx={x(p.year)} cy={y(p.value)} r={4} className={styles.hoverDot} />
                  <title>
                    {`${p.year}${series.length > 1 ? ` · ${s.label}` : ""}: ${format(p.value)}${p.moe ? ` (±${format(p.moe)})` : ""}`}
                  </title>
                </g>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
