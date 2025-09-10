"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, usePathname } from "@/i18n/routing";
import { SIDEBAR_LINKS } from "@/lib/constants/sidebar-links";
import { useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils/tailwind-merge";
import { useUserRole } from "@/lib/utils/user-role";

type AppSidebarProps = {
  side?: "left" | "right";
};

export function AppSidebar({ side = "left" }: AppSidebarProps) {
  // Translations
  const t = useTranslations();

  // Navigation
  const pathname = usePathname();

  // Variable
  const links = SIDEBAR_LINKS(t);

  // Hooks
  const canSee = useUserRole(["admin", "super-admin"]);

  if (canSee) {
    return (
      <Sidebar side={side}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase text-xl font-bold my-3 py-2 italic text-main items-center justify-center">
              <div className="flex items-center gap-2">
                <Link href="/homepage" className="flex items-center space-x-2">
                  <span>{t("logo")}</span>
                </Link>
              </div>
            </SidebarGroupLabel>
            <Separator />
            <SidebarGroupContent className="my-6">
              <SidebarMenu>
                {links.map((l) => {
                  const isActive = pathname === l.url;

                  return (
                    <SidebarMenuItem key={l.title} className="w-full mb-3">
                      <SidebarMenuButton asChild>
                        <Link
                          href={l.url}
                          className={cn(
                            isActive && "text-main/80",
                            "text-xl flex items-center gap-2"
                          )}
                        >
                          <l.icon
                            size={20}
                            strokeWidth={2}
                            className="shrink-0"
                          />
                          <span>{l.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }
}
