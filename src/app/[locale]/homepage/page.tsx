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

  const [clientData, errors] = await catchError(getMyClientData(clientId));

  if (errors) return <h1>Some thing went wrong please back to your coach.</h1>;

  if (session?.userType === "client") {
    return (
      <div>
        <ClientDashboard client={clientData?.data?.client} />
      </div>
    );
  } else {
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
  }
}
