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
import { useLocale, useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubscriptionFields,
  useSubscriptionSchema,
} from "@/lib/schemes/subscriptions.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import SubmitFeedback from "@/components/common/submit-feedback";
import { useCreateSubscription } from "@/hooks/subscription/use-subscription";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function SubscriptionCreateForm() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // State
  const [open, setOpen] = useState(false);

  // Hooks
  const { error, isPending, createNewSub } = useCreateSubscription();
  const subscriptionSchema = useSubscriptionSchema();

  // Form
  const form = useForm<SubscriptionFields>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: "",
      type: "main",
      durationDays: 0,
      totalSessions: 0,
      price: 0,
      description: undefined,
    },
  });

  // Variables
  const watchTypes = form.watch("type");

  // Functions
  function onSubmit(values: SubscriptionFields) {
    createNewSub(values, {
      onSuccess: () => {
        toast.success("تم انشاء خطه اشتراك جديدة");
        setOpen(false);
      },
      onError: (err: Error) => {
        if (err.message.includes("not logged in")) {
          toast.error("يرجي تسجيل الدخول لتستطيع عمل خطة اشتراك جديدة.");
        } else {
          toast.error(err.message);
        }
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="m-5">
        <Button variant="outline">{t("add-a-new-subscription-plan")}</Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-4 space-y-6"
          >
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle>{t("create-new-subscription")}</DialogTitle>
              <DialogDescription>{t("add-new-subs-plan")}</DialogDescription>
            </DialogHeader>

            {/* Subscription name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("subs-name-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder={t("subs-placeholder")}
                      {...field}
                      autoComplete="name"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Subscription type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("subscription-type-label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger dir={locale === "ar" ? "rlt" : "ltr"}>
                        <SelectValue placeholder={t("role-trigger")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="main">{t("main")}</SelectItem>
                      <SelectItem value="private">{t("private")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Duration days */}
            {watchTypes === "main" && (
              <FormField
                control={form.control}
                name="durationDays"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("duration-days")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input
                        placeholder={t("duration-days-placeholder")}
                        {...field}
                        autoComplete="durationDays"
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Total sessions */}
            {watchTypes === "private" && (
              <FormField
                control={form.control}
                name="totalSessions"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel>{t("total-sessions-label")}</FormLabel>

                    {/* Field */}
                    <FormControl>
                      <Input
                        placeholder={t("total-sessions-placeholder")}
                        {...field}
                        autoComplete="totalSessions"
                      />
                    </FormControl>

                    {/* Feedback */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("price-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder={t("price-placeholder")}
                      {...field}
                      autoComplete="price"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description-label")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("description-placeholder")}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-3">
              {/* Close */}
              <DialogClose asChild>
                <Button variant="outline">{t("cancel")}</Button>
              </DialogClose>

              {/* Submit */}
              <Button type="submit" disabled={isPending}>
                {t("new-subs-submit")}
                <span>
                  {isPending && <LoaderCircle className="animate-spin" />}
                </span>
              </Button>
              {/* Feedback */}
            </DialogFooter>
            <SubmitFeedback>
              {error?.message.includes("not logged in")
                ? t("auth-erorr")
                : error?.message}
            </SubmitFeedback>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
