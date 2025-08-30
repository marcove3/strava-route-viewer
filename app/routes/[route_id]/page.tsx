"use client";
import { useParams } from "next/navigation";

export default function RouteDetailPage() {
  const params = useParams();
  const id = params.route_id;

  return (
    <div>
      <h1>Route Details for ID: {id}</h1>
    </div>
  );
}
