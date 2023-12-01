import { useEffect, useState } from "react"
import fetchJsonPayload from "../Services/fetchJsonPayload";

type User = {
  username: string;
  email: string;
}

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setUser = async () => {
      const { data: { user } } = await fetchJsonPayload("get", "/me");
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      }
    }

    setUser();
  }, []);

  return { currentUser, loading };
}
