import  { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import "./index.css";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Post from "./pages/Post";
import AllPosts from "./pages/AllPosts";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/HomePage";
import Signup from "./pages/Signup";
import AuthLayout from "./components/AuthLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "login",
                element: (
                    <AuthLayout>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: "signup",
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path: "all-posts",
                element: (
                    <AuthLayout authentication>
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: "add-post",
                element: (
                    <AuthLayout authentication>
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: "edit-post/:slug",
                element: (
                    <AuthLayout authentication>
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: "post/:slug",
                element: <Post />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
