"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteUser } from "@/hooks/user/use-user";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import UserUpdateForm from "./user-update-form";
import { ar } from "date-fns/locale";
import { addDays, format, startOfWeek } from "date-fns";

export default function UserRow({
  user,
  clients,
  createdDate,
  allClients,
}: {
  user: User;
  clients: Client[];
  createdDate: string;
  allClients: Client[];
}) {
  // Translation
  const t = useTranslations();

  // Hooks
  const { isPending, deleteUser, isSuccess } = useDeleteUser();

  // Functions
  const onDelete = (id: string) => {
    deleteUser(id, {
      onSuccess: () => {
        toast.success(t("user-deleted-success"));
      },

      onError: (err: Error) => {
        toast.error(err.message);
      },
    });
  };

  // pick a reference week starting on Sunday
  const referenceSunday = startOfWeek(new Date(), { weekStartsOn: 0 });

  // build weekdays dynamically
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    addDays(referenceSunday, i)
  );

  // lookup by index
  const weekdayMap: Record<string, Date> = {
    sunday: weekdays[0],
    monday: weekdays[1],
    tuesday: weekdays[2],
    wednesday: weekdays[3],
    thursday: weekdays[4],
    friday: weekdays[5],
    saturday: weekdays[6],
  };

  return (
    <TableRow key={user._id}>
      {/* Name */}
      <TableCell className="font-medium">{user.name}</TableCell>

      {/* ID */}
      <TableCell>{user.userId}</TableCell>

      {/* Phone */}
      <TableCell>{user.phone}</TableCell>

      {/* Role */}
      <TableCell className="text-start">{user.role}</TableCell>

      {/* Salary */}
      <TableCell className="text-start">{user.salary}</TableCell>

      {/* Days off */}
      <TableCell className="text-start">
        {user.daysOff && user.daysOff.length > 0
          ? user.daysOff
              .map((day) => {
                const key = day.trim().toLowerCase(); // handle case + spaces
                const date = weekdayMap[key];
                return date ? format(date, "EEEE", { locale: ar }) : day; // fallback if missing
              })
              .join(", ")
          : "-"}
      </TableCell>

      {/* Clients */}
      <TableCell className="text-start">
        {clients.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {clients.map((client) => (
              <span
                key={client._id}
                className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
              >
                {client.name}
              </span>
            ))}
          </div>
        ) : (
          "-"
        )}
      </TableCell>

      {/* Date creation */}
      <TableCell className="text-start">{createdDate}</TableCell>

      <TableCell className="text-start">
        <UserUpdateForm user={user} clients={allClients}>
          <Button
            variant="outline"
            className="h-8 px-2 sm:h-9 sm:px-3 text-xs sm:text-sm"
          >
            {t("update")}
          </Button>
        </UserUpdateForm>
      </TableCell>

      {/* Delete */}
      <TableCell className="text-start uppercase">
        <Button
          variant="destructive"
          className={cn("text-xs h-8 px-2 sm:h-9 sm:px-3")}
          onClick={() => onDelete(user._id)}
          disabled={isPending || isSuccess}
        >
          {t("delete")}
          <span>{isPending && <LoaderCircle className="animate-spin" />}</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
