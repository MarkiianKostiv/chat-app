import { useState, useEffect } from "react";
import { apiConfig } from "../api_config/config";

const useFindUser = (query: string) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        console.log(query);

        const response = await fetch(
          `${apiConfig.url}/users/query/?identifier=${query}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }
        const data = await response.json();
        console.log(data);

        setUsers(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [query]);

  return { users, loading, error };
};

export default useFindUser;
