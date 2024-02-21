import ProtectedRouteMesero from "../ProuteContent/ProtectedRouteMesero";
import HomeMesero from "../pages/mesero/HomeMesero";

export const routesmesero = ([
    {
        path: "/",
        element: <ProtectedRouteMesero />,
        children:[
            {
                path: "/mesero",
                element: <HomeMesero/>
            },
        
        ]
    },

])