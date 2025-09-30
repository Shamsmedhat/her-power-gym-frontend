/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginFields } from "@/lib/schemes/auth.schema";
import { AuthenticationError } from "@/lib/utils/app-errors";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function useLogin() {
  // Navigation
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ phone, password }: LoginFields) => {
      const response = await signIn("credentials", {
        phone,
        password,
        redirect: false,
        callbackUrl: decodeURIComponent(
          searchParams.get("callbackUrl") || "/homepage"
        ),
      });

      if (response?.error) throw new AuthenticationError(response.error);

      return response;
    },
  });

  return { isPending, error, login: mutate };
}
