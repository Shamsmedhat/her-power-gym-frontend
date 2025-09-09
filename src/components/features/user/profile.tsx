import { getMe } from "@/lib/apis/users.api";
import catchError from "@/lib/utils/catch-error";
import React, { Suspense } from "react";
import { UserProfile } from "./user-profile";
import { getClient } from "@/lib/apis/clients.api";

export default async function Profile() {
  const [payload, errors] = await catchError(getMe());

  console.log("payload", payload);
  const clients =
    payload?.data?.user.clients && payload?.data?.user.clients.length > 0
      ? (
          await Promise.all(
            payload?.data.user.clients.map(async (id: string) => {
              const [client, err] = await catchError(getClient(id));
              console.log("client", client);
              return err ? null : client?.data.client;
            })
          )
        ).filter((client): client is Client => client !== null)
      : [];

  console.log("clients", clients);
  if (errors) return <p>{errors.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<p>loading...</p>}>
          <UserProfile userData={payload?.data.user} clients={clients} />
        </Suspense>
      </div>
    </div>
  );
}
