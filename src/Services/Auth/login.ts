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
  return await fetchJsonPayload("post", "/auth/signin", { email, password });
};

export default login;
