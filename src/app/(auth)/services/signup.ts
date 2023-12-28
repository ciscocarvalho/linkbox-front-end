import fetchData from "../../../services/fetchData";

type signupData = {
  username: string;
  email: string;
  password: string;
};

const signup = async (signupData: signupData) => {
  return await fetchData("post", "/auth/signup", signupData);
};

export default signup;
