import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Login } from "./pages/login/Login";
import { SignUp } from "./pages/signup/Signup";
import { Main } from "./pages/main/Main";

const App: React.FC = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    { path: "/login", element: <Login /> },
    { path: "/sign-up", element: <SignUp /> },
    {
      path: "*",
      element: (
        <Navigate
          to='/'
          replace
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
