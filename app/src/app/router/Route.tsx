import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom";

import NotFoundPage from "../../feature/error/NotFoundPage";
import HomePage from "../../feature/home/HomePage";
import App from "../layout/App";
import RegisterForm from "../../feature/user/RegisterForm";
import LoginForm from "../../feature/user/LoginForm";
import CartPage from "../../feature/error/CartPage.tsx";
import ManagePage from "../../feature/manage/ManagePage.tsx";

const sideBarRoutes: RouteObject[] = [
    {path: '/home', element: <HomePage/>},
    {path: '/cart', element: <CartPage/>},
    {path: '/manage', element: <ManagePage/>},
];

const otherRoutes: RouteObject[] = [
    {path: '/login', element: <LoginForm/>},
    {path: '/register', element: <RegisterForm/>},
    {path: '/not-found', element: <NotFoundPage/>},
    {path: '*', element: <Navigate to="/not-found" replace/>},
];

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '', element: <Navigate to="/home" replace/>},
            ...sideBarRoutes,
            ...otherRoutes,
        ],
    },
];

export const router = createBrowserRouter(routes);