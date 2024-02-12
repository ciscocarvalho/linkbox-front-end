import { getAccountSchema } from "./accountSchema";

export const getUserSchema = () => {
  return getAccountSchema().omit({ password: true });
};

export type UserSchema = ReturnType<typeof getUserSchema>;
