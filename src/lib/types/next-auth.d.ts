/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    user: {
      name: string;
      phone: string;
      password?: string;
      role: string;
      userId?: string;
      clientId?: string;
      salary?: number;
      clients?: [string];
      daysOff?: [string];
      daysOffHistory?: [
        { daysOff: [string]; changedBy: string; changedAt: date }
      ];
    } & DatabaseProperies;
    client?: {
      _id: string;
      name: string;
      phone: string;
      clientId: string;
      subscription?: {
        _id: string;
        plan: {
          _id: string;
          name: string;
        };
        startDate: string;
        endDate: string;
        priceAtPurchase: number;
        totalSessions: number;
      };
      privatePlan?: {
        _id: string;
        plan: {
          _id: string;
          name: string;
        };
        coach: {
          _id: string;
          name: string;
        };
        totalSessions: number;
        priceAtPurchase: number;
      } | null;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
    userType?: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User["user"];
    client?: User["client"];
    userType?: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: User["user"];
    client?: User["client"];
    userType?: string;
    token: string;
  }
}
