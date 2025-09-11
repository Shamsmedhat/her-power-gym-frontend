"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  CalendarDays,
  DollarSign,
  Phone,
  Users,
  Clock,
  User,
  Briefcase,
  Calendar,
  CreditCard,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function UserProfile({
  userData,
  clients,
}: {
  userData: User;
  clients: Client[];
}) {
  // Translations
  const t = useTranslations();

  const { createdAt, name, phone, role, userId, daysOff, salary } = userData;

  // Generate initials for avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join(" ")
    .toUpperCase();

  // Format dates
  const joinDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format salary
  const formattedSalary = salary
    ? new Intl.NumberFormat("ar-EG", {
        style: "currency",
        currency: "EGP",
        minimumFractionDigits: 0,
      }).format(salary)
    : "Not specified";

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage
                src="https://cdn-icons-png.flaticon.com/128/2922/2922561.png"
                alt="user"
              />

              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex gap-2 justify-center items-center">
              {/* <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              > */}
              <User className="w-4 h-4 capitalize" />
              <span>{t("details")}</span>
              {/* </Button> */}
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="flex-1">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-balance">{name}</h1>
              <p className="text-xl text-muted-foreground mb-2">{role}</p>
              <Badge variant="secondary" className="mb-4 text-md">
                {t("id")} {userId}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-muted-foreground" />
                <span>
                  {t("joined")} {joinDate}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <span>
                  {formattedSalary} {t("monthly")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>
                  {daysOff?.join(" ,") || 0} {t("daysoff-label")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="clients">{t("clients-private")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    {t("work-information")}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("role-label")}:
                    </span>
                    <span className="font-medium">{role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("user-id")}:
                    </span>
                    <span className="font-medium">{userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("monthly-salary")}:
                    </span>
                    <span className="font-medium">{formattedSalary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("active-clients")}:
                    </span>
                    <span className="font-medium">
                      {clients?.length === 0 ? t("zero") : clients?.length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {t("contact-information")}
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t("phone")}:</span>
                    <span className="font-medium">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("join-date")}:
                    </span>
                    <span className="font-medium">{joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t("days-off-0")}:
                    </span>
                    <span className="font-medium">
                      {daysOff?.join(" ,") || 0}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold capitalize">
                  {t("active-clients-0")}
                </h3>
                <p className="text-muted-foreground">
                  {t("clients-msg", {
                    clientsLength:
                      clients?.length === 0 ? t("zero") : clients?.length,
                  })}
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                  {clients &&
                    clients?.map((client, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto">
                          {/* Header Section */}
                          <div className="flex items-center justify-between mb-6 ">
                            <div className="flex items-center space-x-3 gap-3 rtl:space-x-reverse">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                  {client.name}
                                </h4>
                                <div className="flex items-center gap-2 rtl:space-x-reverse">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  <p className="text-sm text-green-600 font-medium">
                                    {t("active")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Client Details */}
                          <div className="space-y-4">
                            {/* Client ID */}
                            <div className="flex items-center justify-between py-2 border-b border-gray-100 ">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <CreditCard className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-600">
                                  {t("id")}
                                </span>
                              </div>
                              <span className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded">
                                {client.clientId}
                              </span>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-600">
                                  {t("phone")}
                                </span>
                              </div>
                              <span className="text-sm text-gray-900 font-medium direction-ltr">
                                {client.phone}
                              </span>
                            </div>

                            {/* Subscription Plan */}
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-sm"></div>
                                <span className="text-sm font-medium text-gray-600">
                                  {t("plan")}
                                </span>
                              </div>
                              <span className="text-sm font-medium px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
                                {client.subscription.plan.name}
                              </span>
                            </div>

                            {/* Start Date */}
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-600">
                                  {t("startDate")}
                                </span>
                              </div>
                              <span className="text-sm text-gray-900 font-medium">
                                {format(
                                  client.subscription.startDate,
                                  "MMM / dd / yyyy"
                                )}
                              </span>
                            </div>

                            {/* End Date */}
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-600">
                                  {t("endDate")}
                                </span>
                              </div>
                              <span className="text-sm text-gray-900 font-medium">
                                {format(
                                  client.subscription.endDate,
                                  "MMM / dd / yyyy"
                                )}
                              </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-600">
                                  {t("price-label")}
                                </span>
                              </div>
                              {/* //TODO intl format */}
                              <span className="text-sm font-bold gap-1 flex flex-row-reverse text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                <span>
                                  {client.subscription.priceAtPurchase}
                                </span>
                                <span>{t("currency")}</span>
                              </span>
                            </div>

                            {/* Private plan label*/}
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <div className="w-4 h-4 bg-gradient-to-r from-emerald-800 to-sky-500 rounded-sm"></div>
                                <span className="text-sm font-medium text-gray-600">
                                  {t("private-plan-label")}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                                {client.privatePlan?.plan?.name}
                              </span>
                            </div>

                            {/* Total sessions label*/}
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-green-50 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-600">
                                  {t("total-sessions-label")}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                                {client.privatePlan?.plan?.totalSessions}
                              </span>
                            </div>

                            {/* Total remaining sessions label*/}
                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2 rtl:space-x-reverse">
                                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-emerald-50 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-600">
                                  {t("remaining-sessions")}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                {client.privatePlan?.totalSessions}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
