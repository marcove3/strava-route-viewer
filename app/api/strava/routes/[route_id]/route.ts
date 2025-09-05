import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import { stravaApiFetch, StravaApiError } from "@/lib/strava";

export async function GET(
  _: Request,
  { params }: { params: { route_id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  try {
    const { route_id } = await params;
    const route = await stravaApiFetch(`/routes/${route_id}`);
    return NextResponse.json(route);
  } catch (error) {
    if (error instanceof StravaApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
