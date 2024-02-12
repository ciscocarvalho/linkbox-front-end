import { z } from "zod";
import fetchData from "../../../../services/fetchData";
import { UserSchema } from "../../../../schemas/userSchema";

type User = z.infer<UserSchema>

export const updateCurrentUser = async (updatedFields: Partial<User>) => {
  return await fetchData("put", "/me", updatedFields);
};
