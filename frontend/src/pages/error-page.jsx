import { Footer, Header } from "../components";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-white">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 my-20 sm:my-32">
                <h1 className="text-5xl sm:text-6xl font-bold mb-4">404</h1>
                <p className="text-xl sm:text-2xl mb-4">Page Not Found</p>
                <p className="text-base sm:text-lg mb-8 text-center">
                    Sorry, the page you are looking for does not exist.
                </p>
                <Link
                    to="/"
                    className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 text-sm sm:text-base"
                >
                    Go to Home Page
                </Link>
            </main>
            <Footer />
        </div>
    );
}
