import { BACKEND_URL } from "../constants";

const fetchJsonPayload = async (method: string, route: string, bodyOptions?: object) => {
  const res = await fetch(`${BACKEND_URL}${route}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: bodyOptions ? JSON.stringify(bodyOptions) : undefined,
  });

  return await res.json();
}

export default fetchJsonPayload;
