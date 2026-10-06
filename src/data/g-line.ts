/** Facts about RTD's G Line commuter rail. */

export const gLine = {
  opened: "2019-04-26",
  lengthMiles: 11.2,
  /** Minutes between trains during the day, since the June 7, 2026 service change. */
  peakHeadwayMinutes: 15,
  frequencyRestored: "2026-06-07",
};

export interface Station {
  name: string;
  inArvada: boolean;
}

/** Stations in order, from downtown Denver out to the western end of the line. */
export const gLineStations: Station[] = [
  { name: "Union Station", inArvada: false },
  { name: "41st & Fox", inArvada: false },
  { name: "Pecos Junction", inArvada: false },
  { name: "Clear Creek/Federal", inArvada: false },
  { name: "60th & Sheridan/Arvada Gold Strike", inArvada: true },
  { name: "Olde Town Arvada", inArvada: true },
  { name: "Arvada Ridge", inArvada: true },
  { name: "Wheat Ridge/Ward", inArvada: false },
];
