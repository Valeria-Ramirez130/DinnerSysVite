import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const ProtectedRouteAdmin = ({ redirectTo = '/' }) => {
   
    const { isAuthenticated, Rol } = useAuth();
    if (isAuthenticated && Rol === "administrador") {
        return <Outlet />;
        
    } else {
        console.log("No es administrador");
        return <Navigate to={redirectTo} />;
    }
}