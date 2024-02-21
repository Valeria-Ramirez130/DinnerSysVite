import {Navigate,Outlet} from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const ProtectedRouteMesero = ({ redirectTo = '/' }) => {
    const { isAuthenticated} = useAuth();
    if(isAuthenticated){
        return <Outlet />
    }else{
        console.log("No es mesero");
        return <Navigate to={redirectTo} />
    }
}

export default ProtectedRouteMesero;