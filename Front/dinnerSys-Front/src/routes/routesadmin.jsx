import ProtectedRouteAdmin from "../ProuteContent/ProtectedRouteAdmin";
import HomeAdmin from "../pages/admin/HomeAdmin";


export const routesadmin = ([
    {
        path: "/",
        element: <ProtectedRouteAdmin />,
        children:[
            {
                path: "/admin",
                element: <HomeAdmin/>
            },
        
        ]
    },

])