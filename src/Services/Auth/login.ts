import fetchJsonPayload from '../fetchJsonPayload';

type SigninResult = {
  data?: {
    auth: boolean;
    user: string;
    token: string;
  };
  errors?: {
    message: string,
  }[]
};

const login = async (email: string, password: string): Promise<SigninResult> => {
  return await fetchJsonPayload("post", "/auth/signin", { email, password });
};

export default login;
