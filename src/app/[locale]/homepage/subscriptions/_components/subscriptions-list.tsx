import catchError from "@/lib/utils/catch-error";
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
import { getSubscriptions } from "@/lib/apis/subscription.api";
import SubscriptionRow from "./subscription-row";

export default async function SubscriptionsList() {
  // Translation
  const t = await getTranslations();

  // Fetch
  const [payload, error] = await catchError(getSubscriptions());

  // Error
  if (error) return <p>{error.message}</p>;

  return (
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[720px] sm:min-w-0">
        <TableCaption className="capitalize">{t("subs-list-dec")}</TableCaption>

        {/* Table header */}
        <TableHeader>
          <TableRow>
            {/* Name */}
            <TableHead className="w-fit text-start">
              {t("subscription-name")}
            </TableHead>

            {/* Type */}
            <TableHead className="text-start">
              {t("subscription-type")}
            </TableHead>

            {/* Duration days */}
            <TableHead className="text-start">{t("duration-days")}</TableHead>

            {/* Total sections */}
            <TableHead className="text-start">{t("total-sections")}</TableHead>

            {/* Price */}
            <TableHead className="text-start">
              {t("subscription-price")}
            </TableHead>

            {/* Subscription description */}
            <TableHead className="text-start">
              {t("subscription-description")}
            </TableHead>

            {/* Update btn */}
            <TableHead className="text-start">
              {t("update-subscription")}
            </TableHead>

            {/* Delete btn */}
            <TableHead className="text-start">
              {t("delete-subscription")}
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table body (rows) */}
        <TableBody>
          {payload.data.subscriptionPlans.map((sub) => (
            <SubscriptionRow sub={sub} key={sub._id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
