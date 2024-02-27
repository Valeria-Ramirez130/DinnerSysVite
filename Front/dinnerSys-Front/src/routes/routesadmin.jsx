import ProtectedRouteAdmin from "../ProuteContent/ProtectedRouteAdmin";
import HomeAdmin from "../pages/admin/HomeAdmin";
import NavbarAdmin from "../components/NavbarAdmin"; // Importa NavbarAdmin de manera correcta

export const routesadmin = [
  {
    path: "/",
    element: <ProtectedRouteAdmin />,
    children: [
      {
        path: "/admin",
        element: (
          <>
            <NavbarAdmin />
            <HomeAdmin />
          </>
        ),
      },
    ],
  },
];