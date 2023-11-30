import { BACKEND_URL } from "../constants";

let amountOfRequests = 0;

const fetchJsonPayload = async (method: string, route: string, bodyOptions?: object) => {
  const res = await fetch(`${BACKEND_URL}${route}`, {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: bodyOptions ? JSON.stringify(bodyOptions) : undefined,
  });

  amountOfRequests++;
  console.log("amount of requests:", amountOfRequests);

  return await res.json();
}

export default fetchJsonPayload;
