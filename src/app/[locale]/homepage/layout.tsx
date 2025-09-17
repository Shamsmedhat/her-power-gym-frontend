import { Header } from "@/components/layout/header";
import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import { getMessages, getTimeZone, getNow } from "next-intl/server";
import { notFound } from "next/navigation";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Readex_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { hasLocale } from "next-intl";

const readexPro = Readex_Pro({
  subsets: ["arabic"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Get messages and other i18n data
  const messages = await getMessages();
  const timeZone = await getTimeZone();
  const now = await getNow();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={readexPro.className} suppressHydrationWarning>
        <Providers
          messages={messages}
          locale={locale}
          timeZone={timeZone}
          now={now}
        >
          <SidebarProvider>
            <AppSidebar side={locale === "ar" ? "right" : "left"} />
            <SidebarInset>
              {/* Header with mobile sidebar trigger space preserved */}
              <Header />

              {/* Main */}
              <main className="p-3 sm:p-6">{children}</main>
              <Toaster richColors position="top-center" theme="light" />
            </SidebarInset>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
