import { getMe } from "@/lib/apis/users.api";
import catchError from "@/lib/utils/catch-error";
import React, { Suspense } from "react";
import { UserProfile } from "./user-profile";
import { getCoachClients } from "@/lib/apis/clients.api";
import UserProfileSkeleton from "@/components/skeletons/user/user-profile.skeleton";

export default async function Profile() {
  const [payload, errors] = await catchError(getMe());

  const [payloadClients] = await catchError(getCoachClients());
  const clients = payloadClients?.data.clients;

  if (errors) return <p>{errors?.message}</p>;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-10 rounded-md">
      <div className="max-w-4xl mx-auto">
        <Suspense fallback={<UserProfileSkeleton />}>
          <UserProfile userData={payload?.data.user} clients={clients || []} />
        </Suspense>
      </div>
    </div>
  );
}
