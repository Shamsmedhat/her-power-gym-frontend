import { format } from "date-fns";
import UserRow from "./user-row";

export default async function UserWithClients({ user }: { user: User }) {
  // Fetch clients one by one if user has clients
  const clients = user.clients;

  const createdDate = format(user.createdAt, "MMM / dd / yyyy");

  console.log("createdDate1", createdDate);
  return (
    <UserRow
      key={user._id}
      user={user}
      clients={clients || []}
      createdDate={createdDate}
    />
  );
}
