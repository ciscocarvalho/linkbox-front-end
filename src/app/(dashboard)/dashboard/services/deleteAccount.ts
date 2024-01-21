import { Cookies } from "react-cookie";
import fetchData from "../../../../services/fetchData";

export const deleteAccount = async (password: string) => {
  const payload = await fetchData("delete", "/me", { password });

  if (!payload.errors || payload.errors.length === 0) {
    new Cookies().remove("token");
  }

  return payload;
};
