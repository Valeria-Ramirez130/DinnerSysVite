import { ProtectedRouteAdmin } from "../ProuteContent/ProtectedRouteAdmin";
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin";
import HomeAdmin from "../pages/admin/HomeAdmin";
import {
  CrearMesa,
  CrearProducto,
  CrearUsuario,
  ListadoMesas,
  ListadoVentas,
} from "../pages/admin/OpcionesAdmin";
import Categoria from "../pages/admin/OpcionesAdmin/Productos/Categoria/Categoria";



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
          </>
        ),
      },
      {
        path: "/admin/categorias",
        element: (
          <>
            <NavbarAdmin />
            <Categoria />
          </>
        ),
      },

      {
        path: "/admin/productos",
        element: (
          <>
            <NavbarAdmin />
            <CrearProducto />
          </>
        ),
      },
      {
        path: "/admin/ventas",
        element: (
          <>
            <NavbarAdmin />
            <ListadoVentas />
          </>
        ),
      },
      {
        path: "/admin/mesas",
        element: (
          <>
            <NavbarAdmin />
            <CrearMesa />
          </>
        ),
      },
    ],
  },
];
