import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export const ProtectedRouteCocina = ({ redirectTo = '/' }) => {
    const { isAuthenticated, Rol } = useAuth();
    
    if (isAuthenticated && Rol === "cocina") {
        return <Outlet />;
    } else {
        console.log("No es del rol cocina");
        return <Navigate to={redirectTo} />;
    }
};
