import React, { Suspense } from "react";
import SubscriptionsList from "./_components/subscriptions-list";

export default function page() {
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <SubscriptionsList />
    </Suspense>
  );
}
