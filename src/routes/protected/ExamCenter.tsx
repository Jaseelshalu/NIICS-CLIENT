import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export default function ExamCenterProtected() {
    const token = localStorage.getItem("token");

    // Check if token exists
    if (!token) {
        // If no token is present, redirect to the login page or a different page
        return <Navigate to="/login" />;
    }

    // Decode the token
    try {
        const user: any = jwtDecode(token);

        // Check if the user is a blogger
        if (user.role !== "examCenter") {
            return <Navigate to="/login" />;
        }

        // If the user is a blogger, allow access
        return <Outlet />;
    } catch (error) {
        console.error("Invalid token:", error);
        // If token decoding fails, redirect to login or an appropriate page
        return <Navigate to="/login" />;
    }
}