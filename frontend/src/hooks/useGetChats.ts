import { useEffect, useState, useCallback } from "react";
import { apiConfig } from "../api_config/config";

const useGetChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiConfig.url}/users`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch chats: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setChats(data);
    } catch (error: any) {
      setError(error.message);
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return { chats, loading, error, fetchChats };
};

export default useGetChats;
