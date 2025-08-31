import { z } from "zod";
import { useTranslations } from "next-intl";

// Pattern for Mongo ObjectId
const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, {
  message: "Invalid ObjectId",
});

export const useCreateUserSchema = () => {
  const t = useTranslations();

  return z
    .object({
      name: z.string().min(1, { message: t("name-is-required") }),
      phone: z.string().min(1, { message: t("phone-required") }),
      password: z.string().min(5, { message: t("password-min-length") }),
      role: z.enum(["super admin", "admin", "coach"], {
        errorMap: () => ({ message: t("role-invalid") }),
      }),

      // Coach-specific
      salary: z.number().positive().optional(),

      // Relations
      clients: z.array(objectIdSchema).optional(),
      daysOff: z.array(z.string()).optional(),
      daysOffHistory: z
        .array(
          z.object({
            daysOff: z.array(z.string()),
            changedBy: objectIdSchema,
            changedAt: z.coerce.date().optional(),
          })
        )
        .optional(),

      // Reset fields (server-side mainly)
      passwordResetToken: z.string().optional(),
      passwordResetExpires: z.coerce.date().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.role === "coach" && data.salary === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salary"],
          message: t("salary-required-for-coach"),
        });
      }
    });
};

export type CreateUserFields = z.infer<ReturnType<typeof useCreateUserSchema>>;

export const useUpdateUserSchema = () => {
  const t = useTranslations();

  return z
    .object({
      name: z.string().optional(),
      phone: z.string().optional(),
      password: z.string().optional(),
      role: z.enum(["super admin", "admin", "coach"]).optional(),
      userId: z.string().optional(),
      salary: z.number().positive().optional(),
      clients: z.array(objectIdSchema).optional(),
      daysOff: z.array(z.string()).optional(),
      daysOffHistory: z
        .array(
          z.object({
            daysOff: z.array(z.string()),
            changedBy: objectIdSchema,
            changedAt: z.coerce.date().optional(),
          })
        )
        .optional(),
      passwordResetToken: z.string().optional(),
      passwordResetExpires: z.coerce.date().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.role === "coach" && data.salary === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["salary"],
          message: t("salary-required-for-coach"),
        });
      }
    });
};

export type UpdateUserFields = z.infer<ReturnType<typeof useUpdateUserSchema>>;
