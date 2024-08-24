import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandlers.js";
import {
    uploadOnCloudinary,
    deleteFormCloudinary,
} from "../utils/cloudinary.js";
import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";

/**
 * Create a new post
 */
const createPost = asyncHandler(async (req, res) => {
    const { title, content, isPublished, slug, userID } = req.body;
    const featuredImageLocalPath = req.file?.path;

    if ([title, content, slug, userID].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(userID);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const featuredImage = featuredImageLocalPath
        ? await uploadOnCloudinary(featuredImageLocalPath)
        : null;
    if (!featuredImage) {
        throw new ApiError(409, "Failed to upload featured image");
    }

    const post = await Post.create({
        title,
        content,
        slug,
        featuredImage: featuredImage.url,
        author: userID,
        isPublished,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, post, "Post created successfully"));
});

/**
 * Delete a post
 */
const deletePost = asyncHandler(async (req, res) => {
    const { slug, userID } = req.body;

    if ([slug, userID].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(userID);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const post = await Post.findOne({ slug });
    if (!post) {
        throw new ApiError(404, "Post does not exist");
    }

    if (post.featuredImage) {
        await deleteFromCloudinary(post.featuredImage);
    }

    await Post.deleteOne({ _id: post._id });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Post deleted successfully"));
});

/**
 * Update a post
 */
const updatePost = asyncHandler(async (req, res) => {
    const { title, content, isPublished, postId, slug, userID } = req.body;
    const featuredImageLocalPath = req.file?.path;

    if (
        [title, content, postId, slug, userID].some((field) => !field?.trim())
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(userID);
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post does not exist");
    }

    if (post.featuredImage && featuredImageLocalPath) {
        await deleteFromCloudinary(post.featuredImage);
    }

    const updatedImage = featuredImageLocalPath
        ? await uploadOnCloudinary(featuredImageLocalPath)
        : null;

    const updatedPost = await Post.findByIdAndUpdate(
        post._id,
        {
            $set: {
                title,
                content,
                isPublished:
                    isPublished !== undefined ? isPublished : post.isPublished,
                featuredImage: updatedImage
                    ? updatedImage.url
                    : post.featuredImage,
                slug,
            },
        },
        { new: true } // Return the updated document
    );

    return res
        .status(200)
        .json(new ApiResponse(200, updatedPost, "Post updated successfully"));
});

/**
 * Get a single post by slug
 */
const getPost = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    if (!slug?.trim()) {
        throw new ApiError(400, "Slug field cannot be empty");
    }

    const post = await Post.findOne({ slug });
    if (!post) {
        throw new ApiError(404, "No post found");
    }
    post.views += 1;
    await post.save();

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

/**
 * Get all published posts
 */
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ isPublished: true });

    if (posts.length === 0) {
        throw new ApiError(404, "No published posts available");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                posts,
                "All published posts retrieved successfully"
            )
        );
});

export { createPost, deletePost, updatePost, getPost, getAllPosts };
