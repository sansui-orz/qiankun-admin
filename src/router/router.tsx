import React from 'react'
import { createBrowserRouter, } from "react-router-dom";
import Login from '@/pages/login';
import Main from '@/pages/main';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Main />
  },
  {
    path: '/login',
    element: <Login />
  },
]);

export default router