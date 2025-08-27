import { getClients } from "@/lib/apis/clients.api";
import catchError from "@/lib/utils/catch-error";
import { format } from "date-fns";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function ClientsList() {
  // Translation
  const t = await getTranslations();

  // Fetch
  const [payload, error] = await catchError(getClients());

  if (error) return <p>{error.message}</p>;

  return (
    <Table>
      <TableCaption className="capitalize">{t("client-list-dec")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit text-start">{t("client-name")}</TableHead>
          <TableHead className="text-start">{t("client-id")}</TableHead>
          <TableHead className="text-start">{t("clinet-phone")}</TableHead>
          <TableHead className="text-start">{t("subscription")}</TableHead>
          <TableHead className="text-start">
            {t("subscription-start-date")}
          </TableHead>
          <TableHead className="text-start">
            {t("subscription-end-date")}
          </TableHead>
          <TableHead className="text-start">
            {t("subscription-price")}
          </TableHead>
          <TableHead className="text-start">{t("private")}</TableHead>
          <TableHead className="text-start">{t("private-coach")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payload.data.clients.map((c) => {
          const subsStartDate = format(
            c.subscription.startDate,
            "MMM / dd / yyyy"
          );
          const subsEndDate = format(c.subscription.endDate, "MMM / dd / yyyy");

          return (
            <TableRow key={c._id}>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell>{c.clientId}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell className="text-start">
                {/* {c.subscription.plan} */}
                plan
              </TableCell>
              <TableCell className="text-start">{subsStartDate}</TableCell>
              <TableCell className="text-start">{subsEndDate}</TableCell>
              <TableCell className="text-start">
                {c.subscription.priceAtPurchase}
              </TableCell>
              <TableCell className="text-start">
                {/* {c.privatePlan?.plan ?? "-"} */}
                private plan
              </TableCell>
              <TableCell className="text-start">
                {/* {c.privatePlan?.coach ?? "-"} */}
                private coach
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
