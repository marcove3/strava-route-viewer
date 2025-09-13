"use client";
import "leaflet/dist/leaflet.css";

import { useState, useEffect, useMemo } from "react";
import type { StravaRoute } from "@/types/strava";
import { useParams } from "next/navigation";
import RouteMapViewer from "@/app/components/routes/RouteMapViewer";
// @ts-expect-error 3rd party import
import polyline from "@mapbox/polyline";
import Player from "@/app/components/Player";

export default function RouteDetailPage() {
  const params = useParams();
  const id = params.route_id;
  const [route, setRoute] = useState<StravaRoute | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const coordinates: [number, number][] = useMemo(
    () =>
      route?.map?.summary_polyline
        ? polyline.decode(route.map.summary_polyline)
        : [],
    [route]
  );

  const [viewPosition, setViewPosition] = useState<number>(0);

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

  useEffect(() => {
    if (coordinates.length === 0) return;

    let i = 0;
    const interval = setInterval(() => {
      setViewPosition(i);
      console.log(
        `Coordinate ${i}: [${coordinates[i][0]}, ${coordinates[i][1]}]`
      );
      i++;
      if (i >= coordinates.length) {
        clearInterval(interval);
      }
    }, 100); // 1000ms between updates

    return () => clearInterval(interval);
  }, [coordinates]);

  if (loading) {
    return <div>Loading your routes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <RouteMapViewer
        routeCoords={coordinates}
        viewPosition={coordinates[viewPosition]}
      />
      <Player
        isPlaying={false}
        onPlay={() => {}}
        onRw={() => {}}
        onFf={() => {}}
      />
    </>
  );
}
