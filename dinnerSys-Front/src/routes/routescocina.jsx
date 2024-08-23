import { ProtectedRouteCocina } from "../ProuteContent/ProtectedRouteCocina";
import Cocina from "../pages/cocina/Cocina";
import { NavbarAdmin } from "../components/NavbarAdmin/NavbarAdmin";

export const routescocina = [
  {
    path: "/",
    element: <ProtectedRouteCocina />,
    children: [
      {
        path: "/cocina",
        element: (
          <>
            <NavbarAdmin />
            <Cocina /> 
          </>
        ),
      },
    ],
  },
];
