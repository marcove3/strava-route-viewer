"use client";

import { useState, useEffect } from "react";
import type { StravaRoute } from "@/types/strava";
import styles from "./page.module.scss";
import RouteRow from "@/app/components/routes/RouteRow";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<StravaRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/strava/routes");
        if (!res.ok) {
          throw new Error("Failed to fetch routes");
        }
        const data = await res.json();
        setRoutes(data);
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

  return (
    <div className={styles.routesContainer}>
      {routes.length > 0 ? (
        <ul>
          {routes.map((route) => (
            <RouteRow key={route.id} route={route} />
          ))}
        </ul>
      ) : (
        <p>You have no routes.</p>
      )}
    </div>
  );
}
