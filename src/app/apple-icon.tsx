import { ImageResponse } from "next/og";
import { renderLogo } from "./_images/assets";

/**
 * Home-screen icon for iPhones and iPads. iOS fills transparency with black and
 * rounds the corners itself, so this uses a white background with some padding.
 */

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const width = 150;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
      }}
    >
      {await renderLogo(width)}
    </div>,
    size,
  );
}
