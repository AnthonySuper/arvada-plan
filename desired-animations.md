# Desired Scrollytelling Animations for `MissingMiddle`

This document contains instructions for implementing the GSAP scroll-driven animations in the `MissingMiddle` component of the Arvada Plan website. The goal is to create a dynamic, Apple-style "scrollytelling" experience using SVG line art that morphs, draws itself, and uses camera-like zoom/pan effects, rather than just cross-fading static icons.

## The Canvas Setup
Instead of multiple discrete `div` elements fading in and out, use a **single, unified SVG canvas** (e.g., `<svg viewBox="0 0 1000 1000">`). All graphical elements should live inside this canvas.
Use a master `<g id="camera-group">` that contains the entire scene. We will animate this group's `scale`, `x`, and `y` to create the illusion of a camera zooming in, panning, and zooming out as the story progresses.

## Animation Sequence (Synchronized with Text Blocks)

The component has a series of text blocks that fade in and out on scroll. The SVG animations must be carefully synchronized with these text blocks using a single GSAP `timeline` linked to `ScrollTrigger` with `scrub: 1`.

### 1. "In most of Arvada..."
**Visual:** A single detached home on the left, and a midrise apartment on the right.
**Effect:** Use `stroke-dasharray` and `stroke-dashoffset` to "draw" the lines of the house and apartment building as the user scrolls into the section. 

### 2. "But what if somebody wants something in the middle?"
**Visual:** Focus entirely on the single-family home.
**Effect:** The "camera" (master `<g>`) zooms in (`scale: 2`) and pans (`x`, `y` translation) to center the single-family home. A subtle question mark draws itself above the roof. The midrise apartment fades out.

### 3. "Like a duplex or triplex?"
**Visual:** The single-family home physically splits and expands.
**Effect:** 
- The camera zooms out slightly.
- The original home slides to the left, while a clone (or a newly drawn path) slides out from behind it to form a **duplex**.
- Then, a third unit slides out to form a **triplex**. 
- *Pro-tip:* Animate the `d` attribute of the SVG path (path morphing) or simply translate grouped paths on the X-axis for a seamless splitting effect.

### 4. "Or a mother-in-law house..."
**Visual:** A single-family home with a smaller Accessory Dwelling Unit (ADU) in the backyard.
**Effect:** The triplex collapses back into a single home. A new, smaller home scales up (`scale: 0 to 0.5`) and drops in behind it to represent the ADU. The camera shifts slightly to frame both beautifully.

### 5. "Or a cottage court to retire in?"
**Visual:** A community of small cottages arranged around a central courtyard.
**Effect:** The camera pans out significantly. Additional small houses draw themselves in a circle around the original elements. Add some simple green landscape lines that fade in to represent the shared courtyard.

### 6. "Even in our existing mixed-use..."
**Visual:** Red tape / Bureaucracy.
**Effect:** The camera zooms back in on the houses. A massive, stylized red stamp (or warning icon) slams down (`scale: 3` down to `1`, with an elastic or bounce ease). The stroke color of the houses turns muted/gray to emphasize the restriction.

### 7. "All this red tape makes housing more expensive..."
**Visual:** Prices going up.
**Effect:** The red stamp fades, and a stylized line chart or price tag draws itself, trending upwards aggressively. The houses shrink in the background.

### 8. "We want to simplify the approval process..."
**Visual:** Transit-oriented, by-right development.
**Effect:** 
- The camera sweeps to a new part of the canvas (or the old elements slide away).
- A train smoothly translates in from the edge of the screen.
- A mix of middle-housing types (duplexes, small apartments) joyfully scale up ("pop" effect with overshoot easing) next to the transit line. 
- A bright green checkmark draws itself over the scene.

## Implementation Details for the Next Agent
- **Libraries:** The project uses `@gsap/react`, `gsap`, and `ScrollTrigger`.
- **Hooks:** Use `useGSAP(() => { ... }, { scope: containerRef })` to ensure proper cleanup and scoped selectors.
- **ScrollTrigger:** Pin the section (`pin: true`) with a long scroll distance (e.g., `end: "+=500%"`) so the user has plenty of time to scrub through the complex SVG animations.
- **Master Timeline:** Create ONE timeline: `const tl = gsap.timeline({ scrollTrigger: ... })`.
  - Use the `<` and `>` position parameters (e.g., `tl.to(..., { ... }, "<")`) to ensure the SVG animations happen at the *exact same time* the corresponding paragraph fades in.
- **Styling:** Maintain the CSS Module approach (`MissingMiddle.module.css`) for layout, but put the animation magic into the SVG properties. Keep the strokes thick (e.g., `strokeWidth={2}`) and colors consistent with the site's CSS variables (`var(--foreground)`).
