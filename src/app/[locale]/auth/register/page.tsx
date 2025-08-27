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
    <section className="min-h-screen flex justify-center items-center flex-col gap-4 my-6">
      {/* Heading */}
      <h1 className="font-bold text-5xl">{t("add-new-employee")}</h1>

      {/* Form */}
      <RegisterForm clients={payload.data.clients} />
    </section>
  );
}
