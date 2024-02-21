import {Navigate,Outlet} from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const ProtectedRouteAdmin = ({ redirectTo = '/' }) => {
    const { isAuthenticated} = useAuth();
    if(isAuthenticated){
        return <Outlet />
    }else{
        console.log("No es admin");
        return <Navigate to={redirectTo} />
    }
}

export default ProtectedRouteAdmin;