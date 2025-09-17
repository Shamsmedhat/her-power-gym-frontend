"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteClient } from "@/hooks/client/use-client";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import ClientUpdateForm from "./client-update-form";

export default function ClientRow({
  client,
  key,
  subscriptions,
  users,
  subsStartDate,
  subsEndDate,
}: {
  client: Client;
  key: string;
  subscriptions: Subscription[];
  users: User[];
  subsStartDate: string;
  subsEndDate: string;
}) {
  // Translation
  const t = useTranslations();

  // State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Hooks
  const { isPending, deleteClient, isSuccess } = useDeleteClient();

  // Functions
  const onDelete = (id: string) => {
    deleteClient(id, {
      onSuccess: () => {
        toast.success(t("client-deleted-success"));
        setIsDeleteModalOpen(false);
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <TableRow key={key}>
      {/* Name */}
      <TableCell className="font-medium">{client.name}</TableCell>

      {/* ID */}
      <TableCell>{client.clientId}</TableCell>

      {/* Phone */}
      <TableCell>{client.phone}</TableCell>

      {/* National ID */}
      <TableCell>{client.nationalId}</TableCell>

      {/* Subscription name */}
      <TableCell className="text-start">
        {client.subscription.plan.name}
      </TableCell>

      {/* Start date */}
      <TableCell className="text-start">{subsStartDate}</TableCell>

      {/* End date */}
      <TableCell className="text-start">{subsEndDate}</TableCell>

      {/* Price at purchase */}
      <TableCell className="text-start">
        {client.subscription.priceAtPurchase}
      </TableCell>

      {/* Private name */}
      <TableCell className="text-start">
        {client.privatePlan?.plan?.name ?? "-"}
      </TableCell>

      {/* Coach name */}
      <TableCell className="text-start">
        {client.privatePlan?.coach?.name ?? "-"}
      </TableCell>

      {/* Private price */}
      <TableCell className="text-start">
        {client.privatePlan?.priceAtPurchase ?? "-"}
      </TableCell>

      {/* Total price */}
      <TableCell className="text-start">
        {(client.privatePlan?.priceAtPurchase ?? 0) +
          client.subscription.priceAtPurchase}
      </TableCell>

      <TableCell className="text-start">
        <ClientUpdateForm
          client={client}
          subscriptions={subscriptions}
          users={users}
        >
          <Button
            variant="outline"
            className="h-8 px-2 sm:h-9 sm:px-3 text-xs sm:text-sm"
          >
            {t("update")}
          </Button>
        </ClientUpdateForm>
      </TableCell>

      {/* Delete */}
      <TableCell className="text-start uppercase">
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className={cn("text-xs h-8 px-2 sm:h-9 sm:px-3")}
              disabled={isPending || isSuccess}
            >
              {t("delete")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t("delete-client")}</DialogTitle>
              <DialogDescription>
                {t("delete-client-confirmation", { name: client.name })}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isPending}
              >
                {t("cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete(client._id)}
                disabled={isPending || isSuccess}
              >
                {isPending && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("delete")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
