import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../server/auth";
import { useForm } from "react-hook-form";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (e) {
            console.log(e);
            setError("Invalid email or password");
        }
    };

    return (
        <div className="flex items-center justify-center scroll-my-10 bg-gray-900">
            <div className="mx-auto w-full max-w-lg bg-gray-800 text-gray-200 rounded-xl p-10 border border-gray-700">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-base text-gray-400">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-400 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="text-red-500 mt-4 text-center">{error}</p>
                )}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            required
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be a valid address",
                                },
                            })}
                            className="bg-gray-700 text-gray-950"
                        />
                        <Input
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            required
                            {...register("password", {
                                required: "Password is required",
                            })}
                            className="bg-gray-700 text-gray-950"
                        />
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
