import { useEffect, useState } from "react"
import fetchData from "../services/fetchData";
import { User } from "../app/(dashboard)/dashboard/types";

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
