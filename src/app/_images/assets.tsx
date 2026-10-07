/**
 * Files used by the generated images (link preview and icons). These are
 * rendered once at build time by next/og, which can't use CSS variables,
 * web fonts, or oklch(), hence the font files and hex colors here.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

const ASSETS = path.join(process.cwd(), "assets");

/** The YIMBY Arvada logo as a data URL. Its natural size is 640 × 557. */
export async function logoDataUrl(): Promise<string> {
  const png = await readFile(path.join(ASSETS, "yimby-arvada-logo.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

export const LOGO_ASPECT = 640 / 557;

/**
 * The logo's hexagon is see-through inside, so on anything but white the dark
 * "Arvada" lettering disappears. This hexagon (in the original 1622 × 1413 logo's
 * coordinates) runs along the middle of the logo's navy border, so drawing it in
 * white underneath fills the inside without peeking out past the edge.
 */
const LOGO_BACKING_POINTS = "60,706 430,40 1192,40 1562,706 1192,1373 430,1373";

/**
 * The logo at a given width, with its inside filled white. Call it directly
 * (`{await renderLogo(200)}`) inside a next/og image; next/og can't render async components.
 */
export async function renderLogo(width: number) {
  const height = Math.round(width / LOGO_ASPECT);
  return (
    <div style={{ display: "flex", position: "relative", width, height }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 1622 1413"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <polygon points={LOGO_BACKING_POINTS} fill="white" />
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
      <img
        src={await logoDataUrl()}
        width={width}
        height={height}
        alt=""
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

export async function geistFonts() {
  const [regular, extraBold] = await Promise.all([
    readFile(path.join(ASSETS, "fonts", "Geist-Regular.ttf")),
    readFile(path.join(ASSETS, "fonts", "Geist-ExtraBold.ttf")),
  ]);
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: extraBold, weight: 800 as const, style: "normal" as const },
  ];
}

/**
 * Hex versions of the theme colors in globals.css (computed from --brand-hue: 165
 * and --warn-hue: 30). Update these if you change the theme hues.
 */
export const colors = {
  brand: "#007f56",
  brandDeep: "#005d5e",
  brandTint: "#c0f2db",
  warnTint: "#ffb9a8",
};
