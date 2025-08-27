import React, { Suspense } from "react";
import ClientsList from "./_components/clients-list";

export default function page() {
  return (
    <section>
      <Suspense fallback={<p>loading...</p>}>
        <ClientsList />
      </Suspense>
    </section>
  );
}
