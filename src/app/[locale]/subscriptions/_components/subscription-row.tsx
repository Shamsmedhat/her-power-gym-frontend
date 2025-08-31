"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useDeleteSubscription } from "@/hooks/subscription/use-subscription";
import { cn } from "@/lib/utils/tailwind-merge";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { toast } from "sonner";
import SubscriptionUpdateForm from "./subscription-update-form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function SubscriptionRow({
  sub,
  key,
}: {
  sub: Subscription;
  key: string;
}) {
  // Translations
  const t = useTranslations();

  // Hooks
  const { isPending, deleteSub } = useDeleteSubscription();

  // Functions
  const onDelete = async (id: string) => {
    deleteSub(id, {
      onSuccess: () => {
        toast.success(t("sub-deleted-success"));
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <TableRow key={key} className="text-xs sm:text-sm">
      <TableCell className="font-medium max-w-[160px] truncate">
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="block truncate max-w-[160px]">{sub.name}</span>
          </TooltipTrigger>
          <TooltipContent>{sub.name}</TooltipContent>
        </Tooltip>
      </TableCell>

      {/* Subscription type */}
      <TableCell className="whitespace-nowrap">{sub.type}</TableCell>

      {/* Subscription duration days */}
      <TableCell className="whitespace-nowrap">
        {sub.durationDays ?? "-"}
      </TableCell>

      {/* Subscription total sessions */}
      <TableCell className="text-start whitespace-nowrap">
        {Number(sub.totalSessions) === 0 ? "-" : Number(sub.totalSessions)}
      </TableCell>

      {/* Subscribtion price */}
      <TableCell className="text-start whitespace-nowrap">
        {sub.price}
      </TableCell>

      {/* Subscription desc */}
      <TableCell className="text-start max-w-[220px] truncate">
        {sub.description}
      </TableCell>

      {/* Update */}
      <TableCell className="text-start">
        <SubscriptionUpdateForm subscription={sub}>
          <Button
            variant="outline"
            className="h-8 px-2 sm:h-9 sm:px-3 text-xs sm:text-sm"
          >
            {t("update")}
          </Button>
        </SubscriptionUpdateForm>
      </TableCell>

      {/* Delete */}
      <TableCell className="text-start uppercase">
        <Button
          variant="destructive"
          className={cn("text-xs h-8 px-2 sm:h-9 sm:px-3")}
          onClick={() => onDelete(sub._id)}
          disabled={isPending}
        >
          {t("delete")}
          <span>{isPending && <LoaderCircle className="animate-spin" />}</span>
        </Button>
      </TableCell>
    </TableRow>
  );
}
