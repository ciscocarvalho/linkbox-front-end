import fetchJsonPayload from "../fetchJsonPayload";

type SignupResult = {
    auth: true,
    user: string,
    token: string
} | {
    auth: false,
    token: null,
    msg: string,
};

const signup = async (email: string, password: string): Promise<SignupResult> => {
  return await fetchJsonPayload("post", "/auth/signup", { email, password });
};

export default signup;
