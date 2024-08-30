import { useState } from "react";
import { apiConfig } from "../api_config/config";
import { useAuthContext } from "../context/AuthContext";
import { IUser } from "../interfaces/iuser";

interface UpdateResponse {
  message: string;
  settings: {
    sendMessageToRandomChat: boolean;
  };
}

export const useUpdateSettings = () => {
  const [loading, setLoading] = useState("idle");
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<UpdateResponse | null>(null);

  const { authUser, setAuthUser } = useAuthContext();

  const changeSettings = async () => {
    setLoading("pending");
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${apiConfig.url}/settings/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (authUser) {
        const updatedUser: IUser = {
          ...authUser,
          settings: data.settings,
        };

        setAuthUser(updatedUser);

        localStorage.setItem("chat-user", JSON.stringify(updatedUser));

        setResponse(data);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading("end");
    }
  };

  return { changeSettings, loading, error, response };
};
