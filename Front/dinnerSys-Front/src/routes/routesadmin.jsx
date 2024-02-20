import ProtectedRoute from "../PRouteContent/ProtectedRoute";
import HomeAdmin from "../pages/admin/HomeAdmin";


export let routesadmin = ([
    {
        path: "/",
        element: <ProtectedRoute />,
        children:[
            {
                path: "/admin",
                element: <HomeAdmin/>
            },
        
        ]
    },

])