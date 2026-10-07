import ChartFigure from "@/components/charts/ChartFigure";
import Timeline from "@/components/charts/Timeline";
import Cite from "@/components/footnotes/Cite";
import { Story, StoryGraphic, StoryText } from "@/components/layout/Story";
import Todo from "@/components/layout/Todo";
import { oldeTownTimeline } from "@/data/olde-town";

export default function OldeTown() {
  return (
    <Story headline="Olde Town became a statewide icon">
      <StoryText>
        <p>
          Olde Town has been the heart of Arvada for over a century. With a train station a short
          walk away, it&apos;s now easier to reach than ever.
        </p>
        <p>
          The same year the G Line opened, the Colorado chapter of the American Planning Association
          named Olde Town the very first &ldquo;Great Place in Colorado&rdquo;
          <Cite source="oldeTownGreatPlace" />.
        </p>
        <Todo>
          I couldn&apos;t find published, citable numbers showing Olde Town&apos;s growth since the
          G Line opened. That also means the page doesn&apos;t yet show that the train{" "}
          <em>caused</em> any growth. Data that would help:
          <ul>
            <li>
              The Olde Town Arvada Business Improvement District&apos;s annual reports (business
              count, employees, and foot-traffic estimates, which BIDs often buy from Placer.ai).
            </li>
            <li>
              Sales-tax collections for the Olde Town area, 2014 vs. today (the City&apos;s finance
              department tracks sales tax by area; ask for it if it isn&apos;t published).
            </li>
            <li>
              Attendance for big Olde Town events (Harvest Festival, Arvada on Tap) over time.
            </li>
            <li>
              RTD boardings at Olde Town Arvada station, or new homes and businesses permitted
              within half a mile of the station since 2019.
            </li>
          </ul>
        </Todo>
      </StoryText>
      <StoryGraphic>
        <ChartFigure caption="Milestones for Olde Town Arvada.">
          <Timeline events={oldeTownTimeline} label="Olde Town Arvada milestones" />
        </ChartFigure>
      </StoryGraphic>
    </Story>
  );
}
