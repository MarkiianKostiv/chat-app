import { useState } from "react";
import { apiConfig } from "../api_config/config";
import { useSocketContext } from "../context/SocketContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocketContext();

  const sendMessage = async (message: any) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiConfig.url}/messages/send/${message.receiverId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: message.message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      socket?.emit("sendMessage", data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};

export default useSendMessage;
