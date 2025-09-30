"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { SwitchLocale } from "./components/switch-locale";
import { signOut, useSession } from "next-auth/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUserRole } from "@/lib/utils/user-role";
import UpdateMyPasswordForm from "@/components/features/user/update-my-password-form";

export function Header() {
  // Translation
  const t = useTranslations();

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Hooks
  const { data: session } = useSession();
  const adminSuperAdmin = useUserRole(["admin", "super-admin"]);
  const admin = useUserRole(["admin"]);

  // Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky flex top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Sidebar trigger on mobile */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-between gap-6 w-full">
          {/* Navigation */}
          {session ? (
            <div className="flex justify-between items-center w-full">
              {/* Super admin view */}
              {!adminSuperAdmin && (
                <div className="flex items-center gap-2 uppercase text-xl font-bold my-3 py-2 italic text-main justify-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <span>{t("logo")}</span>
                  </Link>
                </div>
              )}

              {/* Admin view */}
              {admin && (
                <div className="flex items-center justify-center my-auto">
                  <UpdateMyPasswordForm />
                </div>
              )}
              <div className="flex items-end flex-col">
                <span>{t("hello-user", { user: session.user.name })}</span>
                <Button
                  variant="link"
                  className="p-0 h-fit font-semibold"
                  onClick={() => signOut()}
                >
                  {t("logout")} <LogOut />
                </Button>
              </div>
            </div>
          ) : (
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t("login")}
            </Link>
          )}

          {/* Locale switcher */}
          <SwitchLocale />
        </nav>

        {/* Mobile Menu Button and Language Switcher */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Locale switcher */}
          <SwitchLocale />

          {/* Menu trigger */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden content-center">
          <div className="flex items-end flex-col">
            <Button
              variant="link"
              className="p-0 h-fit font-semibold"
              onClick={() => signOut()}
            >
              {t("logout")} <LogOut />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
