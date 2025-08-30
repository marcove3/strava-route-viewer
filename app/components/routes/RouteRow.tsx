import type { StravaRoute } from "@/types/strava";
import styles from "./RouteRow.module.scss";
import { useRouter } from "next/navigation";

export default function RouteRow({ route }: { route: StravaRoute }) {
  const router = useRouter();

  return (
    <li className={styles.routeRow}>
      <button onClick={() => router.push(`/routes/${route.id}`)}>
        <h2>{route.name}</h2>
        <p>Distance: {(route.distance / 1000).toFixed(2)} km</p>
      </button>
    </li>
  );
}
