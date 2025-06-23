import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RequireAuth = ({ children }) => {
    const [checking, setChecking] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        axios
            .get("/api/auth/check", { withCredentials: true })
            .then(() => setChecking(false))
            .catch(() => navigate("/login"));
    }, []);

    return children;
}

export default RequireAuth;