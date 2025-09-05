// Based on the Strava API documentation: https://developers.strava.com/docs/reference/

export interface StravaAthlete {
  id: number;
  username: string;
  resource_state: number;
  firstname: string;
  lastname: string;
  city: string;
  state: string;
  country: string;
  sex: "M" | "F";
  premium: boolean;
  summit: boolean;
  created_at: string;
  updated_at: string;
  badge_type_id: number;
  profile_medium: string;
  profile: string;
}

export interface StravaRoute {
  id: number;
  id_str: string;
  athlete: {
    id: number;
    resource_state: number;
  };
  name: string;
  description: string;
  distance: number;
  elevation_gain: number;
  map: {
    id: string;
    summary_polyline: string;
    resource_state: number;
  };
  private: boolean;
  starred: boolean;
  timestamp: number;
  type: number;
  sub_type: number;
  created_at: string;
  updated_at: string;
  estimated_moving_time: number;
}
