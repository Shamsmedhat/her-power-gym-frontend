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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
} from "@/components/ui/multi-select";
import { useCreateUser } from "@/hooks/employee/use-employee";
import { useUsersSchema, UsersFields } from "@/lib/schemes/employees.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoaderCircle, Plus } from "lucide-react";

export default function UserCreateForm({ clients }: { clients: Client[] }) {
  // Translation
  const t = useTranslations();

  // State
  const [open, setOpen] = useState(false);

  // Hooks
  const { isPending, createNewUser } = useCreateUser();
  const form = useForm({
    resolver: zodResolver(useUsersSchema()),
    defaultValues: {
      name: "",
      phone: "",
      role: "coach" as const,
      salary: 0,
      daysOff: [],
      clients: [],
    },
  });

  // Functions
  const onSubmit = (values: UsersFields) => {
    createNewUser(values, {
      onSuccess: () => {
        toast.success(t("user-created-success"));
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
        <Button className="mb-4">
          <Plus className="mr-2 h-4 w-4" />
          {t("create-user")}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name-label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("name-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("phone-label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("phone-placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("role-label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("role-placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="super admin">Super Admin</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="coach">Coach</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("salary")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("salary-placeholder")}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("clients")}</FormLabel>
                  <FormControl>
                    <MultiSelect
                      values={field.value}
                      onValuesChange={field.onChange}
                    >
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder={t("select-clients")} />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        <MultiSelectGroup>
                          {clients.map((client) => (
                            <MultiSelectItem
                              key={client._id}
                              value={client._id}
                              badgeLabel={client.name}
                            >
                              {client.name}
                            </MultiSelectItem>
                          ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
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
                {t("create")}
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
