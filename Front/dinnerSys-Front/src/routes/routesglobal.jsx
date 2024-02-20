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