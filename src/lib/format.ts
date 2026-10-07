/**
 * Number formatting helpers for prose and charts.
 * Keep these boring and consistent so every number on the page reads the same way.
 */

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdCompactFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumSignificantDigits: 3,
});

const numberFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** $1,901 */
export function usd(value: number): string {
  return usdFormatter.format(value);
}

/** $659K */
export function usdCompact(value: number): string {
  return usdCompactFormatter.format(value);
}

/** 122,901 */
export function count(value: number): string {
  return numberFormatter.format(value);
}

/** 2.45 */
export function decimal(value: number, digits = 2): string {
  return value.toFixed(digits);
}

/** 0.757 -> "76%" */
export function percent(ratio: number): string {
  return `${Math.round(ratio * 100)}%`;
}

/** Rounds to a "roughly" number for prose: 9,776 -> "10,000", 1,234 -> "1,200". */
export function roughly(value: number, significantDigits = 1): string {
  return count(Number(value.toPrecision(significantDigits)));
}

/** Relative change from `from` to `to`, as a ratio (0.5 = up 50%). */
export function change(from: number, to: number): number {
  return (to - from) / from;
}
