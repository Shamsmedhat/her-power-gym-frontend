import React, { Suspense } from "react";
import SubscriptionsList from "./_components/subscriptions-list";
import SubscriptionCreateForm from "./_components/subscription-create-form";
import SubscriptionTableSkeleton from "@/components/skeletons/subscription/subscription-list.skeleton";

export default function page() {
  return (
    <section className="container px-3 sm:px-0">
      {/* Create new subscription */}
      <SubscriptionCreateForm />

      {/* Subscription list */}
      <Suspense fallback={<SubscriptionTableSkeleton />}>
        <SubscriptionsList />
      </Suspense>
    </section>
  );
}
