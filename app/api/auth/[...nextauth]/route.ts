import NextAuth from "next-auth";
import Strava from "next-auth/providers/strava";

const clientId = process.env.STRAVA_CLIENT_ID ?? "";
const clientSecret = process.env.STRAVA_CLIENT_SECRET ?? "";

export const authOptions = {
  providers: [
    Strava({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: {
        params: {
          scope: "read_all",
        },
      },
    }),
  ],
};

export const handlers = NextAuth(authOptions);

export { handlers as GET, handlers as POST };
