import { useMutation } from "@tanstack/react-query";
import { UsersFields } from "@/lib/schemes/employees.schema";
import {
  createUserAction,
  deleteUserAction,
  updateUserAction,
} from "@/lib/actions/employees/employee.action";

// Create user
export function useCreateUser() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: UsersFields) => await createUserAction(fields),
  });

  return { isPending, error, createNewUser: mutate };
}

// Update user
export function useUpdateUser() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({
      userUpdatedFields,
      id,
    }: {
      userUpdatedFields: UsersFields;
      id: string;
    }) => await updateUserAction({ userUpdatedFields, id }),
  });

  return { isPending, error, updateUser: mutate };
}

// Delete user
export function useDeleteUser() {
  // Mutation
  const { isPending, error, mutate, isSuccess } = useMutation({
    mutationFn: async (id: string) => await deleteUserAction(id),
  });

  return { isPending, error, isSuccess, deleteUser: mutate };
}
