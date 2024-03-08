import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mesaRedonda from '../../img/mesaRedonda.svg';
import './CarouselMesas.css';

const CarouselMesas = () => {
  const [selectedTables, setSelectedTables] = useState([]);

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
    // Comprobamos si la mesa ya está en el array de mesas seleccionadas
    const isSelected = selectedTables.includes(tableId);

    if (isSelected) {
      // Si ya está seleccionada, la eliminamos
      setSelectedTables(selectedTables.filter((id) => id !== tableId));
    } else {
      // Si no está seleccionada, la agregamos al array
      setSelectedTables([...selectedTables, tableId]);
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
                border: selectedTables.includes(table.id) ? '2px solid red' : '1px solid #ddd',
                backgroundColor: selectedTables.includes(table.id) ? 'lightgreen' : 'transparent',
              }}
              onClick={() => handleTableClick(table.id)}
            >
              <div className="circle-container">
                <div
                  className="circle"
                  style={{ backgroundColor: selectedTables.includes(table.id) ? 'red' : 'green' }}
                >
                  {table.number}
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
    </div>
  );
};

export default CarouselMesas;