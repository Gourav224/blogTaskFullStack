import asyncHandler from "../utils/asyncHandlers.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";

/**
 * Generate new access and refresh tokens
 */
const generateRefreshAndAccessToken = async (userId) => {
    try {
        let user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Failed to generate tokens");
    }
};

/**
 * Register a new user
 */
const registerUser = asyncHandler(async (req, res) => {
    const { email, fullName, password } = req.body;
    console.log(email,fullName,password);
    
    if ([fullName, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, 'All fields are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const newUser = await User.create({ fullName, password, email });
    const userCreated = await User.findById(newUser._id).select("-password -refreshToken");

    if (!userCreated) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(new ApiResponse(201, userCreated, "User created successfully"));
});

/**
 * Login a user
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Set secure flag in production
    };

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "Logged in successfully"));
});

/**
 * Logout a user
 */
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

    const cookieOptions = {
        httpOnly: true,
        secure: true, // Set secure flag in production
    };

    return res.status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Logged out successfully"));
});

/**
 * Refresh access token
 */
const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);

        if (!user || incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Invalid or expired refresh token");
        }

        const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
        };

        return res.status(200)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed successfully"));
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid refresh token");
    }
});

/**
 * Get current user details
 */
const getCurrrentUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "Unauthorized request");
    }

    return res.status(200).json(new ApiResponse(200, { user: req.user }, "User details fetched successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrrentUser,
};
