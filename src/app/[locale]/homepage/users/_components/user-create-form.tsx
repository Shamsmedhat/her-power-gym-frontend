"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { PasswordInput } from "@/components/common/password-input";
import { ALL_DAYS } from "@/lib/constants/days.constant";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function UserCreateForm({ clients }: { clients: Client[] }) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Hooks
  const registerSchema = useRegisterSchema();
  const { isPending, error, register } = useRegister();
  const days: string[] = ALL_DAYS;

  // State
  const [open, setOpen] = useState(false);

  // Form
  const form = useForm<RegistrationFields>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      role: "coach",
      salary: undefined,
      // clients: undefined,
      daysOff: [],
    },
  });

  // Functions
  function onSubmit(values: RegistrationFields) {
    register(values, {
      onSuccess: () => {
        toast.success(t("user-created-success"));
        setOpen(false);
        form.reset();
      },
      onError: (err: Error) => {
        toast.error(err.message);
      },
    });
  }

  return (
    <>
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
            <DialogDescription>
              {t("create-user-description")}
            </DialogDescription>
          </DialogHeader>
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
                      <PasswordInput
                        {...field}
                        autoComplete="current-password"
                      />
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

              {/* //! Handling the praivte clients in the client not in the user (assign from the client -> coach) */}
              {/* <FormField
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
                            <MultiSelectItem
                              key={client._id}
                              value={client._id}
                            >
                              {client.name}
                            </MultiSelectItem>
                          ))}
                        </MultiSelectGroup>
                      </MultiSelectContent>
                    </MultiSelect>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

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
        </DialogContent>
      </Dialog>
    </>
  );
}

// TODO: I need to adjust in backend the diff between the create user and register so i keep the code
// TODO: to make the dev faster

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   MultiSelect,
//   MultiSelectTrigger,
//   MultiSelectValue,
//   MultiSelectContent,
//   MultiSelectGroup,
//   MultiSelectItem,
// } from "@/components/ui/multi-select";
// import { useCreateUser } from "@/hooks/user/use-user";
// import { useUsersSchema, UsersFields } from "@/lib/schemes/employees.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useTranslations } from "next-intl";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { LoaderCircle, Plus } from "lucide-react";

// export default function UserCreateForm({ clients }: { clients: Client[] }) {
//   // Translation
//   const t = useTranslations();

//   // State
//   const [open, setOpen] = useState(false);

//   // Hooks
//   const { isPending, createNewUser } = useCreateUser();
//   const form = useForm({
//     resolver: zodResolver(useUsersSchema()),
//     defaultValues: {
//       name: "",
//       phone: "",
//       role: "coach" as const,
//       salary: 0,
//       daysOff: [],
//       clients: [],
//     },
//   });

//   // Functions
//   const onSubmit = (values: UsersFields) => {
//     createNewUser(values, {
//       onSuccess: () => {
//         toast.success(t("user-created-success"));
//         setOpen(false);
//         form.reset();
//       },
//       onError: (err: Error) => {
//         toast.error(err.message);
//       },
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="mb-4">
//           <Plus className="mr-2 h-4 w-4" />
//           {t("create-user")}
//         </Button>
//       </DialogTrigger>

//       {/* Content */}
//       <DialogContent className="sm:max-w-[425px]">
//         {/* Header */}
//         <DialogHeader>
//           {/* Title */}
//           <DialogTitle>{t("create-user")}</DialogTitle>
//           <DialogDescription>{t("create-user-description")}</DialogDescription>
//         </DialogHeader>

//         {/* Form */}
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             {/* Name */}
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("name-label")}</FormLabel>
//                   <FormControl>
//                     <Input placeholder={t("name-placeholder")} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Phone */}
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("phone-label")}</FormLabel>
//                   <FormControl>
//                     <Input placeholder={t("phone-placeholder")} {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Role */}
//             <FormField
//               control={form.control}
//               name="role"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("role-label")}</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder={t("role-placeholder")} />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="super-admin">Super Admin</SelectItem>
//                       <SelectItem value="admin">Admin</SelectItem>
//                       <SelectItem value="coach">Coach</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Salary */}
//             <FormField
//               control={form.control}
//               name="salary"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("salary")}</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="number"
//                       placeholder={t("salary-placeholder")}
//                       {...field}
//                       onChange={(e) => field.onChange(Number(e.target.value))}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             {/* Clients */}
//             <FormField
//               control={form.control}
//               name="clients"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>{t("clients")}</FormLabel>
//                   <FormControl>
//                     <MultiSelect
//                       values={field.value}
//                       onValuesChange={field.onChange}
//                     >
//                       <MultiSelectTrigger className="w-full">
//                         <MultiSelectValue placeholder={t("select-clients")} />
//                       </MultiSelectTrigger>
//                       <MultiSelectContent>
//                         <MultiSelectGroup>
//                           {clients.map((client) => (
//                             <MultiSelectItem
//                               key={client._id}
//                               value={client._id}
//                               badgeLabel={client.name}
//                             >
//                               {client.name}
//                             </MultiSelectItem>
//                           ))}
//                         </MultiSelectGroup>
//                       </MultiSelectContent>
//                     </MultiSelect>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex justify-end space-x-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setOpen(false)}
//               >
//                 {t("cancel")}
//               </Button>
//               <Button type="submit" disabled={isPending}>
//                 {t("create")}
//                 {isPending && (
//                   <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
