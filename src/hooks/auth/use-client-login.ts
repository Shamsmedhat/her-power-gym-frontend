import { useRouter } from "@/i18n/routing";
import { ClientLoginFields } from "@/lib/schemes/auth.schema";
import { AuthenticationError } from "@/lib/utils/app-errors";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function useClientLogin() {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ phone, clientId }: ClientLoginFields) => {
      const response = await signIn("client-credentials", {
        phone,
        clientId,
        redirect: false,
        callbackUrl: decodeURIComponent(
          searchParams.get("callbackUrl") || "/homepage"
        ),
      });

      if (response?.error) throw new AuthenticationError(response.error);

      return response;
    },
    onSuccess: (data) => {
      // Redirect to the client dashboard after successful login
      const callbackUrl = data?.url || "/homepage";
      router.push(callbackUrl);
    },
  });

  return { isPending, error, clientLogin: mutate };
}
