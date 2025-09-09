"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { RegisterResponse } from "@/lib/types/auth";
import { getTokenDecoded } from "@/lib/utils/get-token";
import { revalidateTag } from "next/cache";

export const registerAction = async (
  registrationFields: RegistrationFields
) => {
  const token = await getTokenDecoded();

  const respones = await fetch(`${process.env.API}/auth/register`, {
    method: "POST",
    body: JSON.stringify(registrationFields),
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
  });

  const payload: APIResponse<RegisterResponse> = await respones.json();

  console.log("payload", payload);
  revalidateTag("users");

  if ("statusCode" in payload && payload.statusCode === 401) {
    throw new Error(payload.message || "Unknown server error");
  }
  if ("status" in payload && payload.status === "error") {
    throw new Error(payload.message || "Unknown server error");
  }

  return payload;
};
