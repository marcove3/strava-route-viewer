"use client";
import "leaflet/dist/leaflet.css";

import { useState, useEffect, useMemo } from "react";
import type { StravaRoute } from "@/types/strava";
import { useParams } from "next/navigation";
import RouteMapViewer from "@/app/components/routes/RouteMapViewer";
// @ts-expect-error 3rd party import
import polyline from "@mapbox/polyline";
import Player from "@/app/components/Player";
import styles from "./page.module.scss";

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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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

    const interval = setInterval(() => {
      if (!isPlaying) return;

      console.log(`Coordinate ${viewPosition}: [${coordinates[viewPosition]}]`);
      setViewPosition(viewPosition + 1);
      if (viewPosition >= coordinates.length) {
        setViewPosition(0);
      }
    }, 1000); // 1000ms between updates

    return () => clearInterval(interval);
  }, [viewPosition, coordinates, isPlaying]);

  if (loading) {
    return <div>Loading your routes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.pageLayout}>
      <div className={styles.topRow}>
        <RouteMapViewer
          routeCoords={coordinates}
          viewPosition={coordinates[viewPosition]}
        />
      </div>
      <Player
        isPlaying={isPlaying}
        onPlay={() => {
          setIsPlaying(!isPlaying);
        }}
        onRw={() => {
          setViewPosition(viewPosition - 1);
        }}
        onFf={() => {
          setViewPosition(viewPosition + 1);
        }}
      />
    </div>
  );
}
