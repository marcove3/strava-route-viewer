import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

class StravaApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "StravaApiError";
    this.status = status;
  }
}

async function stravaApiFetch<T>(path: string): Promise<T> {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    throw new StravaApiError("Not authenticated", 401);
  }

  const stravaApiUrl =
    process.env.STRAVA_API_URL ?? "https://www.strava.com/api/v3";

  const res = await fetch(`${stravaApiUrl}${path}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    throw new StravaApiError(
      `Failed to fetch from Strava: ${res.statusText}`,
      res.status
    );
  }

  return res.json() as Promise<T>;
}

export { stravaApiFetch, StravaApiError };
