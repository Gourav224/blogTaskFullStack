import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Select, Input, RTE } from "../index.js";
import service from "../../server/conf.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
    const { register, handleSubmit, watch, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        console.log(data);

        if (post) {
            const file = data.image?.[0];
            const updatedPost = await service.updatePost(post.slug, {
                ...data,
                featuredImage: file || post.featuredImage, 
                userId: userData.$id,
            });
            if (updatedPost) {
                navigate(`/post/${updatedPost.slug}`);
            }
        } else {
            const file = data.image?.[0];
            const newPost = await service.createPost({
                ...data,
                featuredImage: file,
                userId: userData.$id,
            });
            if (newPost) {
                navigate(`/post/${newPost.slug}`);
            }
        }
    };

    const slugTransform = useCallback((value) => {
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap bg-gray-900 text-gray-200 p-6 rounded-lg border border-gray-700"
        >
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4 bg-gray-800 text-gray-900"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4 bg-gray-800 text-gray-900"
                    readOnly
                    {...register("slug", { required: true })}
                />
                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    placeholder="Write the post content here..."
                    className="bg-gray-800 text-gray-950"
                />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4 bg-gray-800 text-gray-950"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={post.featuredImage}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 bg-gray-800 text-gray-950"
                    {...register("status", { required: true })}
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : "bg-blue-500"}
                    className="w-full hover:bg-opacity-90"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
};

export default PostForm;
