import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        featuredImage: {
            type: String, // Cloudinary URL
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        isPublished: {
            type: Boolean,
            default: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Post = mongoose.model("Post", postSchema);
