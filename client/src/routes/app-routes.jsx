import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import NotFoundPage from "@/pages/not-found";
import ProfilePage from "@/pages/profile-page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },

  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
