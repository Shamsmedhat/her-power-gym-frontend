import { JSON_HEADER } from "../constants/api.constant";
import { getTokenDecoded } from "../utils/get-token";

export const getClients = async () => {
  // Get token
  const token = await getTokenDecoded();

  const response = await fetch(`${process.env.API}/clients`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token?.token}`,
      ...JSON_HEADER,
    },
  });
  const payload: APIResponse<{ data: { clients: Client[] } }> =
    await response.json();

  return payload;
};
