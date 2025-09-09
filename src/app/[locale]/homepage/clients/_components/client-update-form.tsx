"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientsFields, useClientsSchema } from "@/lib/schemes/clients.schema";
import SubmitFeedback from "@/components/common/submit-feedback";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useUpdateClient } from "@/hooks/client/use-client";

// TODO checkbox for private plan
export default function ClientUpdateForm({
  client,
  subscriptions,
  users,
  children,
}: {
  client: Client;
  subscriptions: Subscription[];
  users: User[];
  children: React.ReactNode;
}) {
  // Translations
  const t = useTranslations();

  // State
  const [open, setOpen] = useState(false);
  const [originalPrivatePlan] = useState(
    client.privatePlan
      ? {
          plan:
            typeof client.privatePlan.plan === "string"
              ? client.privatePlan.plan
              : client.privatePlan.plan?._id || "",
          coach:
            typeof client.privatePlan.coach === "string"
              ? client.privatePlan.coach
              : client.privatePlan.coach?._id || "",
          totalSessions: client.privatePlan.totalSessions || 0,
          priceAtPurchase: client.privatePlan.priceAtPurchase || 0,
        }
      : undefined
  );

  // Hooks
  const { isPending, error, updateClient } = useUpdateClient();

  // Filter subscriptions by type
  const mainSubscriptions = subscriptions.filter((sub) => sub.type === "main");
  const privateSubscriptions = subscriptions.filter(
    (sub) => sub.type === "private"
  );
  const coachs = users.filter((c) => c.role === "coach");

  // Form
  const form = useForm<ClientsFields>({
    resolver: zodResolver(useClientsSchema()),
    defaultValues: {
      name: client.name,
      phone: client.phone,
      subscription: {
        plan: client.subscription.plan._id,
        priceAtPurchase: client.subscription.priceAtPurchase,
        startDate: new Date(client.subscription.startDate),
        endDate: new Date(client.subscription.endDate),
      },
      privatePlan: client.privatePlan
        ? {
            plan: client.privatePlan.plan?._id || "",
            coach: client.privatePlan.coach?._id || "",
            totalSessions: client.privatePlan.totalSessions || 0,
            priceAtPurchase: client.privatePlan.priceAtPurchase || 0,
          }
        : undefined,
    },
  });

  // Watch
  const watchHasPrivatePlan = form.watch("privatePlan");
  const watchSelectedMainPlan = form.watch("subscription.plan");
  const watchPrivatePlanPrice = form.watch("privatePlan.priceAtPurchase") ?? 0;

  // Functions
  function onSubmit(values: ClientsFields) {
    updateClient(
      { clientUpdatedFields: values, id: client._id },
      {
        onSuccess: () => {
          toast.success(t("client-updated-successfully"));
          setOpen(false);
        },
        onError: (err: Error) => {
          if (err.message.includes("not logged in")) {
            toast.error("يرجي تسجيل الدخول لتستطيع تعديل العميل.");
          } else {
            toast.error(err.message);
          }
        },
      }
    );
  }

  // Get selected plan details for price
  const selectedMainPlan = mainSubscriptions.find(
    (sub) => sub._id === watchSelectedMainPlan
  );

  // Variables
  const MainPlanPrice = selectedMainPlan?.price ?? 0;
  const totalPrice = MainPlanPrice + watchPrivatePlanPrice;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="sm:max-w-[500px] sm:max-h-[815px] sm:overflow-y-scroll">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-2 space-y-6"
          >
            {/* Dialog header */}
            <DialogHeader className="flex flex-row-reverse justify-between items-center sticky top-0 bg-slate-100 z-10 py-4 px-2 border-b">
              <div className="flex flex-col gap-2">
                <DialogTitle>{t("update-client")}</DialogTitle>
                <DialogDescription>
                  {t("update-client-description")}
                </DialogDescription>
              </div>
              <Badge variant="default" className="text-lg py-2 font-bold">
                {t("total-price")} {totalPrice}
              </Badge>
            </DialogHeader>

            {/* Client name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("client-name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("client-name-placeholder")}
                      {...field}
                      autoComplete="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone-label")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("phone-placeholder")}
                      {...field}
                      autoComplete="tel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subscription plan - Dropdown */}
            <FormField
              control={form.control}
              name="subscription.plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subscription-type-label")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("subs-placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mainSubscriptions.map((sub) => (
                        <SelectItem key={sub._id} value={sub._id}>
                          {sub.name} - {sub.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subscription price - Auto-filled from selected plan */}
            <FormField
              control={form.control}
              name="subscription.priceAtPurchase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subscription-price")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("price-placeholder")}
                      {...field}
                      value={selectedMainPlan?.price || 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      readOnly={!!selectedMainPlan}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subscription start date */}
            <FormField
              control={form.control}
              name="subscription.startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subscription-start-date")}</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={format(field.value, "yyyy-MM-dd")}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subscription end date */}
            <FormField
              control={form.control}
              name="subscription.endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subscription-end-date")}</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={format(field.value, "yyyy-MM-dd")}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Private plan section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasPrivatePlan"
                  checked={!!watchHasPrivatePlan}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // Restore original data if it exists, otherwise create empty object
                      form.setValue(
                        "privatePlan",
                        originalPrivatePlan || {
                          plan: "",
                          coach: "",
                          totalSessions: 0,
                          priceAtPurchase: 0,
                        }
                      );
                    } else {
                      form.setValue("privatePlan", undefined);
                    }
                  }}
                />
                <label htmlFor="hasPrivatePlan">{t("has-private-plan")}</label>
              </div>

              {watchHasPrivatePlan && (
                <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                  {/* Private plan - Dropdown */}
                  <FormField
                    control={form.control}
                    name="privatePlan.plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("private-plan-label")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t("select-private-plan")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {privateSubscriptions.map((sub) => (
                              <SelectItem key={sub._id} value={sub._id}>
                                {sub.name} - {sub.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Private coach */}
                  <FormField
                    control={form.control}
                    name="privatePlan.coach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("private-coach")}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t("private-coach-placeholder")}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {coachs.map((c) => (
                              <SelectItem key={c._id} value={c._id}>
                                {c.name} - {c.userId}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Private total sessions */}
                  <FormField
                    control={form.control}
                    name="privatePlan.totalSessions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("total-sessions-label")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={t("total-sessions-placeholder")}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Private plan price */}
                  <FormField
                    control={form.control}
                    name="privatePlan.priceAtPurchase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("price-label")}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={t("price-placeholder")}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <DialogFooter className="gap-3">
              {/* Close */}
              <DialogClose asChild>
                <Button variant="outline">{t("cancel")}</Button>
              </DialogClose>

              {/* Submit */}
              <Button type="submit" disabled={isPending}>
                {t("update")}
                <span>
                  {isPending && <LoaderCircle className="animate-spin" />}
                </span>
              </Button>
            </DialogFooter>

            <SubmitFeedback>{error && error.message}</SubmitFeedback>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
