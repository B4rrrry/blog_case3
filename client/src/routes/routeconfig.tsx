import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import MainPage from "../pages/MainPage/MainPage";
import PostPage from "../pages/PostPage/PostPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import AuthPage from "../pages/AuthPage/AuthPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import PostEditPage from "../pages/PostEditPage/PostEditPage";
import PostCreatePage from "../pages/PostCreatePage/PostCreatePage";
import UserPage from "../pages/UserPage/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path:'/',
        element:<MainPage />
      },
      {
        path:'post/:id',
        element:<PostPage />
      },
      {
        path:'profile',
        element:<ProfilePage />,
      },
      {
        path:'auth',
        element:<AuthPage />,
      },
      {
        path:'register',
        element:<RegisterPage />,
      },
      {
        path:'post/edit/:id',
        element:<PostEditPage />,
      },
      {
        path:'post/create',
        element:<PostCreatePage />,
      },
      {
        path:'user/:name',
        element:<UserPage />,
      },
    ]
  },
]);
