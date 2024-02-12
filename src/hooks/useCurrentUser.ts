import { useEffect, useState } from "react"
import fetchData from "../services/fetchData";
import { z } from "zod";
import { UserSchema } from "../schemas/userSchema";

type User = z.infer<UserSchema>;

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refetch = async () => {
    const { data: { user } } = await fetchData("get", "/me");
    if (user) {
      setCurrentUser(user);
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return { currentUser, loading, refetch };
}
