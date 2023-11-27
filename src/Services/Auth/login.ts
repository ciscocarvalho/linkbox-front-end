import fetchJsonPayload from '../fetchJsonPayload';

type SigninResult = {
    auth: true,
    user: string,
    token: string
} | {
    auth: false,
    token: null,
    msg: string,
};

const login = async (email: string, password: string): Promise<SigninResult> => {
  const { data } = await fetchJsonPayload("post", "/auth/signin", { email, password });
  return data;
};

export default login;
