import ProtectedRouteMesero from "../ProuteContent/ProtectedRouteMesero";
import CarouselMesas from "../components/CarouselMesas/CarouselMesas";
import { NavbarMesero } from "../components/NavbarMesero";
import { ObtenerMesas } from "../pages/mesero";
import HomeMesero from "../pages/mesero/HomeMesero";
import PedidosMesero from "../pages/mesero/OpcionesMesero/PedidosMesero/PedidosMesero";

export const routesmesero = [
    {
      path: "/",
      element: <><ProtectedRouteMesero /></>,
      children: [
        {
          path: "/mesero",
          element: (
            <>
              <NavbarMesero />
              <HomeMesero />
              <CarouselMesas/>
            </>
          ),
        },
        {
          path: "/mesero/pedidos",
          element: (
            <>
              <NavbarMesero /> 
              <PedidosMesero />
            </>
          ),
        },
        {
          path: "/mesero/mesas",
          element: (
            <>
              <NavbarMesero /> 
              <ObtenerMesas />
            </>
          ),
        },
      ],
    },
  ];