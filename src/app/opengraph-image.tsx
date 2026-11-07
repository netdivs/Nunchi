import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Nunchi Salon by Naheed — Beauty salon in Wapda Town, Lahore";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBF8F2",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            border: "1px solid rgba(174,138,79,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -200,
            width: 640,
            height: 640,
            borderRadius: "50%",
            border: "1px solid rgba(174,138,79,0.3)",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 17,
            letterSpacing: 9,
            color: "#AE8A4F",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Nunchi Salon by Naheed
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 23,
            letterSpacing: 2,
            color: "#6E6E6E",
          }}
        >
          Wapda Town, Lahore
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            color: "#211B13",
            fontFamily: "Georgia, 'Times New Roman', serif",
            lineHeight: 1.05,
            display: "flex",
            textAlign: "center",
          }}
        >
          Where beauty,
          <br />
          <span style={{ color: "#C6A972", fontStyle: "italic" }}>
            meets elegance.
          </span>
        </div>
        <div
          style={{
            marginTop: 40,
            width: 60,
            height: 1,
            background: "rgba(174,138,79,0.6)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
