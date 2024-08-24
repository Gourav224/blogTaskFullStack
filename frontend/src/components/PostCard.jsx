import { Link } from "react-router-dom";
import service from "../server/conf";


const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <Link to={`/post/${$id}`} className="block">
            <div className="bg-gray-800 text-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative w-full h-48 overflow-hidden">
                    <img
                        src={service.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
