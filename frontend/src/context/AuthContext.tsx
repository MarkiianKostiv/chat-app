import { createContext, useContext, useState } from "react";
import { IUser } from "../interfaces/iuser";

interface AuthContextType {
  authUser: IUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<IUser | null>(() => {
    const user = localStorage.getItem("chat-user");
    return user ? JSON.parse(user) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
