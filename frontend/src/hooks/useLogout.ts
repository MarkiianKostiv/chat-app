import { useState } from "react";
import { apiConfig } from "../api_config/config";
import { useAuthContext } from "../context/AuthContext";

interface LogoutResponse {
  message: string;
}

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<LogoutResponse | null>(null);

  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiConfig.url}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);

      setResponse(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error, response };
};
