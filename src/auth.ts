import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.constant";
import { LoginResponse, ClientLoginResponse } from "./lib/types/auth";
import { AuthenticationError } from "./lib/utils/app-errors";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
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

        // Throw an auth error if the login has failed
        if ("statusCode" in payload) {
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
    Credentials({
      id: "client-credentials",
      name: "Client Credentials",
      credentials: {
        phone: {},
        clientId: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(`${process.env.API}/auth/login-client`, {
          method: "POST",
          body: JSON.stringify({
            phone: credentials?.phone,
            clientId: credentials?.clientId,
          }),
          headers: {
            ...JSON_HEADER,
          },
        });

        const payload: APIResponse<ClientLoginResponse> = await response.json();

        // Throw an auth error if the login has failed
        if ("statusCode" in payload) {
          throw new AuthenticationError(payload.message);
        }

        // Return the client to be encoded using JWT callback
        return {
          id: payload.data.user._id,
          user: payload.data.user,
          client: payload.data.client,
          userType: "client",
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
        token.client = user.client;
        token.userType = (user.user.role as string) || "user";
        token.token = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      // Decode the user data from the token cookie and store it in the session object
      session.user = token.user;
      session.client = token.client;
      session.userType = token.userType as string;

      return session;
    },
    redirect: ({ url, baseUrl }) => {
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        // Check if URL already has a locale prefix
        const hasLocale = url.startsWith("/ar/") || url.startsWith("/en/");
        if (hasLocale) {
          return `${baseUrl}${url}`;
        }
        // Add default locale (Arabic) if no locale is present
        return `${baseUrl}/ar${url}`;
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/ar/homepage`;
    },
  },
};
