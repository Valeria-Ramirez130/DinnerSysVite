import {Navigate,Outlet} from "react-router-dom";
import {useState} from "react"
import { useAuth } from "../auth/AuthProvider";

// export const ProtectedRoute = ({ redirectTo = '/' }) => {

//     const [isAuthenticated, setIsAuthenticated] = useState(true);
//     return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />

// }

// export default ProtectedRoute
const ProtectedRoute = ({ redirectTo = '/' }) => {
    const { isAuthenticated} = useAuth();
    if(isAuthenticated){
        return <Outlet />
    }else{
        console.log("No es mesero");
        return <Navigate to={redirectTo} />
    }
}

export default ProtectedRoute