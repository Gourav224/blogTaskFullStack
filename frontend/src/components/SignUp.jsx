import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Logo, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../server/auth";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    // Define the submit handler function
    const create = async (data) => {
        setError("");
        try {
            const userdata = await authService.createAccount(data);
            console.log(userdata);
            if (userdata) {
                const userData = await authService.getCurrentUser();
                console.log(userData);

                if (userData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            }
        } catch (e) {
            if (e instanceof Error) {
                setError(e.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <div className="flex items-center justify-center max-h-screen bg-gray-900">
            <div className="mx-auto w-full max-w-lg bg-gray-800 text-gray-200 rounded-xl p-10 border border-gray-700">
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">
                    Sign up to create an account
                </h2>
                <p className="mt-2 text-center text-base text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-400 transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && (
                    <p className="text-red-500 mt-4 text-center">{error}</p>
                )}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            required
                            type="text"
                            {...register("fullName", {
                                required: "Full Name is required",
                            })}
                            className="bg-gray-700 text-gray-950"
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            required
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Email address must be valid",
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
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
