"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  DollarSign,
  Phone,
  Users,
  Clock,
  User,
  Briefcase,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function UserProfile({
  userData,
  clients,
}: {
  userData: User;
  clients: string[];
}) {
  // Translations
  const t = useTranslations();

  const {
    createdAt,
    daysOffHistory,
    name,
    phone,
    role,
    userId,
    daysOff,
    salary,
  } = userData;

  // Generate initials for avatar
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
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
              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
              >
                <User className="w-4 h-4 capitalize" />
                {t("view-details")}
              </Button>
            </div>
          </div>

          {/* Basic Info Section */}
          <div className="flex-1">
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-balance">{name}</h1>
              <p className="text-xl text-muted-foreground mb-2">{role}</p>
              <Badge variant="secondary" className="mb-4">
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
                  {daysOff || 0} {t("daysoff-label")}
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
                    <span className="font-medium">{clients?.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Contact Information
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Join Date:</span>
                    <span className="font-medium">{joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Days Off Left:
                    </span>
                    <span className="font-medium">{daysOff || 0} days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="mt-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Active Clients</h3>
                <p className="text-muted-foreground">
                  Currently working with {clients?.length} clients
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {clients?.map((client, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                          {client[0]}
                        </div>
                        <div>
                          <h4 className="font-medium">{client}</h4>
                          <p className="text-sm text-muted-foreground">
                            Active
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time-off" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Time Off Summary</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Days Remaining:
                      </span>
                      <Badge variant="outline" className="text-lg px-3 py-1">
                        {daysOff || 0} days
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Days Used:</span>
                      <span className="font-medium">
                        {daysOffHistory.length} days
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Recent Time Off</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {daysOffHistory.slice(-3).map((timeOff, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium">
                            {timeOff.changedAt
                              ? new Date(timeOff.changedAt).toLocaleDateString()
                              : "Date not specified"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Changed by: {timeOff.changedBy}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          {timeOff.daysOff.length > 0
                            ? `${timeOff.daysOff.length} days`
                            : "No days"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
