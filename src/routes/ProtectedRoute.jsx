import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

function ProtectedRoute({ children, requiredRole = "admin" }) {
    const { userData, loading } = useUser();
    const [unauthorized, setUnauthorized] = useState(false);


    useEffect(() => {
        if (requiredRole && userData.role !== requiredRole) {
            toast.error("You are not authorized to access to page!", { id: 'unauthorized access' })
            setUnauthorized(true)
        }
    }, [userData, requiredRole]);

    if (loading) return null;

    if (!userData) return <Navigate to="/login" replace />;

    if (unauthorized) return <Navigate to="/" replace />;

    return children;
}

export default ProtectedRoute;
