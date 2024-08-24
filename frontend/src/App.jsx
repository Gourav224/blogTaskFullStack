import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
    const [loading, setLoading] = useState(false);

    // Uncomment the following lines when you want to integrate user authentication
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     setLoading(true);
    //     authService
    //         .getCurrentUser()
    //         .then((userData) => {
    //             if (userData) {
    //                 dispatch(login({ userData }));
    //             } else {
    //                 dispatch(logout());
    //             }
    //         })
    //         .finally(() => setLoading(false));
    // }, [dispatch]);

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-space bg-gray-900">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;
