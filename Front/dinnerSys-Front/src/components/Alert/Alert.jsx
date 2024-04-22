import React from 'react';
import './Alert.css'; // Archivo de estilos para el componente de alerta

const Alert = ({ message }) => {
  return (
    <div className="alert-content">
      <p>{message}</p>
    </div>
  );
};

export default Alert;
