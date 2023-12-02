import { useCookies } from 'react-cookie';

const getTokenExpiration = (token: string) => {
  const parsedToken = JSON.parse(atob(token.split(".")[1]));
  return parsedToken.exp;
};

export const useToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const getToken = () => cookies.token;

  const setToken = (value: string) => {
    const exp = getTokenExpiration(value);

    setCookie("token", value, {
      expires: exp ? new Date(exp * 1000) : undefined,
    });
  }

  const removeToken = () => {
    removeCookie("token");
  }

  return { getToken, setToken, removeToken };
}
