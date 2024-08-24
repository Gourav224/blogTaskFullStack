import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import service from "../server/conf";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const response = await service.getPost(slug);
          if (response) {
            setPost(response);  
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error.message);
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
