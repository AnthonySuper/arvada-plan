/**
 * Consumer Price Index for All Urban Consumers (CPI-U), U.S. city average,
 * all items, annual averages (1982-84 = 100). BLS series CUUR0000SA0.
 */
export const cpiAnnualAverage: Record<number, number> = {
  2014: 236.736,
  2024: 313.689,
};

export const CPI_SERIES_URL = "https://data.bls.gov/timeseries/CUUR0000SA0";

/** What `value` dollars in `fromYear` would be in `toYear` dollars. */
export function adjustForInflation(value: number, fromYear: number, toYear: number): number {
  const from = cpiAnnualAverage[fromYear];
  const to = cpiAnnualAverage[toYear];
  if (from === undefined || to === undefined) {
    throw new Error(`Add CPI values for ${fromYear} and ${toYear} to src/data/inflation.ts`);
  }
  return (value * to) / from;
}
