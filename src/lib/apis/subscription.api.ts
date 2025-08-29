import { JSON_HEADER } from "../constants/api.constant";
import { getTokenDecoded } from "../utils/get-token";

export const getSubscriptions = async () => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/subscriptions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
    next: {
      tags: ["subscriptions"],
    },
  });
  const payload: APIResponse<{ data: { subscriptionPlans: Subscription[] } }> =
    await response.json();

  return payload;
};
