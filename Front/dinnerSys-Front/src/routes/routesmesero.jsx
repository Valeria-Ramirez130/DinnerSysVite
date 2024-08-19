import {ProtectedRouteMesero} from "../ProuteContent/ProtectedRouteMesero";
import CarouselMesas from "../components/CarouselMesas/CarouselMesas";
import { NavbarMesero } from "../components/NavbarMesero";



export const routesmesero = [
    {
      path: "/",
      element: <ProtectedRouteMesero />,
      children: [
        {
          path: "/mesero",
          element: (
            <>
              <NavbarMesero />
              <CarouselMesas/>
            </>
          ),
        },
      ],
    },
  ];