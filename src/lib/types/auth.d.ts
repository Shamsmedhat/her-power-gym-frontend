import { User } from "next-auth";

export type LoginResponse = Pick<User, "token" | "user">;

export type ClientLoginResponse = {
  token: string;
  data: {
    user: User["user"];
    client: User["client"];
  };
};

export type RegisterResponse = Pick<User, "token" | "user">;
