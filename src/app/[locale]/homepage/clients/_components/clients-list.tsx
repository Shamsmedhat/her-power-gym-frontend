import { getClients } from "@/lib/apis/clients.api";
import catchError from "@/lib/utils/catch-error";
import { format } from "date-fns";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import ClientRow from "./client-row";

export default async function ClientsList({
  subscriptions,
  users,
}: {
  subscriptions: Subscription[];
  users: User[];
}) {
  // Translation
  const t = await getTranslations();

  // Fetch clients
  const [payload, error] = await catchError(getClients());

  // Error
  if (error) return <p>{error.message}</p>;

  return (
    <Table>
      <TableCaption className="capitalize">{t("client-list-dec")}</TableCaption>
      <TableHeader>
        <TableRow>
          {/* Name */}
          <TableHead className="w-fit text-start">{t("client-name")}</TableHead>

          {/* ID */}
          <TableHead className="text-start">{t("client-id")}</TableHead>

          {/* Phone */}
          <TableHead className="text-start">{t("clinet-phone")}</TableHead>

          {/* National ID */}
          <TableHead className="text-start">{t("national-id-label")}</TableHead>

          {/* Subscription */}
          <TableHead className="text-start">{t("subscription")}</TableHead>

          {/* Start date */}
          <TableHead className="text-start">
            {t("subscription-start-date")}
          </TableHead>

          {/* End date */}
          <TableHead className="text-start">
            {t("subscription-end-date")}
          </TableHead>

          {/* Price main */}
          <TableHead className="text-start">
            {t("subscription-price")}
          </TableHead>

          {/* Private type */}
          <TableHead className="text-start">{t("private")}</TableHead>

          {/* Coach name */}
          <TableHead className="text-start">{t("private-coach")}</TableHead>

          {/* Price private */}
          <TableHead className="text-start">{t("private-price")}</TableHead>

          {/* Total price */}
          <TableHead className="text-start">{t("total-price")}</TableHead>

          {/* Delete btn */}
          <TableHead className="text-start">{t("delete")}</TableHead>

          {/* Total price */}
          <TableHead className="text-start">{t("update")}</TableHead>
        </TableRow>
      </TableHeader>

      {/* Table body */}
      <TableBody>
        {payload.data.clients.map((c) => {
          const subsStartDate = format(
            c.subscription.startDate,
            "MMM / dd / yyyy"
          );
          const subsEndDate = format(c.subscription.endDate, "MMM / dd / yyyy");

          return (
            <ClientRow
              client={c}
              key={c._id}
              subsStartDate={subsStartDate}
              subsEndDate={subsEndDate}
              subscriptions={subscriptions}
              users={users}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}
