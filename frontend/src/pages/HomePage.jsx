import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import service from "../server/conf";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const status = useSelector((state) => state.auth.status);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await service.getAllPosts();
                if (response) {
                    setPosts(response);  // Adjust based on the actual structure of response data
                }
            } catch (error) {
                console.error("Error fetching posts:", error.message);
                setPosts([]);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="w-full my-10 bg-gray-900 text-gray-200">
            {posts.length === 0 ? (
                <section
                    className="relative bg-cover bg-center h-96"
                    style={{
                        backgroundImage: "url('/path/to/your/hero-image.jpg')", 
                    }}
                >
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="relative flex items-center justify-center h-full">
                        <Container>
                            <div className="text-center py-20 px-4">
                                <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
                                    Welcome to Our Blog
                                </h1>
                                <p className="text-lg text-gray-300 mb-6">
                                    Discover the latest updates and stories from
                                    our community.
                                </p>
                                <Link
                                    to={status ? "/all-posts" : "/login"}
                                    className="inline-block bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    {status ? "View Posts" : "Login"}
                                </Link>
                                <div className="w-full py-8 mt-4 text-center bg-gray-900 text-gray-200">
                                    <Container>
                                        <div className="flex flex-wrap justify-center">
                                            <div className="p-2 w-full">
                                                <h1 className="text-2xl font-bold hover:text-gray-400">
                                                    {status
                                                        ? "Nothing to show here."
                                                        : "Please log in to view the posts"}
                                                </h1>
                                            </div>
                                        </div>
                                    </Container>
                                </div>
                            </div>
                        </Container>
                    </div>
                </section>
            ) : (
                <section className="py-8">
                    <Container>
                        <div className="flex flex-wrap justify-center">
                            {posts.map((post) => (
                                <div
                                    key={post._id}  
                                    className="p-2 w-full sm:w-1/2 lg:w-1/4"
                                >
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </section>
            )}
        </div>
    );
};

export default HomePage;
