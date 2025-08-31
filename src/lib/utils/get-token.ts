import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export const getTokenDecoded = async () => {
  const headerToken =
    (await cookies()).get("__Secure-next-auth.session-token")?.value ??
    (await cookies()).get("next-auth.session-token")?.value;

  const token = await decode({
    token: headerToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return token?.token;
};
