import { NextResponse } from "next/server";
import { stravaApiFetch, StravaApiError } from "@/lib/strava";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import type { StravaRoute } from "@/types/strava";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const routes = await stravaApiFetch<StravaRoute[]>(
      `/athletes/${session.user?.id}/routes`
    );
    return NextResponse.json(routes);
  } catch (error) {
    if (error instanceof StravaApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
