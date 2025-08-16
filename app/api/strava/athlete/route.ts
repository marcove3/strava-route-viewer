import { NextResponse } from "next/server";
import { stravaApiFetch, StravaApiError } from "@/lib/strava";
import { StravaAthlete } from "@/types/strava";

export async function GET() {
  try {
    const athlete = await stravaApiFetch<StravaAthlete>("/athlete");
    return NextResponse.json(athlete);
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
