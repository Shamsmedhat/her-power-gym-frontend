import { z } from "zod";

export const useUsersSchema = () => {
  return z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(1, "Phone is required"),
    role: z.enum(["super-admin", "admin", "coach"]),
    salary: z.number().min(0, "Salary must be positive").optional(),
    daysOff: z.array(z.string()).optional(),
    clients: z.array(z.string()).optional(),
  });
};

export type UsersFields = z.infer<ReturnType<typeof useUsersSchema>>;
