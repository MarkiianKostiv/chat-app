import { useState } from "react";
import { apiConfig } from "../api_config/config";
import { useAuthContext } from "../context/AuthContext";
import { IUser } from "../interfaces/iuser";

interface SignupResponse {
  message: string;
  data?: IUser;
}

export const useGoogleSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<SignupResponse | null>(null);

  const { setAuthUser } = useAuthContext();

  const googleSignup = async (googleData: Record<string, string>) => {
    setLoading(true);
    setError(null);

    try {
      console.log(apiConfig.url);

      const res = await fetch(`${apiConfig.url}/auth/google-sign-up`, {
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
      console.log(data);

      setAuthUser(data);

      setResponse(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { googleSignup, loading, error, response };
};
