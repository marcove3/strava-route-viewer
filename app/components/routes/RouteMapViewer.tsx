import "leaflet/dist/leaflet.css";

import styles from "./RouteMapViewer.module.scss";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";

export default function RouteMapViewer({
  routeCoords,
  viewPosition,
}: {
  routeCoords: [number, number][];
  viewPosition?: [number, number];
}) {
  const center = routeCoords[0],
    zoom = 13;

  return (
    // @ts-ignore
    <MapContainer className={styles.mapContainer} center={center} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore

        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {routeCoords.length > 0 && (
        <>
          <Polyline
            positions={routeCoords}
            // @ts-ignore
            color="blue"
          />
          {viewPosition && (
            <CircleMarker
              center={viewPosition}
              // @ts-ignore
              radius={5}
              color="red"
              fillColor="red"
            />
          )}
        </>
      )}
    </MapContainer>
  );
}
