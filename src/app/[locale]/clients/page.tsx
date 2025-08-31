import React, { Suspense } from "react";
import ClientsList from "./_components/clients-list";
import ClientCreateForm from "./_components/client-create-form";
import catchError from "@/lib/utils/catch-error";
import { getSubscriptions } from "@/lib/apis/subscription.api";
import { getUsers } from "@/lib/apis/users.api";

export default async function page() {
  // Fetch
  const [payloadSubs, errorSubs] = await catchError(getSubscriptions());
  const [payloadUser, errorUser] = await catchError(getUsers());

  // Error
  if (errorSubs || errorUser)
    return <p>{errorSubs?.message || errorUser?.message}</p>;

  return (
    <section>
      {/* Create new client */}
      <ClientCreateForm
        subscriptions={payloadSubs?.data.subscriptionPlans}
        users={payloadUser.data.users}
      />

      <Suspense fallback={<p>loading...</p>}>
        <div className="w-full overflow-x-auto">
          <ClientsList
            subscriptions={payloadSubs?.data.subscriptionPlans}
            users={payloadUser.data.users}
          />
        </div>
      </Suspense>
    </section>
  );
}
