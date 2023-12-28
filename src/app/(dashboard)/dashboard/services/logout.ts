import fetchData from "../../../../services/fetchData";

const logout = async () => {
  await fetchData("post", "/auth/signout");
};

export default logout;
