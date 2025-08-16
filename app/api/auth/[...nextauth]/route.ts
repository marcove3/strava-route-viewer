import NextAuth, { AuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Strava from "next-auth/providers/strava";

const clientId = process.env.STRAVA_CLIENT_ID ?? "";
const clientSecret = process.env.STRAVA_CLIENT_SECRET ?? "";

export const authOptions: AuthOptions = {
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
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (account && user) {
        token.id = user.id;
        token.accessToken = account.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id;
      }
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
