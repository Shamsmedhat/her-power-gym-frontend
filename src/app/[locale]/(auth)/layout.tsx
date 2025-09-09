import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Readex_Pro } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const readexPro = Readex_Pro({
  subsets: ["arabic"],
});

export default async function AuthLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={readexPro.className} suppressHydrationWarning>
        <Providers>
          {/* Main */}
          <main className="p-3 sm:p-6">{children}</main>
          <Toaster richColors position="top-center" theme="light" />
        </Providers>
      </body>
    </html>
  );
}
