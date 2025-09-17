"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdatePassword } from "@/hooks/user/use-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Edit, LoaderCircle } from "lucide-react";
import {
  UpdatePasswordFields,
  useUpdatePasswordSchema,
} from "@/lib/schemes/users.schema";
import { PasswordInput } from "@/components/common/password-input";

export default function UpdateMyPasswordForm() {
  // Translation
  const t = useTranslations();

  // State
  const [open, setOpen] = useState(false);

  // Hooks
  const { isPending, updatePassword } = useUpdatePassword();
  const form = useForm({
    resolver: zodResolver(useUpdatePasswordSchema()),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  // Functions
  const onSubmit = (values: UpdatePasswordFields) => {
    updatePassword(values, {
      onSuccess: () => {
        toast.success(t("password-updated-success"));
        setOpen(false);
        form.reset();
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="my-auto">
          <Edit className="mr-2 h-4 w-4" />
          {t("update-password")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("create-user")}</DialogTitle>
          <DialogDescription>{t("create-user-description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("current-password-label")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("current-password-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("new-password-label")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder={t("new-password-placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isPending}>
                {t("update")}
                {isPending && (
                  <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
