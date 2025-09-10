"use client";

import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  CreditCard,
  Calendar,
  Clock,
  DollarSign,
  Users,
  Activity,
  MapPin,
  Star,
} from "lucide-react";
import { format } from "date-fns";

export default function ClientDashboard({ client }: { client: Client }) {
  const t = useTranslations();

  if (!client) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              {t("no-client-data")}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("client-dashboard")}</h1>
          <p className="text-muted-foreground">
            {t("welcome-back")}, {client.name}
          </p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {client.clientId}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {t("personal-information")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("name-label")}
                    </p>
                    <p className="font-medium">{client.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("phone")}
                    </p>
                    <p className="font-medium direction-ltr">{client.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("client-id")}
                    </p>
                    <p className="font-medium font-mono">{client.clientId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("member-since")}
                    </p>
                    <p className="font-medium">
                      {format(new Date(client.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                {t("subscription-plan")}
              </CardTitle>
              <CardDescription>
                {t("your-current-subscription-details")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {client.subscription ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("plan-name")}
                      </p>
                      <p className="font-medium">
                        {client.subscription.plan.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("price")}
                      </p>
                      <p className="font-medium">
                        {client.subscription.priceAtPurchase} {t("currency")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("start-date")}
                      </p>
                      <p className="font-medium">
                        {format(
                          new Date(client.subscription.startDate),
                          "MMM dd, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("end-date")}
                      </p>
                      <p className="font-medium">
                        {format(
                          new Date(client.subscription.endDate),
                          "MMM dd, yyyy"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {t("no-subscription-data")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Private Plan Information */}
          {client.privatePlan && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {t("private-training-plan")}
                </CardTitle>
                <CardDescription>
                  {t("your-private-training-details")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("plan-name")}
                      </p>
                      <p className="font-medium">
                        {client.privatePlan.plan?.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("price")}
                      </p>
                      <p className="font-medium">
                        {client.privatePlan.priceAtPurchase} {t("currency")}
                      </p>
                    </div>
                  </div>

                  {/* Remaining sessions */}
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("remaining-sessions")}
                      </p>
                      <p className="font-medium text-green-600">
                        {client.privatePlan.totalSessions}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Coach Information */}
          {client.privatePlan && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {t("your-coach")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {client.privatePlan.coach ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("name-label")}
                        </p>
                        <p className="font-medium">
                          {client.privatePlan.coach.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("phone")}
                        </p>
                        <p className="font-medium direction-ltr">
                          {client.privatePlan.coach.phone}
                        </p>
                      </div>
                    </div>
                    {client.privatePlan.coach.daysOff &&
                      client.privatePlan.coach.daysOff.length > 0 && (
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {t("days-off")}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {client.privatePlan.coach.daysOff.map(
                                (day: string, index: number) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {day}
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {t("no-coach-assigned")}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Recent Sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {t("recent-sessions")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {client?.privatePlan?.sessions?.length &&
              client.privatePlan.sessions.length > 0 ? (
                <div className="space-y-3">
                  {client.privatePlan.sessions.slice(0, 5).map((session) => (
                    <div
                      key={session._id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{session.coach.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(session.date), "MMM dd, yyyy")}
                        </p>
                      </div>
                      <Badge
                        variant={
                          session.status === "completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  {t("no-sessions-found")}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
