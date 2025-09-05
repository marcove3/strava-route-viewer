"use client";
import "leaflet/dist/leaflet.css";

import polyline from "@mapbox/polyline";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import { useState, useEffect } from "react";
import type { StravaRoute } from "@/types/strava";
import { useParams } from "next/navigation";

function RouteMapViewer({ route }: { route: StravaRoute | null }) {
  const coordinates: [number, number][] = route?.map?.summary_polyline
    ? polyline.decode(route.map.summary_polyline)
    : [];

  const center = coordinates[0],
    zoom = 13;
  debugger;
  return (
    <>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {coordinates.length > 0 && (
          <Polyline positions={coordinates} color="blue" />
        )}
      </MapContainer>
    </>
  );
}

export default function RouteDetailPage() {
  const params = useParams();
  const id = params.route_id;
  const [route, setRoute] = useState<StravaRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/strava/routes/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch routes");
        }
        const data = await res.json();
        setRoute(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading your routes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <RouteMapViewer route={route} />;
}
