import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Adjust the import path to your store file

const Protected = ({ children, authentication = true }) => {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        // Redirect based on authentication status
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        } else if (!authentication && authStatus !== authentication) {
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication]);

    return loader ? <h1>Loading......</h1> : <>{children}</>;
};

export default Protected;
