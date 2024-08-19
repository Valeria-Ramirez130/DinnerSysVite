import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mesaRedonda from '../../img/mesaRedonda.svg';
import './CarouselMesas.css';
import PedidosMesero from '../../pages/mesero/OpcionesMesero/PedidosMesero/PedidosMesero'; // Importa PedidosMesero desde la misma carpeta
import { getTables } from '../../API/Mesas';
import { getOrderXTableId } from '../../API/Pedidos';

export const CarouselMesas = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [tables, setTables] = useState([]);
  const [pedidosPorMesa, setPedidosPorMesa] = useState({}); // Objeto para almacenar pedidos por mesa

  useEffect(() => {
    getTables()
      .then((res) => setTables(res))
      .catch((error) => alert("Error al traer las mesas"));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleTableClick = (tableId, Estado) => {
    if (showForm && selectedTable === tableId) {
      setShowForm(false);
      setSelectedTable(null);
    } else {
      setShowForm(true);
      setSelectedTable(tableId);
      if (Estado === 1) {
        // Verificar si ya hay un pedido para esta mesa
        
          // Si no hay pedido, obtenerlo y almacenarlo
          getOrderXTableId(tableId)
            .then((res) => {
              if (res !== null) {
                setPedidosPorMesa({ ...pedidosPorMesa, [tableId]: res });
              }
            })
            .catch((error) => console.error("Error al obtener el pedido:", error));
        
      }
    }
  };

  return (
    <div className="container-principal">
      <div className="carousel-container">
        <Slider {...settings}>
          {tables.map((table) => (
            <div
              key={table.MesaId}
              className="table-card"
              style={{
                border: selectedTable === table.MesaId ? '2px solid red' : '1px solid #ddd',
                backgroundColor: selectedTable === table.MesaId ? 'lightgreen' : 'transparent',
              }}
              onClick={() => handleTableClick(table.MesaId, table.Estado)}
            >
              <div className="circle-container">
                <div
                  className="circle"
                  style={{ backgroundColor: selectedTable === table.MesaId || table.Estado === 1 ? 'red' : 'green' }}
                >
                  {table.MesaId}
                </div>
                <img
                  src={mesaRedonda}
                  alt="Mesa Redonda Icon"
                  className="table-icon"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Mostrar el formulario solo si showForm es true */}
      {showForm && selectedTable && (
        <div className="form-container">
          {/* {console.log(pedidosPorMesa[selectedTable])} */}
          <PedidosMesero
            mesa={selectedTable}
            pedido={pedidosPorMesa[selectedTable] ? pedidosPorMesa[selectedTable] : []}
          />
        </div>
      )}
    </div>
  );
};

export default CarouselMesas;