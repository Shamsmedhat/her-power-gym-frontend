import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
  const t = useTranslations();

  return z.object({
    name: z.string().min(1, { message: t("name-is-required") }),
    phone: z.string().min(1, { message: t("phone-required") }),
    password: z.string().min(5, { message: t("password-required") }),
    role: z.enum(["super-admin", "admin", "coach"], {
      errorMap: () => ({ message: t("role-invalid") }),
    }),

    // Coach-specific fields
    salary: z.number().optional(),
    clients: z.array(z.string()).optional(),
    daysOff: z.array(z.string()).optional(),
  });
};

export type RegistrationFields = z.infer<ReturnType<typeof useRegisterSchema>>;

export const useLoginSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    phone: z
      .string({ required_error: t("phone-required") })
      // .regex(/^01[0-9]{9}$/, {
      .min(9, {
        message: t("phone-invalid"),
      }),
    password: z
      .string({ required_error: t("password-required") })
      .min(1, t("password-required")),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;

export const useClientLoginSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    phone: z.string({ required_error: t("phone-required") }).min(9, {
      message: t("phone-invalid"),
    }),
    clientId: z
      .string({ required_error: t("client-id-required") })
      .min(1, { message: t("client-id-required") }),
  });
};

export type ClientLoginFields = z.infer<
  ReturnType<typeof useClientLoginSchema>
>;
