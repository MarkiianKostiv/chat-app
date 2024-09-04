import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { GoogleOAuthContextProvider } from "./context/GoogleOAuthProvider.tsx";
import { SocketContextProvider } from "./context/SocketContext.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <GoogleOAuthContextProvider>
          <App />
        </GoogleOAuthContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
