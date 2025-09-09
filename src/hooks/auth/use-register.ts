import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../../lib/actions/auth/register.action";
import catchError from "@/lib/utils/catch-error";

export default function useRegister() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegistrationFields) =>
      await catchError(registerAction(fields)),
  });

  return { isPending, error, register: mutate };
}
