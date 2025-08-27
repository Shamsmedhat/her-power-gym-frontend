import catchError from "@/lib/utils/catch-error";
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
import { getSubscriptions } from "@/lib/apis/subscription.api";

export default async function SubscriptionsList() {
  // Translation
  const t = await getTranslations();

  // Fetch
  const [payload, error] = await catchError(getSubscriptions());

  if (error) return <p>{error.message}</p>;

  return (
    <Table>
      <TableCaption className="capitalize">{t("subs-list-dec")}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-fit text-start">
            {t("subscription-name")}
          </TableHead>
          <TableHead className="text-start">{t("subscription-type")}</TableHead>
          <TableHead className="text-start">{t("duration-days")}</TableHead>
          <TableHead className="text-start">{t("total-sections")}</TableHead>
          <TableHead className="text-start">
            {t("subscription-price")}
          </TableHead>
          <TableHead className="text-start">
            {t("subscription-description")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payload.data.subscriptionPlans.map((s) => {
          return (
            <TableRow key={s._id}>
              <TableCell className="font-medium">{s.name}</TableCell>
              <TableCell>{s.type}</TableCell>
              <TableCell>{s.durationDays ?? "-"}</TableCell>
              <TableCell className="text-start">
                {Number(s.totalSessions) === 0 ? "-" : Number(s.totalSessions)}
              </TableCell>
              <TableCell className="text-start">{s.price}</TableCell>
              <TableCell className="text-start">{s.description}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
