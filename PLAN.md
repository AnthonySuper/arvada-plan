# Plan

This is a detailed plan document of how I want this website to look.
This website is done as part of my work with YIMBY Arvada, in order for us to attempt to advocate for some common-sense housing policies.

I am also doing this as a test to see how good new Anthropic models are at doing this kinda stuff in one-shot.

## Guidelines

- Whenever a fact or figure is cited, please provide a reference to it.
  Have this reference take the form of a footnote.
  This footnote should have proper Aria roles.
  All footnotes should be on an area at the bottom of the page.
  This footnote can include multiple links&mdash;for example, if the section of the page says "this increased 10%", the footnote should include a link to the before and after figure.
- If you can't figure out a stat I requested, please add a TODO with some suggestions for atlernate stats you could find.
  Don't hallucinate stuff.
- Use modern CSS&mdash;variables declared with `@property`, etc.
  The basic style of the website should be able to be changed mostly by changing variables.
- Keep the code readable by a human.
  I should be able to change individual bits of prose without restructuring the entire document, because I probably will rewrite your prose.
- If you need to generate a SVG or a figure, consider using a sub-agent that can work with a restricted context window, if need be.
- Keep data in a reference file if possible.
  Try to not hand-draw any SVG, but instead generate them from figures.
  If you need to introduce a build step here or something go ahead.
- Try to make use of react components here where needed.
  For example, let's say you want to display a figure centered, with a caption next to it, where each section is a set portion of the page on both mobile and desktop.
  You may wish to extract out a `<SideCaptionFigure>` component that accepts children&mdash;potentially `<SideCaptionFigureFigure>` and `<SideCaptionFigureCaption>` or something.
- Attempt to minimize client-side JS if possible

## Outline

### Intro Section: "Arvada has changed"

The purpose of this is to establish that Arvada has changed since the last plan was written in 2014.
It should start with a little section, similar to what I have now, explaining what a comprehensive plan is and when the last one was written.
This should have a brief intro section (maybe use the existing prose), and then a series of segments that show individual changes.
These should be "hero" sections that show off what is happening.
Ideally, each would have their own associated graphic.

These should include:

- "We got a new G Line"
- "That helped Olde Town became a satewide icon" (ideally with some kinda data if you can, visits, growth in specific events, whatever)
- "Our population went up, but then flattened out..." (with figures cited, and ideally a graph)

Then, a heading, saying "But not everything went so well"

- "The price of rent went up by %X"
- "The price of buying a home went up by X%" (or, if you think it's better, break this into market segments: starter home, whatever?)
- "The number of *people* per household went down by X amount" (or "Went from X to Y")

Then, a finale of the section: "Arvada got better. But it lost something along the way: affordability. Thankfully, we can use Arvada's strengths to fix the issue."

### Secondary Section: "Three Steps to make sure Arvada's future stays bright"
