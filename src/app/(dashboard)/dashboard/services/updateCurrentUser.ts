import { z } from "zod";
import fetchData from "../../../../services/fetchData";
import userSchema from "../../../../schemas/userSchema";

type User = z.infer<typeof userSchema>

export const updateCurrentUser = async (updatedFields: Partial<User>) => {
  return await fetchData("put", "/me", updatedFields);
};
