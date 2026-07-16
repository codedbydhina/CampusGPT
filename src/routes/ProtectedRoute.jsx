import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRole }) {

    const { user } = useAuth();

    // User not logged in
    if (!user || !user.token) {
        return <Navigate to="/login" replace />;
    }

    // Logged in but wrong role
    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    // Access granted
    return children;
}

export default ProtectedRoute;