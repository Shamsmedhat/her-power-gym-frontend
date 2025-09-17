import NextAuthProvider from "./components/next-auth.provider";
import { Locale, NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "./components/react-query.provider";
import { getFormats } from "@/i18n/request";

type ProvidersProps = {
  children: React.ReactNode;
  messages: Record<string, string>;
  locale: Locale;
  timeZone?: string;
  now?: Date;
};

export default function Providers({
  children,
  messages,
  locale,
  timeZone,
  now,
}: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
          timeZone={timeZone}
          now={now}
          formats={getFormats(locale)}
        >
          {children}
        </NextIntlClientProvider>
      </NextAuthProvider>
    </ReactQueryProvider>
  );
}
