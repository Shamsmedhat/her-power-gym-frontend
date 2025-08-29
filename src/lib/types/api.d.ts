declare type DatabaseProperies = {
  _id: string;
  createdAt: string;
};

declare type SuccessfulResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  statusCode: number;
  status: string;
  message: string;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
