import { useEffect, useState } from "react";
import { apiConfig } from "../api_config/config";
import { IChat } from "../interfaces/ichat";

interface UseGetChatsResult {
  chats: IChat[];
  loading: boolean;
  error: string | null;
}

const useGetChats = (): UseGetChatsResult => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${apiConfig.url}/users`);

        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }

        const data = await response.json();
        setChats(data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  return { chats, loading, error };
};

export default useGetChats;
