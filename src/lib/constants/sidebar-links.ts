import { Wallet, UserRound, IdCardLanyard } from "lucide-react";

export const SIDEBAR_LINKS = (t: (key: string) => string) => {
  return [
    {
      title: t("clients"),
      url: "/clients",
      icon: UserRound,
    },
    {
      title: t("users"),
      url: "/users",
      icon: IdCardLanyard,
    },
    {
      title: t("subscription"),
      url: "/subscriptions",
      icon: Wallet,
    },
  ];
};
