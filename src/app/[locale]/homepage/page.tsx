import Profile from "@/components/features/user/profile";
import UpdateMyPasswordForm from "@/components/features/user/update-my-password-form";
import React from "react";

export default async function Page() {
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
