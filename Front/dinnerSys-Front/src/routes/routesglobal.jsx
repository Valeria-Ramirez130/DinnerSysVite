import Error404 from "../pages/Error404";
import Login from "../pages/login/Login";

export let routesglobal = ([
    {
        path: "*",
        element: <Error404/>
    },
    {
        path: "/",
        element: <Login/>
    },

])