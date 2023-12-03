import fetchJsonPayload from "../fetchJsonPayload";

type signupData = {
  username: string;
  email: string;
  password: string;
}

const signup = async (signupData: signupData) => {
  return await fetchJsonPayload("post", "/auth/signup", signupData);
};

export default signup;
