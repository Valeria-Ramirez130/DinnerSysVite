import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mesaRedonda from '../../img/mesaRedonda.svg';
import './CarouselMesas.css';
import PedidosMesero from '../../pages/mesero/OpcionesMesero/PedidosMesero/PedidosMesero'; // Importa PedidosMesero desde la misma carpeta
import { getTables } from '../../API/Mesas';

const CarouselMesas = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [tables, setTables] = useState([]);

  useEffect(() => {
    getTables().then((res) => setTables(res)).catch((error) => alert("Error al traer las mesas"))
    }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleTableClick = (tableId) => {
    if (showForm && selectedTable === tableId) {
      setShowForm(false);
      setSelectedTable(null);
    } else {
      setShowForm(true);
      setSelectedTable(tableId);
    }
  };

  return (
    <div className='container-principal'>
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
              onClick={() => handleTableClick(table.MesaId)}
            >
              <div className="circle-container">
                <div
                  className="circle"
                  style={{ backgroundColor: selectedTable === table.MesaId ? 'red' : 'green' }}
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
          <PedidosMesero mesa={selectedTable} />
        </div>
      )}
    </div>
  );
};

export default CarouselMesas;