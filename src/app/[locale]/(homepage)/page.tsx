import { useTranslations } from "next-intl";

export default function Home() {
  // Translation
  const t = useTranslations();

  return (
    <main className="h-full flex items-center justify-center font-semibold text-5xl">
      {t("hello")}
    </main>
  );
}
