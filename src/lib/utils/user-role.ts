import { useSession } from "next-auth/react";

export const useUserRole = (roles: string | string[]) => {
  const { data: session } = useSession();

  const userRole = session?.user?.role;

  if (!userRole) return false;

  // Normalize roles to an array
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return allowedRoles.includes(userRole);
};
