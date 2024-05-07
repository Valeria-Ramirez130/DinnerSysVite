import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const ProtectedRouteAdmin = ({ redirectTo = '/' }) => {
   
    const { isAuthenticated, Rol } = useAuth();
    if (isAuthenticated && Rol === "administrador") {
        return <Outlet />;
        
    } else {
        console.log("No es administrador");
        return <Navigate to={redirectTo} />;
    }
}

export default ProtectedRouteAdmin;
