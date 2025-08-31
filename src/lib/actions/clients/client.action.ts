"use server";

import { getTokenDecoded } from "@/lib/utils/get-token";
import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ClientsFields } from "@/lib/schemes/clients.schema";

// Create client
export const createClientAction = async (clientsFields: ClientsFields) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/clients`, {
    method: "POST",
    body: JSON.stringify(clientsFields),
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });

  // Payload
  const payload: APIResponse<{ data: { client: Client } }> =
    await respones.json();

  revalidateTag("clients");

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }
  if ("status" in payload && payload.status === "error") {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};

// Update subscription
export const updateClientAction = async ({
  clientUpdatedFields,
  id,
}: {
  clientUpdatedFields: ClientsFields;
  id: string;
}) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/clients/${id}`, {
    method: "PATCH",
    body: JSON.stringify(clientUpdatedFields),
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });

  // Payload
  const payload: APIResponse<{ data: { client: Client } }> =
    await respones.json();

  revalidateTag("clients");

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};

// Delete client
export const deleteClientAction = async (id: string) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/clients/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Handle 204 No Content response
  if (respones.status === 204) {
    revalidateTag("clients");
    return {
      status: "success",
      message: "Client deleted successfully",
    };
  }

  // For other status codes, try to parse JSON
  const payload: APIResponse<{ data: { client: Client } }> =
    await respones.json();

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};
