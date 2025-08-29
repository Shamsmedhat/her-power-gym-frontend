"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RegistrationFields,
  useRegisterSchema,
} from "@/lib/schemes/auth.schema";
import { useLocale, useTranslations } from "next-intl";
import useRegister from "../../../../../hooks/auth/use-register";
import SubmitFeedback from "@/components/common/submit-feedback";
import { useRouter } from "@/i18n/routing";
import { PasswordInput } from "@/components/common/password-input";
import { ALL_DAYS } from "@/lib/constants/days.constant";

export default function RegisterForm({ clients }: { clients: Client[] }) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Navigation
  const router = useRouter();

  // Hooks
  const registerSchema = useRegisterSchema();
  const { isPending, error, register } = useRegister();
  const days: string[] = ALL_DAYS(t);

  // Form
  const form = useForm<RegistrationFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      role: "coach",
      salary: undefined,
      clients: undefined,
      daysOff: [],
    },
  });

  // Functions
  function onSubmit(values: RegistrationFields) {
    console.log("values", values);
  }

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <CardHeader>
        {/* Title */}
        <CardTitle className="text-2xl">{t("create-an-account")}</CardTitle>

        {/* Description */}
        <CardDescription>{t("register-description")}</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("name-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder={t("name-placeholder")}
                      {...field}
                      autoComplete="name"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("phone-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      placeholder={t("phone-placeholder")}
                      {...field}
                      autoComplete="phone"
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("password-label")}</FormLabel>

                  {/* Field */}
                  <FormControl className="relative">
                    <PasswordInput {...field} autoComplete="current-password" />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
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
                      <SelectTrigger dir={locale === "ar" ? "rlt" : "ltr"}>
                        <SelectValue placeholder={t("role-trigger")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="super-admin">
                        {t("super-admin")}
                      </SelectItem>
                      <SelectItem value="admin">{t("admin")}</SelectItem>
                      <SelectItem value="coach">{t("coach")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel>{t("salary-label")}</FormLabel>

                  {/* Field */}
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("salary-placeholder")}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value === "" ? undefined : Number(value)
                        );
                      }}
                    />
                  </FormControl>

                  {/* Feedback */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Clients */}
            <FormField
              control={form.control}
              name="clients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("clients-label")}</FormLabel>
                  <MultiSelect
                    onValuesChange={(selectedIds) => {
                      field.onChange(selectedIds);
                    }}
                    values={field.value || []}
                  >
                    <FormControl>
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue
                          placeholder={t("clients-placeholder")}
                          overflowBehavior="wrap"
                        />
                      </MultiSelectTrigger>
                    </FormControl>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {clients.map((client) => (
                          <MultiSelectItem key={client._id} value={client._id}>
                            {client.name}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Daysoff */}
            <FormField
              control={form.control}
              name="daysOff"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("daysoff-label")}</FormLabel>
                  <MultiSelect
                    onValuesChange={field.onChange}
                    values={field.value}
                  >
                    <FormControl>
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue
                          placeholder={t("daysoff-placeholder")}
                        />
                      </MultiSelectTrigger>
                    </FormControl>
                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {days.map((d) => {
                          return (
                            <MultiSelectItem key={d} value={d}>
                              {d}
                            </MultiSelectItem>
                          );
                        })}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Feedback */}
            <SubmitFeedback>{error?.message}</SubmitFeedback>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={isPending || form.formState.isSubmitting}
            >
              {t("register")}
            </Button>
          </form>
        </Form>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {t.rich("already-have-account", {
            button: (v) => (
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => router.push("/auth/login")}
              >
                {v}
              </Button>
            ),
          })}
        </p>
      </CardFooter>
    </Card>
  );
}
