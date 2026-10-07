/**
 * Every source cited on the page.
 *
 * Cite one in prose with <Cite source="someId" />.
 *
 * Footnotes are numbered in the order they appear in this file, so keep it in the
 * same order as the page. After `npm run build`, scripts/check-footnotes.mjs warns
 * you if the order is off or if a source is never cited.
 *
 * A source can have several links: e.g. a "went from X to Y" claim should link to
 * both the X and the Y.
 */
import type { ReactNode } from "react";
import { ACS_LATEST_YEAR, PLAN_YEAR, acsTableUrl, populationVintage } from "./census";
import { CPI_SERIES_URL } from "./inflation";

export interface SourceLink {
  label: ReactNode;
  href: string;
}

export interface Source {
  /** Optional explanation shown before the links. */
  note?: ReactNode;
  links: SourceLink[];
}

/** Links to the same ACS table for the plan year and the latest year. */
function acsBeforeAfterLinks(table: string, name: string): SourceLink[] {
  return [PLAN_YEAR, ACS_LATEST_YEAR].map((year) => ({
    label: `U.S. Census Bureau, American Community Survey 1-year estimates, ${year}, table ${table}: ${name} (Arvada city)`,
    href: acsTableUrl(table, year),
  }));
}

const ACS_NOTE = (
  <>
    American Community Survey figures are survey estimates with margins of error; the data tables
    under each chart include them. The Census Bureau did not publish standard 1-year estimates for
    2020.
  </>
);

export const sources = {
  planUpdate: {
    links: [
      {
        label: "City of Arvada, “2026-27 Comprehensive Plan”",
        href: "https://www.arvadaco.gov/1374/2026-27-Comprehensive-Plan",
      },
    ],
  },

  plan2014: {
    links: [
      {
        label: "City of Arvada, “2014 Comprehensive Plan”",
        href: "https://www.arvadaco.gov/307/2014-Comprehensive-Plan",
      },
    ],
  },

  gLineOpening: {
    links: [
      {
        label:
          "Streetsblog Denver, “The G Line From Denver to Arvada and Wheat Ridge Will Finally Open April 26” (April 1, 2019)",
        href: "https://denver.streetsblog.org/2019/04/01/the-g-line-from-denver-to-arvada-and-wheat-ridge-will-finally-open-april-26/",
      },
      {
        label: "Wikipedia, “G Line (RTD)” (station list)",
        href: "https://en.wikipedia.org/wiki/G_Line_(RTD)",
      },
    ],
  },

  gLineFrequency: {
    note: "15-minute service runs 6 a.m.–9 p.m. on weekdays and 8 a.m.–6 p.m. on weekends and holidays.",
    links: [
      {
        label:
          "RTD, “RTD service changes take effect today adding rail connections and increasing frequencies” (June 7, 2026)",
        href: "https://www.rtd-denver.com/community/news/2026/rtd-service-changes-take-effect-today-adding",
      },
    ],
  },

  oldeTownGreatPlace: {
    note: "Olde Town was the inaugural designee of the program, in its “Great Neighborhood” category.",
    links: [
      {
        label:
          "American Planning Association, Colorado Chapter, “Olde Town Arvada, a Colorado Great Place”",
        href: "https://www.apacolorado.org/article/olde-town-arvada-colorado-great-place",
      },
      {
        label: "Patch, “Olde Town Arvada Named A ‘Great Place’ In Colorado” (October 23, 2019)",
        href: "https://patch.com/colorado/arvada/olde-town-arvada-named-great-place-colorado",
      },
    ],
  },

  oldeTownHistoricDistrict: {
    links: [
      {
        label: "Wikipedia, “Olde Town Arvada” (National Register listing, July 15, 1998)",
        href: "https://en.wikipedia.org/wiki/Olde_Town_Arvada",
      },
    ],
  },

  population: {
    note: (
      <>
        July 1 population estimates. 2010–2019 are the Census Bureau&apos;s intercensal estimates
        (revised to line up with the 2020 Census); 2020 onward are from the Vintage{" "}
        {populationVintage} estimates.
      </>
    ),
    links: [
      {
        label: "U.S. Census Bureau, City and Town Intercensal Population Estimates, 2010–2020",
        href: "https://www2.census.gov/programs-surveys/popest/datasets/2010-2020/intercensal/cities/sub-est2020int.csv",
      },
      {
        label: `U.S. Census Bureau, City and Town Population Totals, Vintage ${populationVintage} (Colorado)`,
        href: `https://www2.census.gov/programs-surveys/popest/datasets/2020-${populationVintage}/cities/totals/sub-est${populationVintage}_8.csv`,
      },
    ],
  },

  medianRent: {
    note: <>Median gross rent (contract rent plus utilities), in nominal dollars. {ACS_NOTE}</>,
    links: acsBeforeAfterLinks("B25064", "Median Gross Rent (Dollars)"),
  },

  inflation: {
    note: `Consumer Price Index for All Urban Consumers (CPI-U), U.S. city average, annual averages for ${PLAN_YEAR} and ${ACS_LATEST_YEAR}.`,
    links: [{ label: "U.S. Bureau of Labor Statistics, series CUUR0000SA0", href: CPI_SERIES_URL }],
  },

  homeValues: {
    note: (
      <>
        Homeowners&apos; own estimates of what their home would sell for, in nominal dollars. We use
        the lower quartile (the value that a quarter of homes fall below) as a stand-in for
        &ldquo;starter homes.&rdquo; {ACS_NOTE}
      </>
    ),
    links: [
      ...acsBeforeAfterLinks("B25076", "Lower Value Quartile (Dollars)"),
      ...acsBeforeAfterLinks("B25077", "Median Value (Dollars)"),
      ...acsBeforeAfterLinks("B25078", "Upper Value Quartile (Dollars)"),
    ],
  },

  householdIncome: {
    note: "Median household income in the past 12 months, in nominal dollars.",
    links: acsBeforeAfterLinks("B19013", "Median Household Income"),
  },

  householdSize: {
    note: (
      <>
        Average household size of occupied housing units. The year-to-year wiggles are mostly
        sampling noise; the shaded band on the chart shows the 90% margin of error. {ACS_NOTE}
      </>
    ),
    links: acsBeforeAfterLinks(
      "B25010",
      "Average Household Size of Occupied Housing Units by Tenure",
    ),
  },

  aarpAdu: {
    links: [
      {
        label: "AARP, “Accessory Dwelling Units: Model State Act and Local Ordinance”",
        href: "https://www.aarp.org/livable-communities/housing/info-2015/accessory-dwelling-units-model-ordinance.html",
      },
    ],
  },
} satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;
