import fetchData from "../../../../services/fetchData";

type Body = {
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async (body: Body) => {
  return await fetchData("put", "/me/change-password", body);
};
