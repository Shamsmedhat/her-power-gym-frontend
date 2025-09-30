"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import {
  LoginFields,
  useLoginSchema,
  ClientLoginFields,
  useClientLoginSchema,
} from "@/lib/schemes/auth.schema";
import { PasswordInput } from "@/components/common/password-input";
import useLogin from "../../../../../hooks/auth/use-login";
import useClientLogin from "../../../../../hooks/auth/use-client-login";
import SubmitFeedback from "@/components/common/submit-feedback";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";

export default function LoginForm() {
  // Translation
  const t = useTranslations();

  // State
  const [loginType, setLoginType] = useState<"user" | "client">("user");

  // Hooks
  const router = useRouter();
  const loginSchema = useLoginSchema();
  const clientLoginSchema = useClientLoginSchema();
  const { isPending, error, login } = useLogin();
  const {
    isPending: isClientPending,
    error: clientError,
    clientLogin,
  } = useClientLogin();

  // Forms
  const userForm = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const clientForm = useForm<ClientLoginFields>({
    resolver: zodResolver(clientLoginSchema),
    defaultValues: {
      phone: "",
      clientId: "",
    },
  });

  // Functions
  const onSubmitUser: SubmitHandler<LoginFields> = (values) => {
    login(values, {
      onSuccess: (data) => {
        // Redirect to the client dashboard after successful login
        const callbackUrl = data?.url || "/homepage";
        toast.success(t("logged-in-successfully"));
        router.push(callbackUrl);
      },
    });
  };

  const onSubmitClient: SubmitHandler<ClientLoginFields> = (values) => {
    clientLogin(values, {
      onSuccess: (data) => {
        // Redirect to the client dashboard after successful login
        const callbackUrl = data?.url || "/homepage";
        toast.success(t("logged-in-successfully"));
        router.push(callbackUrl);
      },
    });
  };

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <CardHeader>
        {/* Title */}
        <CardTitle className="text-2xl">{t("login")}</CardTitle>

        {/* Description */}
        <CardDescription>{t("login-description")}</CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {loginType === "user" ? (
          <Form {...userForm} key="user-form">
            <form
              onSubmit={userForm.handleSubmit(onSubmitUser)}
              className="space-y-6"
            >
              {/* Login Type Toggle */}
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    setLoginType("user");
                    userForm.reset({ phone: "", password: "" });
                  }}
                  className="flex-1"
                >
                  {t("staff-login")}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setLoginType("client");
                    clientForm.reset({ phone: "", clientId: "" });
                    clientForm.clearErrors();
                  }}
                  className="flex-1"
                >
                  {t("client-login")}
                </Button>
              </div>

              {/* Phone */}
              <FormField
                control={userForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone-label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="phone"
                        placeholder={t("phone-placeholder")}
                        autoComplete="phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={userForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password-label")}</FormLabel>
                    <FormControl className="relative">
                      <PasswordInput
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Feedback */}
              {error && (
                <SubmitFeedback>
                  {error?.message.includes("Incorrect")
                    ? t("incorrect-phone-or-password")
                    : error?.message}
                </SubmitFeedback>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || userForm.formState.isSubmitting}
              >
                {t("login")}
                <span>
                  {isPending && <LoaderCircle className="animate-spin" />}
                </span>
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...clientForm} key="client-form">
            <form
              onSubmit={clientForm.handleSubmit(onSubmitClient)}
              className="space-y-6"
            >
              {/* Login Type Toggle */}
              <div className="flex gap-2 mb-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setLoginType("user");
                    userForm.reset({ phone: "", password: "" });
                  }}
                  className="flex-1"
                >
                  {t("staff-login")}
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => {
                    setLoginType("client");
                    clientForm.reset({ phone: "", clientId: "" });
                    clientForm.clearErrors();
                  }}
                  className="flex-1"
                >
                  {t("client-login")}
                </Button>
              </div>

              {/* Phone */}
              <FormField
                control={clientForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone-label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="phone"
                        placeholder={t("phone-placeholder")}
                        autoComplete="phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Client ID */}
              <FormField
                control={clientForm.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("client-id-label")}</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder={t("client-id-placeholder")}
                        {...field}
                        disabled={isClientPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Feedback */}
              {clientError && (
                <SubmitFeedback>
                  {clientError?.message.includes("Incorrect")
                    ? t("incorrect-phone-or-password")
                    : clientError?.message}
                </SubmitFeedback>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                disabled={isClientPending || clientForm.formState.isSubmitting}
              >
                {t("client-login")}
                <span>
                  {isClientPending && <LoaderCircle className="animate-spin" />}
                </span>
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
