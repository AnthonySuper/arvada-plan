import BarCompare from "@/components/charts/BarCompare";
import ChartFigure from "@/components/charts/ChartFigure";
import Cite from "@/components/footnotes/Cite";
import { Stat, Story, StoryGraphic, StoryText } from "@/components/layout/Story";
import Todo from "@/components/layout/Todo";
import { acsBeforeAfter, acsSeries } from "@/data/census";
import { adjustForInflation } from "@/data/inflation";
import { change, percent, usd } from "@/lib/format";

const { before, after } = acsBeforeAfter("medianGrossRent");
const income = acsBeforeAfter("medianHouseholdIncome");
const ifInflation = adjustForInflation(before.value, before.year, after.year);

export default function Rent() {
  return (
    <Story tone="bad" headline={`Rent went up by ${percent(change(before.value, after.value))}`}>
      <StoryText>
        <Stat value={`+${usd(after.value - before.value)}`}>a month, for the median rental</Stat>
        <p>
          In {before.year}, the median rent in Arvada was {usd(before.value)} a month. By{" "}
          {after.year}, it was {usd(after.value)}
          <Cite source="medianRent" />.
        </p>
        <p>
          That&apos;s far faster than prices in general. If rent had simply kept pace with
          inflation, it would be about {usd(ifInflation)} today
          <Cite source="inflation" />.
        </p>
        <Todo>
          Median household income rose by a similar amount over the same period (
          {percent(change(income.before.value, income.after.value))}, from{" "}
          {usd(income.before.value)} to {usd(income.after.value)}), so a critic could say rent
          &ldquo;kept up with incomes.&rdquo; Part of that is who can still afford to live here, but
          it&apos;s worth addressing head-on. One option: add rent burden (ACS table B25070, the
          share of renters paying 30% or more of their income on rent) to{" "}
          <code>scripts/fetch-census-data.mjs</code> and show that instead.
        </Todo>
      </StoryText>
      <StoryGraphic>
        <ChartFigure
          caption={`Median monthly gross rent (rent plus utilities) in Arvada.`}
          table={{
            caption: "Median gross rent in Arvada by year",
            columns: ["Year", "Median rent", "Margin of error"],
            rows: acsSeries("medianGrossRent").map((d) => [
              d.year,
              usd(d.value),
              `±${usd(d.moe!)}`,
            ]),
          }}
        >
          <BarCompare
            format={usd}
            bars={[
              { label: `${before.year}`, value: before.value, tone: "muted" },
              {
                label: `${after.year}, if rent had kept up with inflation`,
                value: ifInflation,
                tone: "muted",
                hypothetical: true,
              },
              { label: `${after.year}, actual`, value: after.value },
            ]}
          />
        </ChartFigure>
      </StoryGraphic>
    </Story>
  );
}
