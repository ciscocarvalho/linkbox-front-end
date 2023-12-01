import fetchJsonPayload from "../fetchJsonPayload";

type signupData = {
  username: string;
  email: string;
  password: string;
}

const signup = async (signupData: signupData) => {
  const { data } = await fetchJsonPayload("post", "/auth/signup", signupData);
  return data;
};

export default signup;
