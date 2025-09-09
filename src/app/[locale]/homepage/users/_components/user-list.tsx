import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserWithClients from "./user-with-clients";
import { useTranslations } from "next-intl";

export default function UserList({
  users,
  clients,
}: {
  users: User[];
  clients: Client[];
}) {
  // Translation
  const t = useTranslations();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* Name */}
          <TableHead>{t("name-label")}</TableHead>

          {/* ID */}
          <TableHead>{t("user-id")}</TableHead>

          {/* Phone */}
          <TableHead>{t("phone-label")}</TableHead>

          {/* Role */}
          <TableHead>{t("role-label")}</TableHead>

          {/* Salary */}
          <TableHead>{t("salary")}</TableHead>

          {/* Days off */}
          <TableHead>{t("days-off")}</TableHead>

          {/* Clients (private) */}
          <TableHead>{t("clients-label")}</TableHead>

          {/* Created at */}
          <TableHead>{t("user-created")}</TableHead>

          {/* Update */}
          <TableHead>{t("update")}</TableHead>

          {/* Delete */}
          <TableHead>{t("delete")}</TableHead>
        </TableRow>
      </TableHeader>

      {/* Table body */}
      <TableBody>
        {users?.map((user) => (
          <UserWithClients key={user._id} user={user} allClients={clients} />
        ))}
      </TableBody>
    </Table>
  );
}
