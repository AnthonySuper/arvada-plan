import ChartFigure from "@/components/charts/ChartFigure";
import LineChart from "@/components/charts/LineChart";
import Cite from "@/components/footnotes/Cite";
import { Story, StoryGraphic, StoryText } from "@/components/layout/Story";
import { PLAN_YEAR, population, populationSeries } from "@/data/census";
import { count, roughly } from "@/lib/format";

const { planYear, peak, latest } = population;

export default function Population() {
  return (
    <Story headline="Our population went up, but then flattened out">
      <StoryText>
        <p>
          In {planYear.year}, Arvada had an estimated {count(planYear.value)} residents. By{" "}
          {peak.year}, it had {count(peak.value)}: roughly {roughly(peak.value - planYear.value)}{" "}
          new neighbors in just {peak.year - planYear.year} years
          <Cite source="population" />.
        </p>
        <p>
          Since then, growth has stalled. In {latest.year}, Arvada had {count(latest.value)}{" "}
          residents, about {roughly(peak.value - latest.value, 2)} fewer than at its {peak.year}{" "}
          peak.
        </p>
      </StoryText>
      <StoryGraphic>
        <ChartFigure
          caption="Estimated population of Arvada on July 1 of each year."
          table={{
            caption: "Arvada population estimates by year",
            columns: ["Year", "Population"],
            rows: populationSeries.map((d) => [d.year, count(d.value)]),
          }}
        >
          <LineChart
            id="population-chart"
            title={`Arvada population, ${populationSeries[0].year} to ${latest.year}`}
            description={`Population rose from ${count(populationSeries[0].value)} to a peak of ${count(peak.value)} in ${peak.year}, then dipped and leveled off at ${count(latest.value)} in ${latest.year}.`}
            series={[{ label: "Population", points: populationSeries }]}
            format={(v) => `${Math.round(v / 1000)}K`}
            annotations={[{ year: PLAN_YEAR, label: "Last plan" }]}
          />
        </ChartFigure>
      </StoryGraphic>
    </Story>
  );
}
