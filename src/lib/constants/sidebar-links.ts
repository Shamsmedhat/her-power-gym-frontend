import { Wallet, UserRound, IdCardLanyard, BarChart3 } from "lucide-react";

export const SIDEBAR_LINKS = (t: (key: string) => string) => {
  return [
    {
      title: t("clients"),
      url: "/homepage/clients",
      icon: UserRound,
    },
    {
      title: t("users"),
      url: "/homepage/users",
      icon: IdCardLanyard,
    },
    {
      title: t("subscription"),
      url: "/homepage/subscriptions",
      icon: Wallet,
    },
    {
      title: t("statistics"),
      url: "/homepage",
      icon: BarChart3,
    },
  ];
};
