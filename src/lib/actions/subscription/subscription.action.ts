"use server";

import { getTokenDecoded } from "@/lib/utils/get-token";
import { revalidateTag } from "next/cache";
import { SubscriptionFields } from "./../../schemes/subscriptions.schema";
import { JSON_HEADER } from "@/lib/constants/api.constant";

// Create subscription
export const createSubscriptionAction = async (
  subscriptionFields: SubscriptionFields
) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/subscriptions`, {
    method: "POST",
    body: JSON.stringify(subscriptionFields),
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });

  // Payload
  const payload: APIResponse<{ data: { subscriptionPlans: Subscription } }> =
    await respones.json();

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }
  revalidateTag("subscriptions");

  return payload;
};

// Update subscription
export const updateSubscriptionAction = async ({
  subscriptionUpdatedFields,
  id,
}: {
  subscriptionUpdatedFields: SubscriptionFields;
  id: string;
}) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/subscriptions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(subscriptionUpdatedFields),
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });

  // Payload
  const payload: APIResponse<{ data: { subscriptionPlans: Subscription } }> =
    await respones.json();

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }
  revalidateTag("subscriptions");

  return payload;
};

// Delete subscription
export const deleteSubscriptionAction = async (id: string) => {
  // User token
  const token = await getTokenDecoded();

  // Fetch
  const respones = await fetch(`${process.env.API}/subscriptions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag("subscriptions");

  // Handle 204 No Content response
  if (respones.status === 204) {
    return {
      status: "success",
      message: "Subscription plan deleted successfully",
    };
  }

  // For other status codes, try to parse JSON
  const payload: APIResponse<{ data: { subscriptionPlans: Subscription } }> =
    await respones.json();

  // Error
  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};
