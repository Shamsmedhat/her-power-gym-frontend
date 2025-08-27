import { Wallet, UserRound, IdCardLanyard } from "lucide-react";

export const SIDEBAR_LINKS = (t: (key: string) => string) => {
  return [
    {
      title: t("clients-label"),
      url: "/clients",
      icon: UserRound,
    },
    {
      title: t("employees"),
      url: "/employees",
      icon: IdCardLanyard,
    },
    {
      title: t("subscription"),
      url: "/subscriptions",
      icon: Wallet,
    },
  ];
};
