import { ImageResponse } from "next/og";
import { renderLogo } from "./_images/assets";

/** Browser-tab icon: the YIMBY Arvada logo on a transparent background. */

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  const width = size.width;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {await renderLogo(width)}
    </div>,
    size,
  );
}
