import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { LoginResponse } from "./lib/types/auth";
import { AuthenticationError } from "./lib/utils/app-errors";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        phone: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            phone: credentials?.phone,
            password: credentials?.password,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<LoginResponse> = await response.json();

        console.log("payload", payload);

        // Throw an auth error if the login has failed
        if ("code" in payload) {
          throw new AuthenticationError(payload.message);
        }

        // Return the user to be encoded using JWT callback
        return {
          id: payload.user._id,
          user: payload.user,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // If the user exists it was a successful login attempt, so save the new user data in the cookies
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      // Decode the user data from the token cookie and store it in the session object
      session.user = token.user;

      return session;
    },
  },
};
