import { JSON_HEADER } from "../constants/api.constant";
import { getTokenDecoded } from "../utils/get-token";

export const getUsers = async () => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
    next: {
      tags: ["users"],
    },
  });
  const payload: APIResponse<{ data: { users: User[] } }> =
    await response.json();

  return payload;
};

export const getUser = async (id: string) => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...JSON_HEADER,
    },
    next: {
      tags: ["users"],
    },
  });
  const payload: APIResponse<{ data: { user: User } }> = await response.json();

  return payload;
};
