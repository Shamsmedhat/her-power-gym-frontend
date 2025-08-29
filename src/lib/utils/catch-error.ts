import {
  AppError,
  AuthenticationError,
  AuthorizationError,
} from "./app-errors";

export default async function catchError<
  T,
  E extends new (message?: string) =>
    | AuthenticationError
    | AuthorizationError
    | AppError
>(
  promise: Promise<APIResponse<T>>,
  errorsToCatch?: E[] | null
): Promise<[SuccessfulResponse<T>, null] | [null, InstanceType<E>]> {
  try {
    const data = await promise;

    if ("statusCode" in data) {
      if (data.statusCode === 401)
        throw new AuthenticationError(data.message, data.statusCode);

      if (data.statusCode === 403)
        throw new AuthorizationError(data.message, data.statusCode);

      throw new AppError(data.message, data.statusCode);
    }

    // At this point, data is guaranteed to be SuccessfulResponse<T>
    return [data as SuccessfulResponse<T>, null];
  } catch (err) {
    const error = err as InstanceType<E>;

    if (!errorsToCatch) {
      return [null, error];
    }

    if (errorsToCatch.some((e) => error instanceof e)) {
      return [null, error];
    }

    throw error;
  }
}
