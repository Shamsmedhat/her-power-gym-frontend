import RegisterForm from "./_components/register-form";
import catchError from "@/lib/utils/catch-error";
import { getClients } from "@/lib/apis/clients.api";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  // Translation
  const t = await getTranslations();

  const [payload, errors] = await catchError(getClients());

  if (errors) return <p>Error</p>;

  return (
    <section className="min-h-screen flex justify-center items-center flex-col gap-6 my-6 px-4">
      {/* Heading */}
      <h1 className="font-bold text-3xl sm:text-5xl text-center">
        {t("add-new-employee")}
      </h1>

      {/* Form */}
      <div className="w-full max-w-2xl">
        <RegisterForm clients={payload.data.clients} />
      </div>
    </section>
  );
}
