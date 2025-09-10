import { authOptions } from "@/auth";
import ClientDashboard from "@/components/features/client/client-dashboard";
import Profile from "@/components/features/user/profile";
import UpdateMyPasswordForm from "@/components/features/user/update-my-password-form";
import { getMyClientData } from "@/lib/apis/client.api";
import catchError from "@/lib/utils/catch-error";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const clientId = session?.client?._id || session?.user?.userId;

  const [clientData] = await catchError(getMyClientData(clientId));

  if (session?.userType === "coach" || clientData === null) {
    return (
      <div>
        <div>
          <UpdateMyPasswordForm />
        </div>
        <div>
          <Profile />
        </div>
      </div>
    );
  } else if (session?.userType === "client") {
    return (
      <div>
        <ClientDashboard client={clientData?.data?.client} />
      </div>
    );
  }
}
