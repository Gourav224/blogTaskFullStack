import { Container, Logo, LogoutBtn } from "../index.js";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="bg-gray-900 shadow-lg z-50">
            <Container>
                {/* Desktop Navigation */}
                <nav className="hidden lg:flex py-3 items-center shadow-md">
                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>
                    <ul className="flex ml-auto space-x-4">
                        {navItems.map(item =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="px-6 py-2 text-gray-200 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Mobile Navigation */}
                <div className="lg:hidden drawer drawer-end">
                    <input
                        id="my-drawer-3"
                        type="checkbox"
                        className="drawer-toggle"
                    />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="navbar bg-gray-900 w-full shadow-md">
                            <Container>
                                <div className="w-full flex items-center justify-between">
                                    <Link to="/">
                                        <Logo width="70px" />
                                    </Link>
                                    <div className="flex-none lg:hidden">
                                        <label
                                            htmlFor="my-drawer-3"
                                            aria-label="open sidebar"
                                            className="btn btn-square btn-ghost"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                className="inline-block h-6 w-6 stroke-current"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                ></path>
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <div className="drawer-side">
                        <label
                            htmlFor="my-drawer-3"
                            aria-label="close sidebar"
                            className="drawer-overlay"
                        ></label>
                        <ul className="menu bg-gray-900 min-h-full w-80 p-4">
                            {navItems.map(
                                item =>
                                    item.active && (
                                        <li key={item.name} className="mt-2">
                                            <button
                                                onClick={() =>
                                                    navigate(item.slug)
                                                }
                                                className="px-6 py-2 text-gray-200 bg-gray-700 rounded-full hover:bg-gray-600 transition duration-200"
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    )
                            )}
                            {authStatus && (
                                <li className="mt-2">
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </Container>
        </header>
    );
}

export default Header;
