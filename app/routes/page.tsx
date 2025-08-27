"use client";

import { useState, useEffect } from "react";
import { StravaRoute } from "@/types/strava";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<StravaRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
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
    };

    fetchRoutes();
  }, []);

  if (loading) {
    return <div>Loading your routes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>My Strava Routes</h1>
      {routes.length > 0 ? (
        <ul>
          {routes.map((route) => (
            <li key={route.id}>
              <h2>{route.name}</h2>
              <p>Distance: {(route.distance / 1000).toFixed(2)} km</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have no routes.</p>
      )}
    </div>
  );
}
