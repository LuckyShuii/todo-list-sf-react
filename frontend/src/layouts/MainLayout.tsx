import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import TasksPage from '../pages/TasksPage';

const MainLayout: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,  
    },
    {
      path: "/login",
      element: <LoginPage />,  
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/tasks",
      element: <TasksPage />,
    },
    {
      path: "*",
      element: <h1>404 - Page not found</h1>,  
    },
  ]);

  return <RouterProvider router={router} />;
};

export default MainLayout;
