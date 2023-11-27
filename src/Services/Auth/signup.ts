import fetchJsonPayload from "../fetchJsonPayload";

const signup = async (email: string, password: string) => {
  const { data } = await fetchJsonPayload("post", "/auth/signup", { email, password });
  return data;
};

export default signup;
