import { z } from "zod";
import fetchData from "../../../../services/fetchData";
import { rawAccountSchema } from "../../../../schemas/accountSchema";

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: rawAccountSchema["password"],
});

type Body = z.infer<typeof changePasswordSchema>;

export const changePassword = async (body: Body) => {
  return await fetchData("put", "/me/change-password", body);
};
