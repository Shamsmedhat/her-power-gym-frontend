import { authOptions } from "@/auth";
import ClientDashboard from "@/components/features/client/client-dashboard";
import Profile from "@/components/features/user/profile";
import { Statistics } from "@/components/features/user/statistics";
import UpdateMyPasswordForm from "@/components/features/user/update-my-password-form";
import { redirect } from "@/i18n/routing";
import { getMyClientData } from "@/lib/apis/client.api";
import catchError from "@/lib/utils/catch-error";
import { getServerSession } from "next-auth";
import { getLocale } from "next-intl/server";
import React from "react";

export default async function Page() {
  // Session
  const session = await getServerSession(authOptions);

  // Variable
  const clientId = session?.client?._id || session?.user?.userId;
  const locale: "ar" | "en" = await getLocale();

  // Fetch
  const [clientData] = await catchError(getMyClientData(clientId));

  if (session?.userType === "coach" && clientData === null) {
    return (
      <>
        <div>
          <UpdateMyPasswordForm />
        </div>
        <div>
          <Profile />
        </div>
      </>
    );
  } else if (session?.userType === "client" && clientData !== null) {
    return (
      <>
        <div>
          <ClientDashboard client={clientData?.data?.client} />
        </div>
      </>
    );
  } else if (session?.userType === "super-admin") {
    return <Statistics />;
  } else if (session?.userType === "admin") {
    redirect({ href: "/homepage/clients", locale: locale });
  }
}
