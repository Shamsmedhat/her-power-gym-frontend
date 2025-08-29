import { useMutation } from "@tanstack/react-query";
import {
  createSubscriptionAction,
  deleteSubscriptionAction,
  updateSubscriptionAction,
} from "@/lib/actions/subscription/subscription.action";
import { SubscriptionFields } from "@/lib/schemes/subscriptions.schema";

// Create subscription
export function useCreateSubscription() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: SubscriptionFields) =>
      await createSubscriptionAction(fields),
  });

  return { isPending, error, createNewSub: mutate };
}

// Update subscription
export function useUpdateSubscription() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      subscriptionUpdatedFields,
      id,
    }: {
      subscriptionUpdatedFields: SubscriptionFields;
      id: string;
    }) => await updateSubscriptionAction({ subscriptionUpdatedFields, id }),
  });

  return { isPending, error, updateSub: mutate };
}

// Delete subscription
export function useDeleteSubscription() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (id: string) => await deleteSubscriptionAction(id),
  });

  return { isPending, error, deleteSub: mutate };
}
