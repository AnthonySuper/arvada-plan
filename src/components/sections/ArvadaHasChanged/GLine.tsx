import RouteDiagram from "@/components/charts/RouteDiagram";
import ChartFigure from "@/components/charts/ChartFigure";
import Cite from "@/components/footnotes/Cite";
import { Stat, Story, StoryGraphic, StoryText } from "@/components/layout/Story";
import { gLine, gLineStations } from "@/data/g-line";

const arvadaStations = gLineStations.filter((s) => s.inArvada).length;

export default function GLine() {
  return (
    <Story headline="We got a new train">
      <StoryText>
        <Stat value={`${arvadaStations} stations`}>on the G Line, right here in Arvada</Stat>
        <p>
          When the last plan was written, Arvada had no rail service at all. In April 2019, the G
          Line opened: {gLine.lengthMiles} miles of electric commuter rail connecting Arvada to
          Union Station in downtown Denver
          <Cite source="gLineOpening" />.
        </p>
        <p>
          And as of June 2026, trains run every {gLine.peakHeadwayMinutes} minutes for most of the
          day again
          <Cite source="gLineFrequency" />.
        </p>
      </StoryText>
      <StoryGraphic>
        <ChartFigure caption="G Line stations, from downtown Denver to Wheat Ridge.">
          <RouteDiagram name="G Line" stations={gLineStations} highlightLabel="Arvada" />
        </ChartFigure>
      </StoryGraphic>
    </Story>
  );
}
