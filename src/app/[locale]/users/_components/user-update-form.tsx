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
import { useUpdateUser } from "@/hooks/employee/use-employee";
import { useUsersSchema, UsersFields } from "@/lib/schemes/employees.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

export default function UserUpdateForm({
  user,
  clients,
  children,
}: {
  user: User;
  clients: Client[];
  children: React.ReactNode;
}) {
  // Translation
  const t = useTranslations();

  // State
  const [open, setOpen] = useState(false);

  // Hooks
  const { isPending, updateUser } = useUpdateUser();

  const form = useForm({
    resolver: zodResolver(useUsersSchema()),
    defaultValues: {
      name: user.name,
      phone: user.phone,
      role: user.role,
      salary: user.salary,
      daysOff: user.daysOff || [],
      clients: user.clients || [],
    },
  });

  // Watch role to conditionally show fields
  const selectedRole = form.watch("role");

  // Reset form when user changes
  useEffect(() => {
    // Ensure daysOff is always an array and handle potential string values
    const normalizedDaysOff = Array.isArray(user.daysOff)
      ? user.daysOff
      : user.daysOff
      ? [user.daysOff]
      : [];

    console.log("Resetting form with daysOff:", normalizedDaysOff);

    form.reset({
      name: user.name,
      phone: user.phone,
      role: user.role,
      salary: user.salary,
      daysOff: normalizedDaysOff,
      clients: user.clients || [],
    });
  }, [user, form]);

  // Functions
  const handleRoleChange = (newRole: string) => {
    // Clear salary and clients if role is not coach
    if (newRole !== "coach") {
      form.setValue("salary", undefined);
      form.setValue("clients", []);
    }
  };

  const onSubmit = (values: UsersFields) => {
    console.log("Submitting form with values:", values);
    console.log("Days off being sent:", values.daysOff);
    updateUser(
      {
        userUpdatedFields: values,
        id: user._id,
      },
      {
        onSuccess: () => {
          toast.success(t("user-updated-success"));
          setOpen(false);
        },
        onError: (err: Error) => {
          toast.error(err.message);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("update-user")}</DialogTitle>
          <DialogDescription>{t("update-user-description")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
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
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRoleChange(value);
                    }}
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

            {/* Salary field - only show for coaches */}
            {selectedRole === "coach" && (
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
            )}

            {/* Days Off field - show for all roles */}
            <FormField
              control={form.control}
              name="daysOff"
              render={({ field }) => {
                console.log("Days off field value:", field.value);
                return (
                  <FormItem>
                    <FormLabel>{t("days-off")}</FormLabel>
                    <FormControl>
                      <MultiSelect
                        values={field.value || []}
                        onValuesChange={field.onChange}
                      >
                        <MultiSelectTrigger className="w-full">
                          <MultiSelectValue
                            placeholder={t("select-days-off")}
                          />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                          <MultiSelectGroup>
                            <MultiSelectItem value="Monday" badgeLabel="Monday">
                              Monday
                            </MultiSelectItem>
                            <MultiSelectItem
                              value="Tuesday"
                              badgeLabel="Tuesday"
                            >
                              Tuesday
                            </MultiSelectItem>
                            <MultiSelectItem
                              value="Wednesday"
                              badgeLabel="Wednesday"
                            >
                              Wednesday
                            </MultiSelectItem>
                            <MultiSelectItem
                              value="Thursday"
                              badgeLabel="Thursday"
                            >
                              Thursday
                            </MultiSelectItem>
                            <MultiSelectItem value="Friday" badgeLabel="Friday">
                              Friday
                            </MultiSelectItem>
                            <MultiSelectItem
                              value="Saturday"
                              badgeLabel="Saturday"
                            >
                              Saturday
                            </MultiSelectItem>
                            <MultiSelectItem value="Sunday" badgeLabel="Sunday">
                              Sunday
                            </MultiSelectItem>
                          </MultiSelectGroup>
                        </MultiSelectContent>
                      </MultiSelect>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Clients field - only show for coaches */}
            {selectedRole === "coach" && (
              <FormField
                control={form.control}
                name="clients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("clients")}</FormLabel>
                    <FormControl>
                      <MultiSelect
                        values={field.value || []}
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
            )}

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
