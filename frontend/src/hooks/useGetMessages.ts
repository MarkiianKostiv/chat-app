import { useState, useEffect } from "react";
import { apiConfig } from "../api_config/config";

interface Messages {
  createdAt: Date;
  message: string;

  receiverId: string;

  senderId: string;

  updatedAt: Date;

  _id: string;
}

const useGetMessages = (userId: string) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiConfig.url}/messages/${userId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data = await response.json();

        setMessages(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  return { messages, loading, error };
};

export default useGetMessages;
