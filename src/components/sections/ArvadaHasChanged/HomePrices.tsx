import ChartFigure from "@/components/charts/ChartFigure";
import LineChart from "@/components/charts/LineChart";
import Cite from "@/components/footnotes/Cite";
import { Stat, Story, StoryGraphic, StoryText } from "@/components/layout/Story";
import { ACS_LATEST_YEAR, PLAN_YEAR, acsBeforeAfter, acsSeries } from "@/data/census";
import { change, decimal, percent, usd, usdCompact } from "@/lib/format";

const median = acsBeforeAfter("medianHomeValue");
const starter = acsBeforeAfter("lowerQuartileHomeValue");
const income = acsBeforeAfter("medianHouseholdIncome");

/** How many years of the median household's income the median home is worth. */
const yearsOfIncomeBefore = median.before.value / income.before.value;
const yearsOfIncomeAfter = median.after.value / income.after.value;

const tiers = [
  {
    label: "Most expensive quarter",
    measure: "upperQuartileHomeValue",
    color: "var(--chart-tier-3)",
  },
  { label: "Median", measure: "medianHomeValue", color: "var(--chart-tier-2)" },
  {
    label: "Starter homes (cheapest quarter)",
    measure: "lowerQuartileHomeValue",
    color: "var(--chart-tier-1)",
  },
] as const;

export default function HomePrices() {
  return (
    <Story
      tone="bad"
      headline={`Home prices went up by ${percent(change(median.before.value, median.after.value))}`}
    >
      <StoryText>
        <Stat value={`${decimal(yearsOfIncomeBefore, 1)} → ${decimal(yearsOfIncomeAfter, 1)}`}>
          years of the typical household&apos;s income to buy the typical home
        </Stat>
        <p>
          In {median.before.year}, the typical Arvada home was worth {usd(median.before.value)}. By{" "}
          {median.after.year}, it was worth {usd(median.after.value)}
          <Cite source="homeValues" />.
        </p>
        <p>
          Starter homes didn&apos;t escape it, either. A home in the cheapest quarter of the market
          went from under {usd(starter.before.value)} to under {usd(starter.after.value)}. Over the
          same years, the typical household&apos;s income went up just{" "}
          {percent(change(income.before.value, income.after.value))}
          <Cite source="householdIncome" />.
        </p>
      </StoryText>
      <StoryGraphic>
        <ChartFigure
          caption="Value of owner-occupied homes in Arvada, as estimated by their owners. No data for 2020."
          table={{
            caption: "Arvada home values by year",
            columns: ["Year", ...tiers.map((t) => t.label)],
            rows: acsSeries("medianHomeValue").map((d, i) => [
              d.year,
              ...tiers.map((t) => {
                const p = acsSeries(t.measure)[i];
                return `${usd(p.value)} ±${usd(p.moe!)}`;
              }),
            ]),
          }}
        >
          <LineChart
            id="home-value-chart"
            title={`Arvada home values, ${PLAN_YEAR} to ${ACS_LATEST_YEAR}`}
            description={`Home values roughly doubled or more at every price level. The median went from ${usd(median.before.value)} to ${usd(median.after.value)}.`}
            series={tiers.map((t) => ({
              label: t.label,
              color: t.color,
              points: acsSeries(t.measure),
            }))}
            format={usdCompact}
            includeZero
          />
        </ChartFigure>
      </StoryGraphic>
    </Story>
  );
}
