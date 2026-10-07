import { ImageResponse } from "next/og";
import { PLAN_YEAR, acsBeforeAfter } from "@/data/census";
import { PREVIEW_HEADLINE, SITE_URL } from "@/data/site";
import { change, percent } from "@/lib/format";
import { LOGO_ASPECT, colors, geistFonts, renderLogo } from "./_images/assets";

/*
 * The image shown when someone shares a link to the site (iMessage, Slack,
 * Facebook, Bluesky, etc). Rendered once at build time.
 */

const rent = acsBeforeAfter("medianGrossRent");
const homes = acsBeforeAfter("medianHomeValue");

export const alt = `YIMBY Arvada logo beside the headline “${PREVIEW_HEADLINE}”. Since ${PLAN_YEAR}, rent is up ${percent(change(rent.before.value, rent.after.value))} and home prices are up ${percent(change(homes.before.value, homes.after.value))}.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        padding: "12px 22px",
        borderRadius: 999,
        background: "rgba(0, 0, 0, 0.22)",
      }}
    >
      <span style={{ fontSize: 40, fontWeight: 800, color: colors.warnTint }}>{value}</span>
      <span style={{ fontSize: 26, color: "white" }}>{label}</span>
    </div>
  );
}

export default async function OpenGraphImage() {
  const logoHeight = 330;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 56,
        padding: "0 72px",
        background: `linear-gradient(135deg, ${colors.brand}, ${colors.brandDeep})`,
        color: "white",
        fontFamily: "Geist",
      }}
    >
      {await renderLogo(Math.round(logoHeight * LOGO_ASPECT))}
      <div style={{ display: "flex", flexDirection: "column", gap: 28, flex: 1 }}>
        <div
          style={{
            fontSize: 24,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: colors.brandTint,
          }}
        >
          2026–27 Comprehensive Plan
        </div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5 }}>
          {PREVIEW_HEADLINE}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <StatPill
            value={`+${percent(change(rent.before.value, rent.after.value))}`}
            label={`rent since ${rent.before.year}`}
          />
          <StatPill
            value={`+${percent(change(homes.before.value, homes.after.value))}`}
            label="home prices"
          />
        </div>
        <div style={{ fontSize: 26, color: colors.brandTint }}>{new URL(SITE_URL).host}</div>
      </div>
    </div>,
    { ...size, fonts: await geistFonts() },
  );
}
