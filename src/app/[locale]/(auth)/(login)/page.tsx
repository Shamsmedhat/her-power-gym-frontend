import { useTranslations } from "next-intl";
import LoginForm from "./_components/login-form";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <main className="min-h-screen flex flex-col gap-8 sm:gap-16 items-center justify-center px-4">
      {/* Heading */}
      <h1 className="font-bold text-3xl sm:text-5xl text-center">
        {t("welcome-back")}
      </h1>

      {/* Form */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
