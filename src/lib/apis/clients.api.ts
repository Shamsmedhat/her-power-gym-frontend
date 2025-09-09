import { JSON_HEADER } from "../constants/api.constant";
import { getTokenDecoded } from "../utils/get-token";

export const getClients = async () => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/clients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
    next: {
      tags: ["clients"],
    },
  });
  const payload: APIResponse<{ data: { clients: Client[] } }> =
    await response.json();

  return payload;
};

export const getClient = async (id: string) => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/clients/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
  });
  const payload: APIResponse<{ data: { client: Client } }> =
    await response.json();

  return payload;
};

export const getCoachClients = async () => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/clients/coach/my-clients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
    next: {
      tags: ["coach-clients"],
    },
  });
  const payload: APIResponse<{ data: { clients: Client[] } }> =
    await response.json();

  return payload;
};
