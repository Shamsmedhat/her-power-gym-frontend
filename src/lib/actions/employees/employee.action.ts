"use server";

import { getTokenDecoded } from "@/lib/utils/get-token";
import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { UsersFields } from "@/lib/schemes/employees.schema";

// Create user
export const createUserAction = async (usersFields: UsersFields) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/users`, {
    method: "POST",
    body: JSON.stringify(usersFields),
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });

  // Payload
  const payload: APIResponse<{ data: { user: User } }> = await respones.json();

  revalidateTag("users");

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }
  if ("status" in payload && payload.status === "error") {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};

// Update user
export const updateUserAction = async ({
  userUpdatedFields,
  id,
}: {
  userUpdatedFields: UsersFields;
  id: string;
}) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(userUpdatedFields),
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });

  // Payload
  const payload: APIResponse<{ data: { user: User } }> = await respones.json();

  revalidateTag("users");

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};

// Delete user
export const deleteUserAction = async (id: string) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle 204 No Content response
  if (respones.status === 204) {
    revalidateTag("users");
    return {
      status: "success",
      message: "User deleted successfully",
    };
  }

  // For other status codes, try to parse JSON
  const payload: APIResponse<{ data: { user: User } }> = await respones.json();

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};
