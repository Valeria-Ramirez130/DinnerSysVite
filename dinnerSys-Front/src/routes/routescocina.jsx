import { ProtectedRouteCocina } from "../ProuteContent/ProtectedRouteCocina";
import { NavbarCocina } from "../components";
import Cocina from "../pages/cocina/Cocina";


export const routescocina = [
  {
    path: "/",
    element: <ProtectedRouteCocina />,
    children: [
      {
        path: "/cocina",
        element: (
          <>
            <NavbarCocina />
            <Cocina /> 
          </>
        ),
      },
    ],
  },
];
