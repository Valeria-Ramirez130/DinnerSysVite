// CarouselMesas.js
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './CarouselMesas.css';
import mesaRedonda from '../../img/mesaRedonda.svg';

const CarouselMesas = () => {
  const [mesas, setMesas] = useState([
    { id: 1, numero: 'Mesa 1', color: 'green' },
    { id: 2, numero: 'Mesa 2', color: 'green' },
    { id: 3, numero: 'Mesa 3', color: 'green' },
    { id: 4, numero: 'Mesa 5', color: 'green' },
    { id: 5, numero: 'Mesa 5', color: 'green' },
    // Agrega más mesas según sea necesario
  ]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handleMesaClick = (mesaId) => {
    setMesas((prevMesas) =>
      prevMesas.map((mesa) =>
        mesa.id === mesaId ? { ...mesa, color: mesa.color === 'green' ? 'red' : 'green' } : mesa
      )
    );
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {mesas.map((mesa) => (
          <div key={mesa.id} className="mesa-container" onClick={() => handleMesaClick(mesa.id)}>
            <div className="mesa-wrapper">
              <div className="mesa-circle" style={{ backgroundColor: mesa.color }}>
                <p className="mesa-number">{mesa.numero}</p>
              </div>
              <img src={mesaRedonda} alt="Mesa Redonda Icon" className="mesa-icon" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselMesas;