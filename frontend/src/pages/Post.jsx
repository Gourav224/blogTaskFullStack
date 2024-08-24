import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import service from "../server/conf";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams(); // Get the slug from the URL
    const navigate = useNavigate(); // For navigation

    const userData = useSelector((state) => state.auth.userData); // Fetch user data from Redux

    const isAuthor = post && userData ? post.userId === userData._id : false; // Check if the current user is the author of the post

    useEffect(() => {
        if (slug) {
            // Fetch the post by slug
            service.getPost(slug).then((post) => {
                if (post) {
                    setPost(post); // If the post is found, set it in the state
                } else {
                    navigate("/"); // If no post is found, navigate to the homepage
                }
            }).catch((error) => {
                console.error("Error fetching post:", error);
                navigate("/"); // Navigate to homepage if there's an error
            });
        } else {
            navigate("/"); // Navigate to homepage if slug is not available
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (post) {
            // Call the service to delete the post by its ID
            service.deletePost(post.id, userData._id).then((status) => {
                if (status) {
                    // If the post is successfully deleted, delete the featured image
                    service.deleteFile(post.featuredImage).then(() => {
                        navigate("/"); // After deletion, navigate to the homepage
                    });
                }
            }).catch((error) => {
                console.error("Error deleting post:", error);
            });
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImage} 
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}> 
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)} 
                </div>
            </Container>
        </div>
    ) : null; 
}
