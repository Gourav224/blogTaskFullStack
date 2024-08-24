import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandlers.js";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log(token,req)
        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        // Verify token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken?._id) {
            throw new ApiError(401, "Unauthorized request: Invalid token");
        }

        // Fetch user from database
        const user = await User.findById(decodedToken._id)
            .select("-password -refreshToken -createdAt -updatedAt -__v");

        if (!user) {
            throw new ApiError(401, "Unauthorized request: User not found");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error.message || "Invalid access token");
    }
});
