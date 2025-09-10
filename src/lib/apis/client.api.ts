import { getTokenDecoded } from "@/lib/utils/get-token";

export interface CoachData {
  _id: string;
  name: string;
  phone: string;
  daysOff: string[];
}

export interface ClientSubscriptionData {
  client: Client;
  remainingSessions: number;
}

export interface ClientSessionsData {
  sessions: Array<{
    _id: string;
    status: string;
    date: string;
    coach: {
      _id: string;
      name: string;
      phone: string;
    };
  }>;
}

// Get client's own data
export const getMyClientData = async (clientId: string) => {
  const token = await getTokenDecoded();
  const response = await fetch(`${process.env.API}/clients/${clientId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const payload: APIResponse<{ data: { client: Client } }> =
    await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch client data");
  }

  return payload;
};
