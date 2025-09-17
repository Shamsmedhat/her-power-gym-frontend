import { z } from "zod";

export const useClientsSchema = () => {
  return z.object({
    name: z.string(),
    phone: z.string(),
    nationalId: z.string().min(1, "National ID is required"),
    subscription: z.object({
      plan: z.string(),
      priceAtPurchase: z.number(),
      startDate: z.date(),
      endDate: z.date(),
    }),
    privatePlan: z
      .object({
        plan: z.string().optional(),
        coach: z.string().optional(),
        totalSessions: z.number().optional(),
        sessions: z.array(z.string()).optional(),
        priceAtPurchase: z.number().optional(),
      })
      .optional()
      .nullable(),
  });
};

export type ClientsFields = z.infer<ReturnType<typeof useClientsSchema>>;
