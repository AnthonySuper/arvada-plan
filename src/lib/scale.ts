/** Tiny scale helpers for the server-rendered charts. */

export type Scale = (value: number) => number;

export function linearScale(
  [d0, d1]: readonly [number, number],
  [r0, r1]: readonly [number, number],
): Scale {
  const span = d1 - d0 || 1;
  return (value) => r0 + ((value - d0) / span) * (r1 - r0);
}

/** A "nice" step size (1, 2, 2.5 or 5 times a power of ten) for roughly `count` ticks. */
function niceStep(span: number, count: number): number {
  const raw = span / Math.max(1, count);
  const power = 10 ** Math.floor(Math.log10(raw));
  const fraction = raw / power;
  const nice =
    fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * power;
}

/** Extends [min, max] outward to round numbers and returns the tick values in between. */
export function niceTicks(min: number, max: number, count = 4) {
  const step = niceStep(max - min, count);
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  // Round to avoid 0.30000000000000004-style tick labels.
  for (let t = start; t <= end + step / 2; t += step) ticks.push(Number(t.toPrecision(12)));
  return { domain: [start, end] as const, ticks };
}
