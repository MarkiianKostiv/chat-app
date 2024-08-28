import { useState } from "react";
import { apiConfig } from "../api_config/config";

const useDeleteChat = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteChat = async (receiverId: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiConfig.url}/chat/delete/${receiverId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete chat");
      }

      const data = await response.json();
      setResult(data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      console.error("Error deleting chats:", error);
    } finally {
      setLoading(false);
    }
  };

  return { result, loading, error, deleteChat };
};

export default useDeleteChat;
