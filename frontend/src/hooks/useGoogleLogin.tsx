import { useState } from "react";
import { apiConfig } from "../api_config/config";
import { useAuthContext } from "../context/AuthContext";
import { IUser } from "../interfaces/iuser";

interface LoginResponse {
  message: string;
  data?: IUser;
}

export const useGoogleLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<LoginResponse | null>(null);

  const { setAuthUser } = useAuthContext();

  const googleLogin = async (googleData: Record<string, string>) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(`${apiConfig.url}/auth/google-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);

      setResponse(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { googleLogin, loading, error, response };
};
