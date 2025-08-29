import { useTranslations } from "next-intl";
import { z } from "zod";

export const useSubscriptionSchema = () => {
  const t = useTranslations();

  return z.object({
    name: z.string().min(3, t("name-required")),
    type: z.enum(["main", "private"]),
    durationDays: z.coerce.number().optional(),
    totalSessions: z.coerce.number().default(0),
    price: z.coerce.number().min(100, t("price-required")),
    description: z.string().optional(),
  });
};

// Example type inference
export type SubscriptionFields = z.infer<
  ReturnType<typeof useSubscriptionSchema>
>;
