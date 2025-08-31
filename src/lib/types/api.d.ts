interface DatabaseProperties {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

declare type SuccessfulResponse<T> = {
  message: "success";
} & T;

declare type ErrorResponse = {
  statusCode: number;
  status: string;
  message: string;
};

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
