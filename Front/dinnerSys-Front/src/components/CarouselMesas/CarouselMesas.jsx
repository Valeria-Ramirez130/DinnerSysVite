import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mesaRedonda from '../../img/mesaRedonda.svg';
import './CarouselMesas.css';
import PedidosMesero from '../../pages/mesero/OpcionesMesero/PedidosMesero/PedidosMesero'; // Importa PedidosMesero desde la misma carpeta

const CarouselMesas = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const tables = [
    { id: 1, number: '1' },
    { id: 2, number: '2' },
    { id: 3, number: '3' },
  ];

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
              key={table.id}
              className="table-card"
              style={{
                border: selectedTable === table.id ? '2px solid red' : '1px solid #ddd',
                backgroundColor: selectedTable === table.id ? 'lightgreen' : 'transparent',
              }}
              onClick={() => handleTableClick(table.id)}
            >
              <div className="circle-container">
                <div
                  className="circle"
                  style={{ backgroundColor: selectedTable === table.id ? 'red' : 'green' }}
                >
                  {table.id}
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