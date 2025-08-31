import { useMutation } from "@tanstack/react-query";
import { ClientsFields } from "@/lib/schemes/clients.schema";
import {
  createClientAction,
  deleteClientAction,
  updateClientAction,
} from "@/lib/actions/clients/client.action";

// Create client
export function useCreateClient() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: ClientsFields) =>
      await createClientAction(fields),
  });

  return { isPending, error, createNewClient: mutate };
}

// Update client
export function useUpdateClient() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      clientUpdatedFields,
      id,
    }: {
      clientUpdatedFields: ClientsFields;
      id: string;
    }) => await updateClientAction({ clientUpdatedFields, id }),
  });

  return { isPending, error, updateClient: mutate };
}

// Delete client
export function useDeleteClient() {
  // Mutation
  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (id: string) => await deleteClientAction(id),
  });

  return { isPending, error, isSuccess, deleteClient: mutate };
}
