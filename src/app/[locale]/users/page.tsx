import React, { Suspense } from "react";
import catchError from "@/lib/utils/catch-error";
import { getUsers } from "@/lib/apis/users.api";
import { getClients } from "@/lib/apis/clients.api";
import UserList from "./_components/user-list";
import UserCreateForm from "./_components/user-create-form";

export default async function page() {
  // Fetch
  const [payloadUsers, errorUsers] = await catchError(getUsers());
  const [payloadClients, errorClients] = await catchError(getClients());

  // Error
  if (errorUsers || errorClients)
    return <p>{errorUsers?.message || errorClients?.message}</p>;

  return (
    <section>
      {/* Create new employee */}
      <UserCreateForm clients={payloadClients?.data.clients || []} />

      <Suspense fallback={<p>loading...</p>}>
        <div className="w-full overflow-x-auto">
          <UserList
            users={payloadUsers?.data.users}
            clients={payloadClients?.data.clients || []}
          />
        </div>
      </Suspense>
    </section>
  );
}
