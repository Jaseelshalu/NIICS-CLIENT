import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminProtected() {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
        // If no token is present, redirect to the login page or a different page
        return <Navigate to="/login" />;
    }

    // Decode the token
    try {
        const user: any = jwtDecode(token);

        // Check if the user is an admin
        if (user.role !== "admin") {
            return <Navigate to="/admin" />;
        }

        // If the user is an admin, allow access
        return <Outlet />;
    } catch (error) {
        console.error("Invalid token:", error);
        // If token decoding fails, redirect to login or an appropriate page
        return <Navigate to="/login" />;
    }
}