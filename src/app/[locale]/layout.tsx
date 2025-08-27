import { Header } from "@/components/layout/header";
import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Readex_Pro } from "next/font/google";
import { cn } from "@/lib/utils/tailwind-merge";

const readexPro = Readex_Pro({
  subsets: ["arabic"],
});

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cn(locale === "ar" ? readexPro.className : "")}>
        <Providers>
          <SidebarProvider>
            <AppSidebar side={locale === "ar" ? "right" : "left"} />
            <SidebarInset>
              {/* Header */}
              <Header />

              {/* Main */}
              <main>{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
