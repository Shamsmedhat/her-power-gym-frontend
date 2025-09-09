import { getClient } from "@/lib/apis/clients.api";
import catchError from "@/lib/utils/catch-error";
import { format } from "date-fns";
import UserRow from "./user-row";

export default async function UserWithClients({
  user,
  allClients,
}: {
  user: User;
  allClients: Client[];
}) {
  // Fetch clients one by one if user has clients
  const clients =
    user.clients && user.clients.length > 0
      ? (
          await Promise.all(
            user.clients.map(async (id: string) => {
              const [client, err] = await catchError(getClient(id));
              return err ? null : client?.data.client;
            })
          )
        ).filter((client): client is Client => client !== null)
      : [];

  const createdDate = format(user.createdAt, "MMM / dd / yyyy");

  console.log("createdDate1", createdDate);
  return (
    <UserRow
      key={user._id}
      user={user}
      clients={clients}
      createdDate={createdDate}
      allClients={allClients}
    />
  );
}
