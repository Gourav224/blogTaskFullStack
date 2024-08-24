import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import service from "../server/conf";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await service.getAllPosts();
        if (postsData) {
          setPosts(postsData); 
        } else {
          setPosts([]); 
        }
      } catch (error) {
        setPosts([]);
        console.error("Error fetching posts:", error);
      }
    };

    if (status) {
      fetchPosts();
    } else {
      setPosts([]); 
    }
  }, [status]); 
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post._id} className="p-2 w-1/4"> {/* Adjust key based on the post structure */}
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
