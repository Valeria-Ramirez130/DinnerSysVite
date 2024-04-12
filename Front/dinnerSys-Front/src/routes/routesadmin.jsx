import ProtectedRouteAdmin from "../ProuteContent/ProtectedRouteAdmin";
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin";
import HomeAdmin from "../pages/admin/HomeAdmin";
import { CrearMesa, CrearProducto, CrearUsuario, ListadoMesas, ListadoProductos, ListadoUsuarios, ListadoVentas } from "../pages/admin/OpcionesAdmin";



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
      {
        path: "/admin/usuarios",
        element: (
          <>
            <NavbarAdmin />
            <CrearUsuario />
            <ListadoUsuarios/>
          </>
        ),
      },
      {
        path: "/admin/productos",
        element: (
          <>
            <NavbarAdmin />
            <CrearProducto/>
            <ListadoProductos/>
          </>
        ),
      },
      {
        path: "/admin/ventas",
        element: (
          <>
            <NavbarAdmin />
            <ListadoVentas/>
          </>
        ),
      },
      {
        path: "/admin/mesas",
        element: (
          <>
            <NavbarAdmin />
            <CrearMesa/>
            <ListadoMesas/>
          </>
        ),
      },
    ],
  },
];