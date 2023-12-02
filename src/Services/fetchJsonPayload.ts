import { Cookies } from "react-cookie";
import { BACKEND_URL } from "../constants";

const checkUserAuthenticated = (payload: { errors?: Array<{ message: string }> }) => {
  const errors = payload.errors;

  if (!errors) {
    return true;
  }

  return !errors.some((error) => error.message === "No current user authenticated");
}

const fetchJsonPayload = async (method: string, route: string, bodyOptions?: object) => {
  const res = await fetch(`${BACKEND_URL}${route}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: bodyOptions ? JSON.stringify(bodyOptions) : undefined,
  });

  const payload = await res.json();

  if (!checkUserAuthenticated(payload)) {
    new Cookies().remove("token");
  }

  payload?.errors?.forEach((error: { message: string }) => console.error(error.message));

  return payload;
}

export default fetchJsonPayload;
