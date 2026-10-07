import Footnotes from "@/components/footnotes/Footnotes";
import ArvadaHasChanged from "@/components/sections/ArvadaHasChanged";
import Intro from "@/components/sections/Intro";
import ThreeSteps from "@/components/sections/ThreeSteps";
import WhatIsAPlan from "@/components/sections/WhatIsAPlan";

export default function Home() {
  return (
    <main>
      <Intro />
      <WhatIsAPlan />
      <ArvadaHasChanged />
      <ThreeSteps />

      {/* Keep this last: it lists every source cited above it. */}
      <Footnotes />
    </main>
  );
}
