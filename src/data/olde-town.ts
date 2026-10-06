import type { SourceId } from "./sources";

export interface TimelineEvent {
  /** ISO date or year. Only the year is displayed. */
  date: string;
  title: string;
  source: SourceId;
}

/** Milestones for Olde Town Arvada, oldest first. */
export const oldeTownTimeline: TimelineEvent[] = [
  {
    date: "1998-07-15",
    title: "Downtown Arvada listed on the National Register of Historic Places",
    source: "oldeTownHistoricDistrict",
  },
  {
    date: "2019-04-26",
    title: "The G Line opens, with a station steps from Olde Town",
    source: "gLineOpening",
  },
  {
    date: "2019-10",
    title: "Named Colorado's first “Great Place” by the American Planning Association",
    source: "oldeTownGreatPlace",
  },
];
