import ChartFigure from "@/components/charts/ChartFigure";
import LineChart from "@/components/charts/LineChart";
import Cite from "@/components/footnotes/Cite";
import { Stat, Story, StoryGraphic, StoryText } from "@/components/layout/Story";
import Todo from "@/components/layout/Todo";
import { ACS_LATEST_YEAR, PLAN_YEAR, acsBeforeAfter, acsSeries } from "@/data/census";
import { decimal, roughly } from "@/lib/format";

const { before, after } = acsBeforeAfter("averageHouseholdSize");
const population = acsBeforeAfter("population").after;

/**
 * Rough number of extra homes needed to house today's population at today's
 * household size instead of the old one. Uses total population, which slightly
 * overstates it (some people live in dorms, nursing homes, etc.).
 */
const extraHomesNeeded = population.value / after.value - population.value / before.value;

export default function HouseholdSize() {
  return (
    <Story tone="bad" headline="Fewer people live in each home">
      <StoryText>
        <Stat value={`${decimal(before.value)} → ${decimal(after.value)}`}>
          people per household, {before.year} to {after.year}
        </Stat>
        <p>
          In {before.year}, the average Arvada household had {decimal(before.value)} people. In{" "}
          {after.year}, it had {decimal(after.value)}
          <Cite source="householdSize" />.
        </p>
        <p>
          That sounds small, but it adds up: housing the same number of people now takes about{" "}
          {roughly(extraHomesNeeded, 2)} more homes than it would have in {before.year}.
        </p>
        <Todo>
          This change is only a little bigger than the survey&apos;s margin of error. For a sturdier
          comparison, consider the 2010 and 2020 Censuses, which have no sampling error (search
          data.census.gov for &ldquo;average household size&rdquo; for Arvada city in the 2010
          Summary File 1 and the 2020 Demographic and Housing Characteristics file). The catch is
          that they only go up to 2020. Also double-check the &ldquo;more homes&rdquo; math in{" "}
          <code>HouseholdSize.tsx</code>.
        </Todo>
      </StoryText>
      <StoryGraphic>
        <ChartFigure
          caption="Average number of people per occupied home in Arvada. The shaded band is the survey's margin of error. No data for 2020."
          table={{
            caption: "Average household size in Arvada by year",
            columns: ["Year", "People per household", "Margin of error"],
            rows: acsSeries("averageHouseholdSize").map((d) => [
              d.year,
              decimal(d.value),
              `±${decimal(d.moe!)}`,
            ]),
          }}
        >
          <LineChart
            id="household-size-chart"
            title={`Average household size in Arvada, ${PLAN_YEAR} to ${ACS_LATEST_YEAR}`}
            description={`Average household size went from ${decimal(before.value)} to ${decimal(after.value)}, with year-to-year noise.`}
            series={[
              {
                label: "People per household",
                points: acsSeries("averageHouseholdSize"),
                showBand: true,
              },
            ]}
            format={(v) => decimal(v)}
            yTickCount={3}
          />
        </ChartFigure>
      </StoryGraphic>
    </Story>
  );
}
