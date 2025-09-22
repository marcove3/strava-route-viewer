("");

import React from "react";

type Props = {
  coordinates: [number, number]; // [lat, lng]
  heading?: number; // optional, default 0
  size?: string; // optional, default "600x400"
};

const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "";

export default function StreetViewImage({
  coordinates,
  heading = 0,
  size = "600x400",
}: Props) {
  const [lat, lng] = coordinates;
  const url = `https://maps.googleapis.com/maps/api/streetview?size=${size}&location=${lat},${lng}&heading=${heading}&pitch=0&key=${googleApiKey}`;

  return (
    <img
      src={url}
      alt={`Street view at ${lat},${lng} heading ${heading}`}
      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
    />
  );
}
