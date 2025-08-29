import React, { Suspense } from "react";
import ClientsList from "./_components/clients-list";

export default function page() {
  return (
    <section className="container  px-3 sm:p-0 ">
      <Suspense fallback={<p>loading...</p>}>
        <div className="w-full overflow-x-auto">
          <ClientsList />
        </div>
      </Suspense>
    </section>
  );
}
