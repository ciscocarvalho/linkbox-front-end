import fetchJsonPayload from "../fetchJsonPayload";

type SignupResult = {
  email?: string,
  msg?: string,
};

const signup = async (email: string, password: string): Promise<SignupResult> => {
  return await fetchJsonPayload("post", "/auth/signup", { email, password });
};

export default signup;
