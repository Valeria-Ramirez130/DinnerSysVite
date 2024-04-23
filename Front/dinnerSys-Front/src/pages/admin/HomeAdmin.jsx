import React from 'react';
import logosecundario from '../../img/logosecundario.svg'; // Importa la imagen usando la importación directa
import './HomeAdmin.css'; // Importa un archivo CSS para estilizar el componente

export function HomeAdmin() {
  return (
    <div className="home-admin-container">
      <img src={logosecundario} alt="Logo" className="logo-image" /> {/* Usa la variable que contiene la imagen */}
    </div>
  );
}

export default HomeAdmin;