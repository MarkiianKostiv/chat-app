import { createContext, useContext, ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

interface GoogleOAuthContextProps {
  children: ReactNode;
}

export const GoogleOAuthContext = createContext<null | undefined>(undefined);

export const useGoogleOAuthContext = () => {
  const context = useContext(GoogleOAuthContext);
  if (!context) {
    throw new Error(
      "useGoogleOAuthContext must be used within a GoogleOAuthProvider"
    );
  }
  return context;
};

export const GoogleOAuthContextProvider = ({
  children,
}: GoogleOAuthContextProps) => {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={`${clientId}`}>
      <GoogleOAuthContext.Provider value={null}>
        {children}
      </GoogleOAuthContext.Provider>
    </GoogleOAuthProvider>
  );
};
