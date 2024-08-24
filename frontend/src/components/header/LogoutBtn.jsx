import { useDispatch } from "react-redux";
import authService from "../../server/auth.js";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await authService.logout();
            dispatch(logout());
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            className="inline-block px-6 py-2 text-gray-200 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
            onClick={logoutHandler}
            aria-label="Logout"
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
